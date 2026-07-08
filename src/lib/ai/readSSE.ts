// ============================================================
// src/lib/ai/readSSE.ts
// Client-side counterpart to the server's SSE emitter in
// src/app/api/chat/route.ts. Parses "data: {...}\n\n" events out
// of a fetch() response body and yields typed chunks — kept
// separate from the OpenAI-compatible server-side parser in
// providers/sse.ts because the event shape here is our own
// route's `{ delta } | { error } | { done }`, not a provider's.
// ============================================================

export interface ChatSSEEvent {
  /** Sent once at the very start — the model that will actually answer
   * (may differ from the one requested if an image triggered a
   * vision-model reroute; see api/chat/route.ts). */
  model?: string;
  delta?: string;
  citations?: { title?: string; url: string }[];
  error?: string;
  done?: boolean;
}

export async function* readSSE(body: ReadableStream<Uint8Array>): AsyncGenerator<ChatSSEEvent, void, unknown> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const payload = trimmed.slice("data:".length).trim();
        if (!payload) continue;

        try {
          const parsed = JSON.parse(payload) as ChatSSEEvent;
          yield parsed;
          if (parsed.done) return;
        } catch {
          continue;
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
