// ============================================================
// src/lib/ai/providers/sse.ts
// Shared SSE parser for OpenAI-compatible chat completion streams
// (Groq, Mistral both use this exact "data: {...}\n\n" shape with
// a terminal "data: [DONE]"). Written once here instead of copy-
// pasted into each adapter, per the project's no-duplication rule.
// ============================================================

import type { StreamChunk } from "@/lib/ai/types";

/**
 * Reads an OpenAI-compatible SSE response body and yields each
 * content delta as it arrives. Handles chunk boundaries that split
 * a "data: " line across two reads, and multiple events per read.
 */
export async function* readOpenAICompatibleSSE(
  body: ReadableStream<Uint8Array>
): AsyncGenerator<StreamChunk, void, unknown> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      // Last element may be a partial line — keep it in the buffer
      // for the next read instead of parsing a truncated JSON blob.
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;

        const payload = trimmed.slice("data:".length).trim();
        if (payload === "[DONE]") return;
        if (!payload) continue;

        try {
          const parsed = JSON.parse(payload);
          const delta: string | undefined = parsed.choices?.[0]?.delta?.content;
          if (delta) yield { delta };
        } catch {
          // Malformed/partial JSON on a boundary — skip rather than
          // crash the whole stream over one bad chunk.
          continue;
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
