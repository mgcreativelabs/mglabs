// ============================================================
// src/lib/ai/types.ts
// Shared contract every provider adapter implements. The router
// and API route only ever talk to this interface — never to a
// provider SDK or fetch call directly.
// ============================================================

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/** A single web source a compound/search-enabled model cited while
 * answering — surfaced to the client so replies show their sources. */
export interface Citation {
  title: string;
  url: string;
}

export interface ChatResult {
  content: string;
  /** Present when the adapter used a built-in web search tool (e.g. Groq
   * compound models). Omitted entirely when no search happened. */
  citations?: Citation[];
  /** Raw provider response, kept for debugging — not sent to the client. */
  raw?: unknown;
}

export interface ChatAdapter {
  /** Provider id, matches TextModelOption.provider in ai-models.ts */
  provider: string;
  chat(model: string, messages: ChatMessage[]): Promise<ChatResult>;
  /** Optional — streams text deltas as they arrive instead of waiting for
   * the full reply. Adapters that skip this fall back to `chat()`, buffered
   * and yielded as one chunk (see router.ts). Not implemented for compound
   * models: their tool-call metadata (citations) is only reliably available
   * on the final, non-streamed response. */
  chatStream?(
    model: string,
    messages: ChatMessage[],
    opts?: { signal?: AbortSignal }
  ): AsyncGenerator<string>;
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
