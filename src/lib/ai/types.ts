// ============================================================
// src/lib/ai/types.ts
// Shared contract every provider adapter implements. The router
// and API route only ever talk to this interface — never to a
// provider SDK or fetch call directly.
// ============================================================

/**
 * A single part of a multimodal message. Mirrors the OpenAI vision
 * message shape since Groq's API is OpenAI-compatible — each
 * provider adapter translates this into whatever shape it needs
 * (Gemini's inline_data parts, etc).
 */
export type ChatContentPart =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string } };

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  /**
   * Plain string for ordinary text turns (the overwhelming majority).
   * An array of parts only when the message includes one or more
   * images — keeps every existing text-only call site unchanged.
   */
  content: string | ChatContentPart[];
}

export interface Citation {
  title?: string;
  url: string;
}

export interface ChatResult {
  content: string;
  /** Web search citations, when the model used a built-in search tool
   * (currently only groq/compound). Empty/absent otherwise. */
  citations?: Citation[];
  /** Raw provider response, kept for debugging — not sent to the client. */
  raw?: unknown;
}

/** A single streamed piece of a chat response: either a text delta
 * as it arrives, or a final citations event (only emitted by models
 * with built-in web search, e.g. groq/compound). Consumed by
 * providers/sse.ts and any route that streams responses to the client. */
export type StreamChunk = { delta: string } | { citations: Citation[] };

export interface ChatAdapter {
  /** Provider id, matches TextModelOption.provider in ai-models.ts */
  provider: string;
  chat(model: string, messages: ChatMessage[]): Promise<ChatResult>;
  /**
   * Streaming variant — yields text deltas as they arrive from the
   * provider, plus an optional final citations event for models with
   * built-in web search. Optional: not every provider adapter needs
   * to implement this immediately; the router can fall back to
   * chat() + a single synthetic chunk when it's missing.
   */
  chatStream?(model: string, messages: ChatMessage[]): AsyncGenerator<StreamChunk, void, unknown>;
}

/** Thrown by adapters on any upstream failure — carries an HTTP status
 * the API route can pass straight through to the client. */
export class AIProviderError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.name = "AIProviderError";
    this.status = status;
  }
}
