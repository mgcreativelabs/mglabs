// =============================================
// CORE TYPES — src/types/index.ts
// =============================================

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: "user" | "admin";
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  username?: string;
  bio?: string;
  website?: string;
  twitter?: string;
  github?: string;
  avatar_url?: string;
  full_name?: string;
  role: "user" | "admin" | "moderator";
  subscription_tier: "free" | "pro" | "enterprise";
  created_at: string;
  updated_at: string;
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  category: PromptCategory;
  tags: string[];
  author_id: string;
  author?: Profile;
  likes_count: number;
  saves_count: number;
  views_count: number;
  is_featured: boolean;
  is_public: boolean;
  model?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  created_at: string;
  updated_at: string;
}

export type PromptCategory =
  | "writing"
  | "coding"
  | "design"
  | "business"
  | "education"
  | "marketing"
  | "productivity"
  | "creativity"
  | "research"
  | "other";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  author_id: string;
  author?: Profile;
  category: BlogCategory;
  tags: string[];
  reading_time: number;
  is_published: boolean;
  is_featured: boolean;
  views_count: number;
  likes_count: number;
  seo_title?: string;
  seo_description?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export type BlogCategory =
  | "ai-tools"
  | "prompt-engineering"
  | "tutorials"
  | "news"
  | "design"
  | "coding"
  | "automation"
  | "case-studies";

export interface AITool {
  id: string;
  name: string;
  description: string;
  url: string;
  logo_url?: string;
  category: ToolCategory;
  tags: string[];
  pricing: "free" | "freemium" | "paid" | "open-source";
  rating?: number;
  is_featured: boolean;
  created_at: string;
}

export type ToolCategory =
  | "text-generation"
  | "image-generation"
  | "code-generation"
  | "video-generation"
  | "audio-generation"
  | "data-analysis"
  | "productivity"
  | "design"
  | "search"
  | "other";

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover_image?: string;
  instructor_id: string;
  instructor?: Profile;
  category: "ai-learning" | "coding" | "design" | "automation";
  level: "beginner" | "intermediate" | "advanced";
  lessons_count: number;
  duration_hours: number;
  is_published: boolean;
  is_featured: boolean;
  price: number;
  enrollment_count: number;
  rating?: number;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  content: string;
  video_url?: string;
  duration_minutes: number;
  order_index: number;
  is_free: boolean;
  created_at: string;
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author_id: string;
  author?: Profile;
  category: "general" | "help" | "showcase" | "resources" | "jobs";
  tags: string[];
  likes_count: number;
  replies_count: number;
  views_count: number;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

export interface SavedPrompt {
  id: string;
  user_id: string;
  prompt_id: string;
  prompt?: Prompt;
  created_at: string;
}

export interface Newsletter {
  id: string;
  email: string;
  name?: string;
  is_confirmed: boolean;
  created_at: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  badge?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface SEOMeta {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedAt?: string;
  author?: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
