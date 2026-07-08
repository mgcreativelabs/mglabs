// ============================================================
// src/lib/ai/providers/mistral.ts
// Mistral adapter — La Plateforme's chat completions endpoint
// is OpenAI-compatible, same shape as the existing Groq call.
// Free tier (rate-limited, no card required): MISTRAL_API_KEY.
// ============================================================
import type { ChatAdapter, ChatMessage, ChatResult } from "@/lib/ai/types";
import { AIProviderError } from "@/lib/ai/types";
import { readOpenAICompatibleStream } from "@/lib/ai/sse";

const SYSTEM_PROMPT =
  "You are MG Labs AI, a helpful AI assistant for MG Creative Labs — an AI education platform. " +
  "You specialize in AI tools, prompt engineering, coding with AI, AI design, and automation. " +
  "Be concise, practical, and friendly. Format responses with markdown when helpful.";

export const mistralAdapter: ChatAdapter = {
  provider: "mistral",

  async chat(model: string, messages: ChatMessage[]): Promise<ChatResult> {
    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
      throw new AIProviderError(
        "Mistral API key not configured. Add MISTRAL_API_KEY to your Vercel env vars.",
        500
      );
    }

    const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new AIProviderError(`Mistral API error: ${res.status} — ${errText}`, res.status);
    }

    const data = await res.json();
    const content: string =
      data.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";

    return { content, raw: data };
  },

  async *chatStream(
    model: string,
    messages: ChatMessage[],
    opts?: { signal?: AbortSignal }
  ): AsyncGenerator<string> {
    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
      throw new AIProviderError(
        "Mistral API key not configured. Add MISTRAL_API_KEY to your Vercel env vars.",
        500
      );
    }

    const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 1024,
        temperature: 0.7,
        stream: true,
      }),
      signal: opts?.signal,
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new AIProviderError(`Mistral API error: ${res.status} — ${errText}`, res.status);
    }

    yield* readOpenAICompatibleStream(res);
  },
};
