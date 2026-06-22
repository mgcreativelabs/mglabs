// =============================================
// SUPABASE SERVER CLIENT — src/lib/supabase/server.ts
// Server-side Supabase client using cookies
// =============================================

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./types";

export async function createClient() {
  const cookieStore = await cookies();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nvxejaaweiykmzweknqy.supabase.co';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52eGVqYWF3ZWl5a216d2VrbnF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNDUxNjEsImV4cCI6MjA5NjgyMTE2MX0.NLmqnYm7bURQ-8AbFKVMDaixWoN6chX026v6WeTxKJ8';

  if (!url || !anonKey) {
    // During the build, some static pages import server utilities indirectly.
    // Throw here so the error is obvious at deploy time with real config, but
    // allow `force-dynamic` pages (dashboard, API routes, etc.) to surface it
    // at request time rather than during the static-gen pass.
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and " +
          "NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel → Settings → Environment Variables."
      );
    }
    // In development / build without env vars, throw with a helpful message
    throw new Error(
      "Missing Supabase environment variables. Copy .env.local.example to .env.local " +
        "and fill in your Supabase project URL and anon key."
    );
  }

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Component — cookies can't be set (OK for read-only)
        }
      },
    },
  });
}
