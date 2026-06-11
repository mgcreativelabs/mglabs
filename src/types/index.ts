export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: "user" | "admin";
  created_at: string;
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  author_id: string;
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

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  category: string;
  tags: string[];
  reading_time: number;
  is_published: boolean;
  is_featured: boolean;
  views_count: number;
  published_at?: string;
  created_at: string;
}

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export interface SEOMeta {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
}