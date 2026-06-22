// =============================================
// PLATFORM STATS — src/lib/data/platform-stats.ts
// Real, DB-driven counts for marketing pages.
// Replaces hardcoded numbers like "50,000+ learners"
// and "1,200+ prompts" that didn't match actual data.
//
// Uses the cookie-free public client so callers can stay
// on Next.js static/ISR rendering (pair with
// `export const revalidate = <seconds>` in the page).
// =============================================

import { createPublicClient } from "@/lib/supabase/public";

export interface PlatformStats {
  learners: number;
  prompts: number;
  communityPosts: number;
}

const EMPTY_STATS: PlatformStats = { learners: 0, prompts: 0, communityPosts: 0 };

export async function getPlatformStats(): Promise<PlatformStats> {
  const supabase = createPublicClient();
  if (!supabase) return EMPTY_STATS;

  try {
    const [learners, prompts, communityPosts] = await Promise.all([
      supabase.from("profiles").select("*", { count: "exact", head: true }),
      supabase.from("prompts").select("*", { count: "exact", head: true }).eq("is_public", true),
      supabase.from("community_posts").select("*", { count: "exact", head: true }),
    ]);

    return {
      learners: learners.count ?? 0,
      prompts: prompts.count ?? 0,
      communityPosts: communityPosts.count ?? 0,
    };
  } catch {
    // Never let a stats query break a marketing page — fail soft to zero.
    return EMPTY_STATS;
  }
}

/**
 * Formats a count for display, rounding down to avoid implying false
 * precision (e.g. 1,247 -> "1.2K+"), while staying truthful — never
 * rounds UP past the real number.
 */
export function formatStatCount(n: number): string {
  if (n >= 1000) return `${Math.floor(n / 100) / 10}K+`;
  if (n >= 20) return `${Math.floor(n / 10) * 10}+`;
  return `${n}`;
}

/**
 * For copy like "Join 50,000+ creators" — only worth a number once
 * there's a real number worth showing. Below the threshold, returns
 * null so the caller can fall back to qualitative copy instead of an
 * awkward (if technically honest) "Join 3+ creators".
 */
export function formatStatCountOrNull(n: number, threshold = 20): string | null {
  if (n < threshold) return null;
  return formatStatCount(n);
}
