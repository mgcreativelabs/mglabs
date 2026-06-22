// =============================================
// AUTH HOOK — src/lib/hooks/useAuth.ts
// =============================================
"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  // createClient() returns null during SSR (see lib/supabase/client.ts).
  // This is fine: React effects don't run server-side, so all auth listeners
  // below are browser-only. We still need to suppress the `!supabase` path.
  const supabase = createClient();

  useEffect(() => {
    if (!supabase) {
      setState((prev) => ({ ...prev, loading: false }));
      return;
    }
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setState((prev) => ({
          ...prev,
          user: session?.user ?? null,
          loading: false,
        }));
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      if (!supabase) return { error: null };
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setState((prev) => ({ ...prev, error: error.message }));
      return { error };
    },
    [supabase]
  );

  const signUp = useCallback(
    async (email: string, password: string, fullName: string) => {
      if (!supabase) return { error: null };
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (error) setState((prev) => ({ ...prev, error: error.message }));
      return { error };
    },
    [supabase]
  );

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  }, [supabase]);

  const signInWithGoogle = useCallback(async (next?: string) => {
    if (!supabase) return { error: null };
    const redirectTo = new URL(`${window.location.origin}/auth/callback`);
    if (next && next.startsWith("/") && !next.startsWith("//")) {
      redirectTo.searchParams.set("next", next);
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: redirectTo.toString() },
    });
    return { error };
  }, [supabase]);

  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    isAuthenticated: !!state.user,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  };
}
