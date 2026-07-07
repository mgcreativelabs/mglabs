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

export interface ChatResult {
  content: string;
  /** Raw provider response, kept for debugging — not sent to the client. */
  raw?: unknown;
}

export interface ChatAdapter {
  /** Provider id, matches TextModelOption.provider in ai-models.ts */
  provider: string;
  chat(model: string, messages: ChatMessage[]): Promise<ChatResult>;
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
