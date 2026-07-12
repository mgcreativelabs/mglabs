// =============================================
// useChatSession — src/lib/hooks/useChatSession.ts
// =============================================
// MG Labs AI (/mg-ai) is explicitly "free, no account required" —
// see src/app/mg-ai/page.tsx metadata and supabase/migrations/
// 003_mg_ai_chat_persistence.sql for the full rationale.
//
// This hook generates (or reuses) a UUID identifying the current
// anonymous browser and persists it in localStorage. That id is
// sent as `session_id` on chat_conversations rows so a visitor's
// history survives page refreshes without requiring login. If they
// later sign in, claim_anonymous_chats(session_id) (see migration
// 003) can attach these rows to their user_id.
"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "mglabs_chat_session_id";

function generateUuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID (older Safari).
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Returns a stable anonymous session id for the current browser,
 * creating and persisting one on first use. Returns null during
 * SSR / before the effect has run, since localStorage isn't
 * available server-side — callers should treat a null sessionId
 * as "not ready yet" rather than an error.
 */
export function useChatSession(): string | null {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const existing = window.localStorage.getItem(STORAGE_KEY);
      if (existing) {
        setSessionId(existing);
        return;
      }
      const fresh = generateUuid();
      window.localStorage.setItem(STORAGE_KEY, fresh);
      setSessionId(fresh);
    } catch {
      // localStorage unavailable (private browsing / disabled storage).
      // Fall back to an in-memory id — history just won't persist
      // across reloads for this visitor, which is an acceptable
      // degradation rather than a hard failure.
      setSessionId(generateUuid());
    }
  }, []);

  return sessionId;
}
