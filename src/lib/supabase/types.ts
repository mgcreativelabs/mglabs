// =============================================
// DATABASE TYPES — src/lib/supabase/types.ts
// Auto-generated-style type definitions for Supabase
// =============================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface CourseLesson {
  id: number;
  title: string;
  duration: string;
  isFree: boolean;
}

export interface CourseModule {
  title: string;
  lessons: CourseLesson[];
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          username: string | null;
          full_name: string | null;
          bio: string | null;
          avatar_url: string | null;
          website: string | null;
          twitter: string | null;
          github: string | null;
          role: "user" | "admin" | "moderator";
          subscription_tier: "free" | "pro" | "enterprise";
          streak_count: number;
          last_active_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      prompts: {
        Row: {
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
          model: string | null;
          difficulty: "beginner" | "intermediate" | "advanced";
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["prompts"]["Row"], "id" | "created_at" | "updated_at" | "likes_count" | "saves_count" | "views_count">;
        Update: Partial<Database["public"]["Tables"]["prompts"]["Insert"]>;
        Relationships: [];
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          cover_image: string | null;
          author_id: string;
          category: string;
          tags: string[];
          reading_time: number;
          is_published: boolean;
          is_featured: boolean;
          views_count: number;
          likes_count: number;
          seo_title: string | null;
          seo_description: string | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["blog_posts"]["Row"], "id" | "created_at" | "updated_at" | "views_count" | "likes_count">;
        Update: Partial<Database["public"]["Tables"]["blog_posts"]["Insert"]>;
        Relationships: [];
      };
      ai_tools: {
        Row: {
          id: string;
          name: string;
          description: string;
          url: string;
          logo_url: string | null;
          category: string;
          tags: string[];
          pricing: "free" | "freemium" | "paid" | "open-source";
          rating: number | null;
          is_featured: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["ai_tools"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["ai_tools"]["Insert"]>;
        Relationships: [];
      };
      saved_prompts: {
        Row: {
          id: string;
          user_id: string;
          prompt_id: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["saved_prompts"]["Row"], "id" | "created_at">;
        Update: never;
        Relationships: [];
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          is_confirmed: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["newsletter_subscribers"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["newsletter_subscribers"]["Insert"]>;
        Relationships: [];
      };
      community_posts: {
        Row: {
          id: string;
          title: string;
          content: string;
          author_id: string;
          category: string;
          tags: string[];
          likes_count: number;
          replies_count: number;
          views_count: number;
          is_pinned: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["community_posts"]["Row"], "id" | "created_at" | "updated_at" | "likes_count" | "replies_count" | "views_count">;
        Update: Partial<Database["public"]["Tables"]["community_posts"]["Insert"]>;
        Relationships: [];
      };
      community_replies: {
        Row: {
          id: string;
          post_id: string;
          author_id: string;
          content: string;
          likes_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["community_replies"]["Row"], "id" | "created_at" | "updated_at" | "likes_count">;
        Update: Partial<Database["public"]["Tables"]["community_replies"]["Insert"]>;
        Relationships: [];
      };
      courses: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          cover_image: string | null;
          instructor_id: string | null;
          category: "ai-learning" | "coding" | "design" | "automation";
          level: "beginner" | "intermediate" | "advanced";
          lessons_count: number;
          duration_hours: number;
          is_published: boolean;
          is_featured: boolean;
          price: number;
          enrollment_count: number;
          rating: number | null;
          curriculum: CourseModule[];
          what_youll_learn: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["courses"]["Row"], "id" | "created_at" | "updated_at" | "enrollment_count">;
        Update: Partial<Database["public"]["Tables"]["courses"]["Insert"]>;
        Relationships: [];
      };
      course_enrollments: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          progress_percent: number;
          completed_lesson_ids: string[];
          started_at: string;
          last_accessed_at: string;
          completed_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["course_enrollments"]["Row"], "id" | "started_at" | "last_accessed_at">;
        Update: Partial<Database["public"]["Tables"]["course_enrollments"]["Insert"]>;
        Relationships: [];
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string | null;
          message: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["contact_messages"]["Row"], "id" | "created_at" | "is_read">;
        Update: Partial<Database["public"]["Tables"]["contact_messages"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      touch_daily_streak: {
        Args: { p_user_id: string };
        Returns: number;
      };
    };
    Enums: Record<string, never>;
  };
}
