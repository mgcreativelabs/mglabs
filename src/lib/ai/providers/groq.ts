// ============================================================
// src/lib/ai/providers/groq.ts
// Groq adapter — same request this project already sends,
// just wrapped behind the ChatAdapter interface.
// ============================================================
import type { ChatAdapter, ChatMessage, ChatResult, Citation } from "@/lib/ai/types";
import { AIProviderError } from "@/lib/ai/types";
import { readOpenAICompatibleStream } from "@/lib/ai/sse";

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

    // Compound models spend tokens on search/tool-use before writing the
    // final answer, so they need more headroom than a plain chat model.
    const isCompound = model.startsWith("groq/compound");

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        max_tokens: isCompound ? 3072 : 1024,
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

    return { content, citations: extractCitations(data), raw: data };
  },

  async *chatStream(
    model: string,
    messages: ChatMessage[],
    opts?: { signal?: AbortSignal }
  ): AsyncGenerator<string> {
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
        stream: true,
      }),
      signal: opts?.signal,
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new AIProviderError(`Groq API error: ${res.status} — ${errText}`, res.status);
    }

    yield* readOpenAICompatibleStream(res);
  },
};

// ── Compound web-search citations ──────────────────────────────
// groq/compound and groq/compound-mini report every tool they ran in
// executed_tools[].search_results — each with a title/url per source.
// Only these two models ever populate this, so plain chat models are
// unaffected and this stays undefined (not an empty array) for them.
function extractCitations(data: unknown): Citation[] | undefined {
  const executedTools = (
    data as {
      choices?: {
        message?: {
          executed_tools?: {
            // Groq's docs show `{ results: [...] }`, but this field isn't
            // formally schema'd — accept a bare array too, defensively.
            search_results?:
              | { results?: { title?: string; url?: string }[] }
              | { title?: string; url?: string }[];
          }[];
        };
      }[];
    }
  ).choices?.[0]?.message?.executed_tools;

  if (!executedTools?.length) return undefined;

  const seen = new Set<string>();
  const citations: Citation[] = [];

  for (const tool of executedTools) {
    const sr = tool.search_results;
    const results = Array.isArray(sr) ? sr : sr?.results ?? [];
    for (const result of results) {
      if (!result.url || seen.has(result.url)) continue;
      seen.add(result.url);
      citations.push({ title: result.title || result.url, url: result.url });
    }
  }

  return citations.length ? citations : undefined;
}
