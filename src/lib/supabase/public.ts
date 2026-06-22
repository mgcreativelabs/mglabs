// =============================================
// SUPABASE PUBLIC CLIENT — src/lib/supabase/public.ts
// Plain anonymous client for public, cacheable reads
// (e.g. homepage stats). Deliberately does NOT touch
// next/headers cookies(), so pages that only use this
// client can remain statically generated / ISR-cached
// instead of being forced into fully dynamic rendering.
//
// Only use this for data covered by a public RLS read
// policy (profiles, public prompts, ai_tools, etc).
// Never use it for anything user-specific — use
// lib/supabase/server.ts (cookie-aware) for that.
// =============================================

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return createSupabaseClient<Database>(url, anonKey, {
    auth: { persistSession: false },
  });
}
