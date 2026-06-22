// =============================================
// SUPABASE CLIENT — src/lib/supabase/client.ts
// Browser-side Supabase client (singleton pattern)
// =============================================

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

type SupabaseClient = ReturnType<typeof createBrowserClient<Database>>;
let client: SupabaseClient | null = null;

/**
 * Returns the singleton browser Supabase client.
 *
 * During SSR / Next.js build-time pre-rendering, this returns `null` — browser
 * clients must not be created on the server (they have no cookies / session
 * access there; use `lib/supabase/server.ts` for server-side auth).
 *
 * In the browser, throws clearly if `NEXT_PUBLIC_SUPABASE_*` env vars are
 * missing so misconfiguration is caught immediately at run time.
 */
export function createClient(): SupabaseClient {
  // On the server (SSR / build), never instantiate the browser client.
  // Components that use this (via useAuth etc.) must handle null gracefully.
  if (typeof window === "undefined") {
    // Return a minimal stub that satisfies TypeScript — only `.auth` calls
    // are made from hooks, and those will be no-ops during SSR because
    // React effects don't run server-side. We cast to the full type because
    // we only reach real client code in the browser where the real client is
    // created below.
    return null as unknown as SupabaseClient;
  }

  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local (and in Vercel → Settings → " +
        "Environment Variables for deployed environments)."
    );
  }

  client = createBrowserClient<Database>(url, anonKey);
  return client;
}
