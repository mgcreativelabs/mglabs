-- =============================================
-- MIGRATION 002 — Phase 1 production-data fixes
-- MG Creative Labs
-- Run this in Supabase SQL Editor AFTER schema.sql.
-- Safe to re-run (uses IF NOT EXISTS / ON CONFLICT).
-- =============================================

-- =============================================
-- 1. COURSES — add a curriculum column
-- The courses table existed but nothing was ever stored
-- in it; courses/[slug]/page.tsx used a hardcoded array
-- instead. There's no separate video-hosting/lessons
-- infrastructure yet, so curriculum (modules + lessons)
-- is stored as JSONB directly on the course row. This is
-- intentionally simple — swap for a normalized `lessons`
-- table later if/when real video hosting is added.
-- =============================================
ALTER TABLE public.courses
  ADD COLUMN IF NOT EXISTS curriculum JSONB NOT NULL DEFAULT '[]'::jsonb;

ALTER TABLE public.courses
  ADD COLUMN IF NOT EXISTS what_youll_learn TEXT[] NOT NULL DEFAULT '{}';

-- =============================================
-- 2. COURSE ENROLLMENTS — real progress tracking
-- Replaces the hardcoded "Courses started: 2" dashboard
-- stat and powers a real Enroll / Continue flow.
-- =============================================
CREATE TABLE IF NOT EXISTS public.course_enrollments (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id              UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id            UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  progress_percent     INTEGER NOT NULL DEFAULT 0 CHECK (progress_percent BETWEEN 0 AND 100),
  completed_lesson_ids TEXT[] NOT NULL DEFAULT '{}',
  started_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_accessed_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at         TIMESTAMPTZ,
  UNIQUE(user_id, course_id)
);

ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users see own enrollments" ON public.course_enrollments;
CREATE POLICY "Users see own enrollments" ON public.course_enrollments
  FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can enroll themselves" ON public.course_enrollments;
CREATE POLICY "Users can enroll themselves" ON public.course_enrollments
  FOR INSERT WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own enrollment progress" ON public.course_enrollments;
CREATE POLICY "Users can update own enrollment progress" ON public.course_enrollments
  FOR UPDATE USING (user_id = auth.uid());

-- Keep courses.enrollment_count accurate automatically
CREATE OR REPLACE FUNCTION public.update_course_enrollment_count()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.courses SET enrollment_count = enrollment_count + 1 WHERE id = NEW.course_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.courses SET enrollment_count = GREATEST(enrollment_count - 1, 0) WHERE id = OLD.course_id;
  END IF;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS course_enrollments_count ON public.course_enrollments;
CREATE TRIGGER course_enrollments_count
  AFTER INSERT OR DELETE ON public.course_enrollments
  FOR EACH ROW EXECUTE FUNCTION update_course_enrollment_count();

-- =============================================
-- 3. CONTACT MESSAGES — the contact form previously
-- validated input then just returned a fake success
-- response without persisting or sending anything
-- anywhere. This makes submissions real and visible
-- to admins (Supabase dashboard or /admin panel).
-- =============================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  subject    TEXT,
  message    TEXT NOT NULL,
  is_read    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit a contact message" ON public.contact_messages;
CREATE POLICY "Anyone can submit a contact message" ON public.contact_messages
  FOR INSERT WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Admins can view contact messages" ON public.contact_messages;
CREATE POLICY "Admins can view contact messages" ON public.contact_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins can update contact messages" ON public.contact_messages;
CREATE POLICY "Admins can update contact messages" ON public.contact_messages
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- =============================================
-- 4. REAL LEARNING STREAK
-- Replaces the hardcoded "7-day learning streak" that
-- never changed for any user. Tracks actual consecutive
-- days a user has visited the dashboard.
-- =============================================
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS streak_count    INTEGER NOT NULL DEFAULT 0;
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS last_active_date DATE;

CREATE OR REPLACE FUNCTION public.touch_daily_streak(p_user_id UUID)
RETURNS INTEGER LANGUAGE plpgsql SECURITY INVOKER AS $$
DECLARE
  v_last_active DATE;
  v_streak      INTEGER;
  v_today       DATE := CURRENT_DATE;
BEGIN
  SELECT last_active_date, streak_count INTO v_last_active, v_streak
  FROM public.profiles WHERE user_id = p_user_id;

  IF v_last_active IS NULL OR v_last_active < v_today - INTERVAL '1 day' THEN
    v_streak := 1;
  ELSIF v_last_active = v_today - INTERVAL '1 day' THEN
    v_streak := COALESCE(v_streak, 0) + 1;
  END IF;
  -- if v_last_active = v_today, leave streak unchanged (already counted today)

  UPDATE public.profiles
  SET streak_count = v_streak, last_active_date = v_today
  WHERE user_id = p_user_id;

  RETURN v_streak;
