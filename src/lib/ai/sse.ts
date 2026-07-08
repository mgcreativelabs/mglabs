// ============================================================
// src/lib/ai/sse.ts
// Minimal SSE reader for OpenAI-compatible chat completion streams
// (Groq and Mistral both use this exact wire format: lines of
// `data: {...}` ending in `data: [DONE]`). Kept provider-agnostic
// so both adapters share one parser instead of duplicating it.
// ============================================================

/** Reads an OpenAI-compatible SSE response body and yields each
 * `choices[0].delta.content` chunk as it arrives. */
export async function* readOpenAICompatibleStream(
  res: Response
): AsyncGenerator<string> {
  if (!res.body) return;

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      // Last line may be a partial line split across chunks — keep it
      // in the buffer until more data arrives.
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;

        const payload = trimmed.slice(5).trim();
        if (payload === "[DONE]") return;

        try {
          const parsed = JSON.parse(payload);
          const delta: string | undefined = parsed.choices?.[0]?.delta?.content;
          if (delta) yield delta;
        } catch {
          // Ignore malformed keep-alive/comment lines — not fatal.
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
