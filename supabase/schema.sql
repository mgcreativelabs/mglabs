-- =============================================
-- SUPABASE DATABASE SCHEMA
-- MG Creative Labs — Full Production Schema
-- Run this in Supabase SQL Editor
-- =============================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- for fuzzy text search

-- =============================================
-- PROFILES TABLE
-- =============================================
CREATE TABLE public.profiles (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  username      TEXT UNIQUE,
  full_name     TEXT,
  bio           TEXT,
  avatar_url    TEXT,
  website       TEXT,
  twitter       TEXT,
  github        TEXT,
  role          TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  subscription_tier TEXT NOT NULL DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- PROMPTS TABLE
-- =============================================
CREATE TABLE public.prompts (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title         TEXT NOT NULL,
  description   TEXT NOT NULL,
  content       TEXT NOT NULL,
  category      TEXT NOT NULL CHECK (category IN (
    'writing','coding','design','business','education',
    'marketing','productivity','creativity','research','other'
  )),
  tags          TEXT[] DEFAULT '{}',
  author_id     UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  likes_count   INTEGER NOT NULL DEFAULT 0,
  saves_count   INTEGER NOT NULL DEFAULT 0,
  views_count   INTEGER NOT NULL DEFAULT 0,
  is_featured   BOOLEAN NOT NULL DEFAULT FALSE,
  is_public     BOOLEAN NOT NULL DEFAULT TRUE,
  model         TEXT,
  difficulty    TEXT NOT NULL DEFAULT 'beginner' CHECK (difficulty IN ('beginner','intermediate','advanced')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER prompts_updated_at BEFORE UPDATE ON public.prompts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Full-text search index on prompts
CREATE INDEX prompts_search_idx ON public.prompts
  USING gin(to_tsvector('english', title || ' ' || description || ' ' || content));
CREATE INDEX prompts_category_idx ON public.prompts(category);
CREATE INDEX prompts_difficulty_idx ON public.prompts(difficulty);
CREATE INDEX prompts_public_idx ON public.prompts(is_public) WHERE is_public = TRUE;

-- =============================================
-- SAVED PROMPTS TABLE
-- =============================================
CREATE TABLE public.saved_prompts (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  prompt_id  UUID REFERENCES public.prompts(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, prompt_id)
);

-- Update saves_count automatically
CREATE OR REPLACE FUNCTION public.update_prompt_saves_count()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.prompts SET saves_count = saves_count + 1 WHERE id = NEW.prompt_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.prompts SET saves_count = saves_count - 1 WHERE id = OLD.prompt_id;
  END IF;
  RETURN NULL;
END;
$$;

CREATE TRIGGER saved_prompts_count
  AFTER INSERT OR DELETE ON public.saved_prompts
  FOR EACH ROW EXECUTE FUNCTION update_prompt_saves_count();

-- =============================================
-- BLOG POSTS TABLE
-- =============================================
CREATE TABLE public.blog_posts (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title           TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  excerpt         TEXT NOT NULL,
  content         TEXT NOT NULL,
  cover_image     TEXT,
  author_id       UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  category        TEXT NOT NULL CHECK (category IN (
    'ai-tools','prompt-engineering','tutorials','news',
    'design','coding','automation','case-studies'
  )),
  tags            TEXT[] DEFAULT '{}',
  reading_time    INTEGER NOT NULL DEFAULT 5,
  is_published    BOOLEAN NOT NULL DEFAULT FALSE,
  is_featured     BOOLEAN NOT NULL DEFAULT FALSE,
  views_count     INTEGER NOT NULL DEFAULT 0,
  likes_count     INTEGER NOT NULL DEFAULT 0,
  seo_title       TEXT,
  seo_description TEXT,
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE INDEX blog_posts_slug_idx ON public.blog_posts(slug);
CREATE INDEX blog_posts_published_idx ON public.blog_posts(is_published, published_at DESC);

-- =============================================
-- AI TOOLS TABLE
-- =============================================
CREATE TABLE public.ai_tools (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  description TEXT NOT NULL,
  url         TEXT NOT NULL,
  logo_url    TEXT,
  category    TEXT NOT NULL CHECK (category IN (
    'text-generation','image-generation','code-generation','video-generation',
    'audio-generation','data-analysis','productivity','design','search','other'
  )),
  tags        TEXT[] DEFAULT '{}',
  pricing     TEXT NOT NULL CHECK (pricing IN ('free','freemium','paid','open-source')),
  rating      NUMERIC(3,2),
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- COMMUNITY POSTS TABLE
-- =============================================
CREATE TABLE public.community_posts (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title         TEXT NOT NULL,
  content       TEXT NOT NULL,
  author_id     UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  category      TEXT NOT NULL DEFAULT 'general' CHECK (category IN (
    'general','help','showcase','resources','jobs'
  )),
  tags          TEXT[] DEFAULT '{}',
  likes_count   INTEGER NOT NULL DEFAULT 0,
  replies_count INTEGER NOT NULL DEFAULT 0,
  views_count   INTEGER NOT NULL DEFAULT 0,
  is_pinned     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER community_posts_updated_at BEFORE UPDATE ON public.community_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- COMMUNITY REPLIES TABLE
-- =============================================
CREATE TABLE public.community_replies (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id    UUID REFERENCES public.community_posts(id) ON DELETE CASCADE NOT NULL,
  author_id  UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  content    TEXT NOT NULL,
  likes_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update replies_count
CREATE OR REPLACE FUNCTION public.update_post_replies_count()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.community_posts SET replies_count = replies_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.community_posts SET replies_count = replies_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$;

CREATE TRIGGER community_replies_count
  AFTER INSERT OR DELETE ON public.community_replies
  FOR EACH ROW EXECUTE FUNCTION update_post_replies_count();

-- =============================================
-- NEWSLETTER SUBSCRIBERS TABLE
-- =============================================
CREATE TABLE public.newsletter_subscribers (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email        TEXT NOT NULL UNIQUE,
  name         TEXT,
  is_confirmed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- COURSES TABLE
-- =============================================
CREATE TABLE public.courses (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title            TEXT NOT NULL,
  slug             TEXT NOT NULL UNIQUE,
  description      TEXT NOT NULL,
  cover_image      TEXT,
  instructor_id    UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  category         TEXT NOT NULL CHECK (category IN ('ai-learning','coding','design','automation')),
  level            TEXT NOT NULL CHECK (level IN ('beginner','intermediate','advanced')),
  lessons_count    INTEGER NOT NULL DEFAULT 0,
  duration_hours   NUMERIC(4,1) NOT NULL DEFAULT 0,
  is_published     BOOLEAN NOT NULL DEFAULT FALSE,
  is_featured      BOOLEAN NOT NULL DEFAULT FALSE,
  price            NUMERIC(8,2) NOT NULL DEFAULT 0,
  enrollment_count INTEGER NOT NULL DEFAULT 0,
  rating           NUMERIC(3,2),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- ROW-LEVEL SECURITY (RLS)
-- =============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Profiles: public read, own write
CREATE POLICY "Profiles are publicly readable" ON public.profiles FOR SELECT USING (TRUE);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Prompts: public prompts are readable by all
CREATE POLICY "Public prompts are readable" ON public.prompts FOR SELECT USING (is_public = TRUE);
CREATE POLICY "Authenticated users can create prompts" ON public.prompts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authors can update own prompts" ON public.prompts FOR UPDATE USING (author_id = (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- Saved prompts: only own records
CREATE POLICY "Users see own saved prompts" ON public.saved_prompts FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can save prompts" ON public.saved_prompts FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can unsave prompts" ON public.saved_prompts FOR DELETE USING (user_id = auth.uid());

-- Blog posts: only published are public
CREATE POLICY "Published posts are public" ON public.blog_posts FOR SELECT USING (is_published = TRUE);

-- AI Tools: public read
CREATE POLICY "AI tools are public" ON public.ai_tools FOR SELECT USING (TRUE);

-- Community: public read, authenticated write
CREATE POLICY "Community posts are public" ON public.community_posts FOR SELECT USING (TRUE);
CREATE POLICY "Authenticated can post" ON public.community_posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Courses: published only
CREATE POLICY "Published courses are public" ON public.courses FOR SELECT USING (is_published = TRUE);

-- Newsletter: insert only for all
CREATE POLICY "Anyone can subscribe" ON public.newsletter_subscribers FOR INSERT WITH CHECK (TRUE);

-- =============================================
-- SEED DATA — AI Tools
-- =============================================
INSERT INTO public.ai_tools (name, description, url, category, tags, pricing, rating, is_featured) VALUES
  ('ChatGPT', 'OpenAI''s flagship language model for text generation, analysis, and coding', 'https://chat.openai.com', 'text-generation', ARRAY['OpenAI','GPT-4','writing','coding'], 'freemium', 4.8, TRUE),
  ('Claude', 'Anthropic''s AI assistant — excellent for long documents and nuanced reasoning', 'https://claude.ai', 'text-generation', ARRAY['Anthropic','writing','analysis'], 'freemium', 4.9, TRUE),
  ('Midjourney', 'The leading AI image generation tool for artistic and photorealistic images', 'https://midjourney.com', 'image-generation', ARRAY['images','art','design'], 'paid', 4.9, TRUE),
  ('Cursor', 'AI-native code editor with deep codebase understanding', 'https://cursor.sh', 'code-generation', ARRAY['coding','IDE','copilot'], 'freemium', 4.8, TRUE),
  ('Runway', 'Professional AI video generation and editing', 'https://runwayml.com', 'video-generation', ARRAY['video','editing','creative'], 'freemium', 4.6, TRUE),
  ('Perplexity', 'AI-powered search engine with real-time web access', 'https://perplexity.ai', 'search', ARRAY['search','research','AI'], 'freemium', 4.7, TRUE);