END;
$$;

-- =============================================
-- 5. SEED — migrate the 2 real courses out of hardcoded
-- TSX into the database. (Previously courses/[slug]/page.tsx
-- had these baked into the component file with fabricated
-- "students: 12840 / 21300" counts — removed. Real counts
-- now come from course_enrollments via the trigger above
-- and start honestly at 0.)
-- =============================================
INSERT INTO public.courses (
  title, slug, description, category, level, lessons_count,
  duration_hours, is_published, is_featured, price, curriculum, what_youll_learn
) VALUES
(
  'AI Foundations: How LLMs Actually Work',
  'ai-foundations',
  'Go beyond the hype. Understand transformers, training data, and why GPT-4 does what it does. No PhD required.',
  'ai-learning',
  'beginner',
  12,
  3.33,
  TRUE,
  TRUE,
  0,
  '[
    {"title":"What is an LLM?","lessons":[
      {"id":1,"title":"The history of language models","duration":"12:30","isFree":true},
      {"id":2,"title":"Tokens, embeddings, and vectors","duration":"18:45","isFree":true},
      {"id":3,"title":"How transformers work (plain English)","duration":"22:10","isFree":false}
    ]},
    {"title":"Training and alignment","lessons":[
      {"id":4,"title":"Pre-training: what the model learns","duration":"16:00","isFree":false},
      {"id":5,"title":"RLHF: how models learn to be helpful","duration":"14:20","isFree":false},
      {"id":6,"title":"Why models hallucinate (and how to reduce it)","duration":"19:55","isFree":false}
    ]},
    {"title":"Practical model knowledge","lessons":[
      {"id":7,"title":"GPT-4 vs Claude vs Gemini: real differences","duration":"24:10","isFree":false},
      {"id":8,"title":"Context windows and memory","duration":"11:30","isFree":false},
      {"id":9,"title":"Temperature, top-p, and sampling","duration":"15:00","isFree":false},
      {"id":10,"title":"Fine-tuning vs RAG vs prompting","duration":"20:40","isFree":false},
      {"id":11,"title":"The future: multimodal and agents","duration":"18:20","isFree":false},
      {"id":12,"title":"Final project: build your AI knowledge base","duration":"35:00","isFree":false}
    ]}
  ]'::jsonb,
  ARRAY[
    'Understand how transformer architecture enables modern AI',
    'Know the real differences between leading AI models',
    'Debug AI failures with a mental model of how LLMs work',
    'Make informed decisions about which model to use for which task',
    'Understand training, alignment, and why models behave as they do',
    'Explain LLMs clearly to non-technical colleagues'
  ]
),
(
  'Prompt Engineering Masterclass',
  'prompt-engineering-masterclass',
  'The complete guide to writing prompts that get 10x better results. Chain-of-thought, system prompts, few-shot, and more.',
  'ai-learning',
  'intermediate',
  22,
  5.75,
  TRUE,
  TRUE,
  0,
  '[
    {"title":"Foundations","lessons":[
      {"id":1,"title":"Why most prompts fail","duration":"10:00","isFree":true},
      {"id":2,"title":"The anatomy of a great prompt","duration":"15:30","isFree":true},
      {"id":3,"title":"Role prompting and system prompts","duration":"20:00","isFree":false}
    ]},
    {"title":"Core techniques","lessons":[
      {"id":4,"title":"Chain-of-thought prompting","duration":"18:00","isFree":false},
      {"id":5,"title":"Few-shot examples","duration":"16:20","isFree":false},
      {"id":6,"title":"Output formatting and constraints","duration":"14:10","isFree":false},
      {"id":7,"title":"Tree-of-thought and self-consistency","duration":"22:00","isFree":false}
    ]},
    {"title":"Advanced patterns","lessons":[
      {"id":8,"title":"Meta-prompting","duration":"19:30","isFree":false},
      {"id":9,"title":"Prompt chaining for complex tasks","duration":"25:00","isFree":false},
      {"id":10,"title":"Building a prompt library","duration":"30:00","isFree":false}
    ]}
  ]'::jsonb,
  ARRAY[
    'Master chain-of-thought, few-shot, and role prompting',
    'Build reusable prompt templates for your workflows',
    'Get consistent, reliable outputs from any AI model',
    'Debug prompts that aren''t working the way you expect',
    'Create a personal prompt library that compounds over time',
    'Apply advanced patterns like meta-prompting and prompt chaining'
  ]
)
ON CONFLICT (slug) DO NOTHING;
