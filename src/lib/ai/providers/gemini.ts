// ============================================================
// src/lib/ai/providers/gemini.ts
// Gemini adapter — calls Google's Generative Language REST API
// directly (no SDK dependency, matches the project's existing
// pattern of plain fetch() calls for every provider).
// Free tier via Google AI Studio: GEMINI_API_KEY.
// ============================================================
import type { ChatAdapter, ChatMessage, ChatResult } from "@/lib/ai/types";
import { AIProviderError } from "@/lib/ai/types";

const SYSTEM_PROMPT =
  "You are MG Labs AI, a helpful AI assistant for MG Creative Labs — an AI education platform. " +
  "You specialize in AI tools, prompt engineering, coding with AI, AI design, and automation. " +
  "Be concise, practical, and friendly. Format responses with markdown when helpful.";

// Gemini has no "system" role — it uses a separate systemInstruction
// field, and only "user" / "model" roles inside contents.
function toGeminiContents(messages: ChatMessage[]) {
  return messages
    .filter((m) => m.role !== "system")
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));
}

export const geminiAdapter: ChatAdapter = {
  provider: "gemini",

  async chat(model: string, messages: ChatMessage[]): Promise<ChatResult> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new AIProviderError(
        "Gemini API key not configured. Add GEMINI_API_KEY to your Vercel env vars.",
        500
      );
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: toGeminiContents(messages),
        generationConfig: {
          maxOutputTokens: 1024,
          temperature: 0.7,
        },
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new AIProviderError(`Gemini API error: ${res.status} — ${errText}`, res.status);
    }

    const data = await res.json();
    const content: string =
      data.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Sorry, I couldn't generate a response.";

    return { content, raw: data };
  },

  // Gemini's streaming endpoint is a *different* path (streamGenerateContent)
  // rather than a `stream: true` flag on the same one — with `alt=sse` it
  // emits standard `data: {...}` lines, each a full candidate-so-far JSON
  // object (not an OpenAI-style delta), so parsing it needs its own loop.
  async *chatStream(
    model: string,
    messages: ChatMessage[],
    opts?: { signal?: AbortSignal }
  ): AsyncGenerator<string> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new AIProviderError(
        "Gemini API key not configured. Add GEMINI_API_KEY to your Vercel env vars.",
        500
      );
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: toGeminiContents(messages),
        generationConfig: {
          maxOutputTokens: 1024,
          temperature: 0.7,
        },
      }),
      signal: opts?.signal,
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new AIProviderError(`Gemini API error: ${res.status} — ${errText}`, res.status);
    }

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
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;

          const payload = trimmed.slice(5).trim();
          if (!payload) continue;

          try {
            const parsed = JSON.parse(payload);
            const text: string | undefined =
              parsed.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) yield text;
          } catch {
            // Ignore malformed keep-alive lines — not fatal.
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  },
};
