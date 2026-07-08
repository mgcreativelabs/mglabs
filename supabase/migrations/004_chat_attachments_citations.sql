-- =============================================
-- MIGRATION 004 — MG Labs AI Chat: attachments + citations
-- MG Creative Labs
-- Run this in Supabase SQL Editor AFTER 003_mg_ai_chat_persistence.sql.
-- Safe to re-run (uses IF NOT EXISTS).
-- =============================================

-- =============================================
-- WHY jsonb, not a separate table
-- Both attachments (uploaded image thumbnails on a user message) and
-- citations (web search sources on an assistant message) are small,
-- read-with-their-parent-message, never-queried-independently blobs —
-- a join table would add cost with no query benefit here. Kept as
-- plain jsonb arrays matching the client-side shapes 1:1:
--   attachments: [{ dataUrl: string, name: string }]
--   citations:   [{ title?: string, url: string }]
-- See src/app/mg-ai/MGAIChat.tsx's Attachment / Citation interfaces
-- and src/lib/hooks/useChatHistory.ts for the read/write side.
--
-- Note on attachments size: dataUrl is a full base64-encoded image,
-- so a message with several attached images can be a few MB of jsonb.
-- Acceptable for a free chat tool's history, but worth knowing before
-- assuming this table is cheap to scan wholesale.
-- =============================================

ALTER TABLE public.chat_messages
  ADD COLUMN IF NOT EXISTS attachments JSONB,
  ADD COLUMN IF NOT EXISTS citations JSONB;
