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
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
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
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
