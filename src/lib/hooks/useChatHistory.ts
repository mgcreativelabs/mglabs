// =============================================
// useChatHistory — src/lib/hooks/useChatHistory.ts
// =============================================
// Supabase-backed data layer for the MG Labs AI chat sidebar
// (src/app/mg-ai/ChatSidebar.tsx) and composer
// (src/app/mg-ai/MGAIChat.tsx). Schema: supabase/migrations/
// 003_mg_ai_chat_persistence.sql and 004_chat_attachments_citations.sql.
//
// Ownership: every chat_conversations row is keyed on session_id
// (anonymous browser, from useChatSession) and/or user_id (signed-in).
// This hook only ever writes session_id — claiming anonymous chats
// on login is handled separately via the claim_anonymous_chats() RPC,
// not from here.
//
// Note: src/lib/supabase/types.ts predates these tables, so reads/
// writes below go through `as any` on the Supabase client — the same
// pattern already used in src/components/sections/Newsletter.tsx for
// the same reason (newsletter_subscribers isn't in the generated
// types either).
"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export interface Citation {
  title?: string;
  url: string;
}

export interface Attachment {
  dataUrl: string;
  name: string;
}

export interface StoredConversation {
  id: string;
  title: string;
  pinned: boolean;
  updatedAt: string;
}

export interface StoredMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  imageUrl?: string | null;
  imageModel?: string | null;
  attachments?: Attachment[] | null;
  citations?: Citation[] | null;
}

interface NewMessageInput {
  role: "user" | "assistant";
  content: string;
  imageUrl?: string;
  imageModel?: string;
  attachments?: Attachment[];
  citations?: Citation[];
}

interface ChatHistoryState {
  conversations: StoredConversation[];
  loading: boolean;
}

/**
 * Supabase-backed conversation history for one anonymous/signed-in
 * chat session. Pass the id returned by useChatSession(); while it's
 * still null (SSR / not-yet-hydrated), this hook returns an empty,
 * non-loading state and every write becomes a no-op.
 */
export function useChatHistory(sessionId: string | null) {
  const [state, setState] = useState<ChatHistoryState>({
    conversations: [],
    loading: true,
  });

  const supabase = createClient();

  const refresh = useCallback(async () => {
    if (!supabase || !sessionId) {
      setState((prev) => ({ ...prev, loading: false }));
      return;
    }

    setState((prev) => ({ ...prev, loading: true }));

    const { data, error } = await (supabase as any)
      .from("chat_conversations")
      .select("id, title, pinned, updated_at")
      .eq("session_id", sessionId)
      .order("updated_at", { ascending: false });

    if (error) {
      // Fail soft: an empty sidebar is recoverable, a crashed chat
      // page is not. The composer still works without history.
      console.error("useChatHistory: failed to load conversations", error);
      setState({ conversations: [], loading: false });
      return;
    }

    setState({
      conversations: (data ?? []).map((row: any) => ({
        id: row.id,
        title: row.title,
        pinned: row.pinned,
        updatedAt: row.updated_at,
      })),
      loading: false,
    });
  }, [supabase, sessionId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  /**
   * Creates a new conversation row and returns its id, or null if
   * the write failed / no session is available yet. Awaited by
   * the caller before the first message can be saved.
   */
  const createConversation = useCallback(
    async (firstMessage: string, modelId: string): Promise<string | null> => {
      if (!supabase || !sessionId) return null;

      // Trim to a short title — full messages can be long, and the
      // sidebar row only has room for a line or two.
      const title = firstMessage.trim().slice(0, 60) || "New chat";

      const { data, error } = await (supabase as any)
        .from("chat_conversations")
        .insert({ session_id: sessionId, title, model_id: modelId })
        .select("id")
        .single();

      if (error || !data) {
        console.error("useChatHistory: failed to create conversation", error);
        return null;
      }

      await refresh();
      return data.id as string;
    },
    [supabase, sessionId, refresh]
  );

  /**
   * Persists a message to an existing conversation. Fire-and-forget
   * from the caller's perspective (not awaited) — a failed save
   * shouldn't block the chat UI, it just won't appear on reload.
   */
  const saveMessage = useCallback(
    async (conversationId: string, message: NewMessageInput) => {
      if (!supabase) return;

      const { error } = await (supabase as any).from("chat_messages").insert({
        conversation_id: conversationId,
        role: message.role,
        content: message.content,
        image_url: message.imageUrl ?? null,
        image_model: message.imageModel ?? null,
        attachments: message.attachments ?? null,
        citations: message.citations ?? null,
      });

      if (error) {
        console.error("useChatHistory: failed to save message", error);
      }
    },
    [supabase]
  );

  /**
   * Loads every message in a conversation, oldest first, for
   * displaying in the chat window when the user selects it from
   * the sidebar.
   */
  const loadMessages = useCallback(
    async (conversationId: string): Promise<StoredMessage[]> => {
      if (!supabase) return [];

      const { data, error } = await (supabase as any)
        .from("chat_messages")
        .select("id, role, content, image_url, image_model, attachments, citations")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("useChatHistory: failed to load messages", error);
        return [];
      }

      return (data ?? []).map((row: any) => ({
        id: row.id,
        role: row.role,
        content: row.content,
        imageUrl: row.image_url,
        imageModel: row.image_model,
        attachments: row.attachments,
        citations: row.citations,
      }));
    },
    [supabase]
  );

  const renameConversation = useCallback(
    async (id: string, title: string) => {
      if (!supabase) return;
      setState((prev) => ({
        ...prev,
        conversations: prev.conversations.map((c) =>
          c.id === id ? { ...c, title } : c
        ),
      }));
      const { error } = await (supabase as any)
        .from("chat_conversations")
        .update({ title })
        .eq("id", id);
      if (error) {
        console.error("useChatHistory: failed to rename conversation", error);
        refresh();
      }
    },
    [supabase, refresh]
  );

  const togglePinned = useCallback(
    async (id: string, pinned: boolean) => {
      if (!supabase) return;
      setState((prev) => ({
        ...prev,
        conversations: prev.conversations.map((c) =>
          c.id === id ? { ...c, pinned } : c
        ),
      }));
      const { error } = await (supabase as any)
        .from("chat_conversations")
        .update({ pinned })
        .eq("id", id);
      if (error) {
        console.error("useChatHistory: failed to toggle pinned", error);
        refresh();
      }
    },
    [supabase, refresh]
  );

  const deleteConversation = useCallback(
    async (id: string) => {
      if (!supabase) return;
      setState((prev) => ({
        ...prev,
        conversations: prev.conversations.filter((c) => c.id !== id),
      }));
      const { error } = await (supabase as any)
        .from("chat_conversations")
        .delete()
        .eq("id", id);
      if (error) {
        console.error("useChatHistory: failed to delete conversation", error);
        refresh();
      }
    },
    [supabase, refresh]
  );

  return {
    conversations: state.conversations,
    loading: state.loading,
    refresh,
    createConversation,
    saveMessage,
    loadMessages,
    renameConversation,
    togglePinned,
    deleteConversation,
  };
}
