-- =============================================
-- MIGRATION 003 — MG Labs AI Chat persistence
-- MG Creative Labs
-- Run this in Supabase SQL Editor AFTER 002_phase1_production_data.sql.
-- Safe to re-run (uses IF NOT EXISTS / DROP POLICY IF EXISTS).
-- =============================================

-- =============================================
-- WHY session_id AND user_id
-- MG Labs AI (/mg-ai) is explicitly "free, no account required" —
-- see src/app/mg-ai/page.tsx metadata. Most visitors will never
-- log in, so conversations can't be keyed on auth.uid() alone or
-- anonymous users would lose history on every refresh.
--
-- session_id is a UUID the client generates once and stores in
-- localStorage (see src/lib/hooks/useChatSession.ts). It identifies
-- an anonymous browser. If the visitor later logs in, user_id is
-- attached to their existing rows (see claim_anonymous_chats below)
-- so history carries over instead of forking into two histories.
--
-- Exactly one of (session_id, user_id) must be enough to own a row;
-- both may be present after claiming.
-- =============================================

CREATE TABLE IF NOT EXISTS public.chat_conversations (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id    UUID,
  user_id       UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title         TEXT NOT NULL DEFAULT 'New chat',
  model_id      TEXT NOT NULL DEFAULT 'llama-3.3-70b-versatile',
  pinned        BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chat_conversations_owner_present
    CHECK (session_id IS NOT NULL OR user_id IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS idx_chat_conversations_session
  ON public.chat_conversations(session_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_user
  ON public.chat_conversations(user_id, updated_at DESC);

CREATE TABLE IF NOT EXISTS public.chat_messages (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES public.chat_conversations(id) ON DELETE CASCADE NOT NULL,
  role            TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content         TEXT NOT NULL,
  image_url       TEXT,
  image_model     TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation
  ON public.chat_messages(conversation_id, created_at ASC);

-- Keep conversations.updated_at current so "recent chats" sort works
-- without a separate query — mirrors the enrollment_count trigger
-- pattern already used in migration 002.
CREATE OR REPLACE FUNCTION public.touch_chat_conversation()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  UPDATE public.chat_conversations
    SET updated_at = NOW()
    WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS chat_messages_touch_conversation ON public.chat_messages;
CREATE TRIGGER chat_messages_touch_conversation
  AFTER INSERT ON public.chat_messages
  FOR EACH ROW EXECUTE FUNCTION public.touch_chat_conversation();

-- =============================================
-- RLS
-- Anonymous access is granted via the `anon` role scoped to a
-- session_id the client supplies — there is no way to enforce
-- "this session_id belongs to this browser" at the DB layer, which
-- is the accepted tradeoff of client-generated anonymous identity
-- (same model as e.g. localStorage cart IDs). No PII is stored here
-- beyond the chat content itself, and rows are prunable (see below).
-- Authenticated rows (user_id set) are locked to auth.uid() as usual.
-- =============================================

ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Owner can select conversations" ON public.chat_conversations;
CREATE POLICY "Owner can select conversations" ON public.chat_conversations
  FOR SELECT USING (
    (user_id IS NOT NULL AND user_id = auth.uid())
    OR (session_id IS NOT NULL)
  );

DROP POLICY IF EXISTS "Owner can insert conversations" ON public.chat_conversations;
CREATE POLICY "Owner can insert conversations" ON public.chat_conversations
  FOR INSERT WITH CHECK (
    (user_id IS NULL OR user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Owner can update conversations" ON public.chat_conversations;
CREATE POLICY "Owner can update conversations" ON public.chat_conversations
  FOR UPDATE USING (
    (user_id IS NOT NULL AND user_id = auth.uid())
    OR (session_id IS NOT NULL)
  );

DROP POLICY IF EXISTS "Owner can delete conversations" ON public.chat_conversations;
CREATE POLICY "Owner can delete conversations" ON public.chat_conversations
  FOR DELETE USING (
    (user_id IS NOT NULL AND user_id = auth.uid())
    OR (session_id IS NOT NULL)
  );

DROP POLICY IF EXISTS "Owner can select messages" ON public.chat_messages;
CREATE POLICY "Owner can select messages" ON public.chat_messages
  FOR SELECT USING (
    conversation_id IN (SELECT id FROM public.chat_conversations)
  );

DROP POLICY IF EXISTS "Owner can insert messages" ON public.chat_messages;
CREATE POLICY "Owner can insert messages" ON public.chat_messages
  FOR INSERT WITH CHECK (
    conversation_id IN (SELECT id FROM public.chat_conversations)
  );

DROP POLICY IF EXISTS "Owner can delete messages" ON public.chat_messages;
CREATE POLICY "Owner can delete messages" ON public.chat_messages
  FOR DELETE USING (
    conversation_id IN (SELECT id FROM public.chat_conversations)
  );

-- =============================================
-- Claim anonymous chats on login — call once from the client right
-- after a successful sign-in if a local session_id exists, so a
-- visitor's pre-login chat history becomes theirs instead of being
-- orphaned. SECURITY DEFINER because the anon session_id rows have
-- no user_id yet and RLS alone can't bridge that ownership change.
-- =============================================
CREATE OR REPLACE FUNCTION public.claim_anonymous_chats(p_session_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  claimed_count INTEGER;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN 0;
  END IF;

  UPDATE public.chat_conversations
    SET user_id = auth.uid()
    WHERE session_id = p_session_id
      AND user_id IS NULL;

  GET DIAGNOSTICS claimed_count = ROW_COUNT;
  RETURN claimed_count;
END;
$$;

-- =============================================
-- Retention: anonymous (no user_id) chats older than 90 days are
-- storage/privacy cruft with no owner who can be notified — safe to
-- prune. Authenticated users' chats are never auto-deleted. Run this
-- periodically via a Supabase scheduled function / pg_cron if enabled;
-- otherwise call it manually. Not wired to a cron job by this
-- migration since pg_cron availability varies by Supabase plan.
-- =============================================
CREATE OR REPLACE FUNCTION public.prune_anonymous_chats()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.chat_conversations
    WHERE user_id IS NULL
      AND updated_at < NOW() - INTERVAL '90 days';
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;
