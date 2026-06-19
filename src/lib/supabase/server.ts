// =============================================
// SUPABASE SERVER CLIENT — src/lib/supabase/server.ts
// Server-side Supabase client using cookies
// =============================================

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./types";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
     process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nvxejaaweiykmzweknqy.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52eGVqYWF3ZWl5a216d2VrbnF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNDUxNjEsImV4cCI6MjA5NjgyMTE2MX0.NLmqnYm7bURQ-8AbFKVMDaixWoN6chX026v6WeTxKJ8',
    {
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
    }
  );
}
