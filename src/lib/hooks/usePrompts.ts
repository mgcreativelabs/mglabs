// =============================================
// PROMPTS HOOK — src/lib/hooks/usePrompts.ts
// =============================================
"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Prompt } from "@/types";

interface UsePromptsOptions {
  category?: string;
  search?: string;
  difficulty?: "beginner" | "intermediate" | "advanced" | "all";
  page?: number;
  pageSize?: number;
}

export function usePrompts(options: UsePromptsOptions = {}) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const { category, search, difficulty, page = 1, pageSize = 12 } = options;
  const supabase = createClient();

  const fetchPrompts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from("prompts")
        .select("*", { count: "exact" })
        .eq("is_public", true)
        .order("created_at", { ascending: false });

      if (category && category !== "all") {
        query = query.eq("category", category);
      }
      if (difficulty && difficulty !== "all") {
        query = query.eq("difficulty", difficulty);
      }
      if (search) {
        query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
      }

      const from = (page - 1) * pageSize;
      query = query.range(from, from + pageSize - 1);

      const { data, error: queryError, count } = await query;

      if (queryError) throw queryError;
      setPrompts((data as unknown as Prompt[]) || []);
      setTotal(count || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch prompts");
    } finally {
      setLoading(false);
    }
  }, [supabase, category, search, difficulty, page, pageSize]);

  useEffect(() => {
    fetchPrompts();
  }, [fetchPrompts]);

  return { prompts, loading, error, total, refetch: fetchPrompts };
}
