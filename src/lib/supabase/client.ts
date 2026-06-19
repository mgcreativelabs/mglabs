// =============================================
// SUPABASE CLIENT — src/lib/supabase/client.ts
// Browser-side Supabase client (singleton pattern)
// =============================================

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

let client: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function createClient() {
  if (client) return client;

  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nvxejaaweiykmzweknqy.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52eGVqYWF3ZWl5a216d2VrbnF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNDUxNjEsImV4cCI6MjA5NjgyMTE2MX0.NLmqnYm7bURQ-8AbFKVMDaixWoN6chX026v6WeTxKJ8'
  );

  return client;
}
