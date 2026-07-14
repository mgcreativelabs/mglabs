// ============================================================
// src/lib/ai/providers/groq.ts
// Groq adapter — same request this project already sends,
// just wrapped behind the ChatAdapter interface.
// ============================================================
import type { ChatAdapter, ChatMessage, ChatResult } from "@/lib/ai/types";
import { AIProviderError } from "@/lib/ai/types";

const SYSTEM_PROMPT =
  "You are MG Labs AI, a helpful AI assistant for MG Creative Labs — an AI education platform. " +
  "You specialize in AI tools, prompt engineering, coding with AI, AI design, and automation. " +
  "Be concise, practical, and friendly. Format responses with markdown when helpful.";

export const groqAdapter: ChatAdapter = {
  provider: "groq",

  async chat(model: string, messages: ChatMessage[]): Promise<ChatResult> {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new AIProviderError(
        "Groq API key not configured. Add GROQ_API_KEY to your Vercel env vars.",
        500
      );
    }

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
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
      throw new AIProviderError(`Groq API error: ${res.status} — ${errText}`, res.status);
    }

    const data = await res.json();
    const content: string =
      data.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";

    return { content, raw: data };
  },
};
