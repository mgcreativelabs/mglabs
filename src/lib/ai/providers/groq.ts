// ============================================================
// src/lib/ai/providers/groq.ts
// Groq adapter — same request this project already sends,
// just wrapped behind the ChatAdapter interface.
// ============================================================
import type { ChatAdapter, ChatMessage, ChatResult, Citation, StreamChunk } from "@/lib/ai/types";
import { AIProviderError } from "@/lib/ai/types";
import { readOpenAICompatibleSSE } from "@/lib/ai/providers/sse";

const SYSTEM_PROMPT =
  "You are MG Labs AI, a helpful AI assistant for MG Creative Labs — an AI education platform. " +
  "You specialize in AI tools, prompt engineering, coding with AI, AI design, and automation. " +
  "Be concise, practical, and friendly. Format responses with markdown when helpful.";

// groq/compound's web search citations only ever appear on
// message.executed_tools[].search_results in the non-streaming
// response shape — Groq's streaming SSE deltas never carry them.
// See chatStream below for how compound is special-cased around this.
function extractCitations(data: unknown): Citation[] | undefined {
  const executedTools = (data as {
    choices?: { message?: { executed_tools?: { search_results?: { results?: unknown[] } }[] } }[];
  })?.choices?.[0]?.message?.executed_tools;
  if (!executedTools?.length) return undefined;

  const citations: Citation[] = [];
  for (const tool of executedTools) {
    const results = tool.search_results?.results;
    if (!Array.isArray(results)) continue;
    for (const r of results) {
      const result = r as { url?: string; title?: string };
      if (result?.url) citations.push({ url: result.url, title: result.title });
    }
  }
  return citations.length > 0 ? citations : undefined;
}

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

    return { content, citations: extractCitations(data), raw: data };
  },

  async *chatStream(model: string, messages: ChatMessage[]): AsyncGenerator<StreamChunk, void, unknown> {
    // groq/compound's citations only come back on the non-streaming
    // response shape (message.executed_tools[].search_results) — the
    // streaming delta events never include them. Since search results
    // are the whole point of picking this model, trade streaming's
    // token-by-token feel for citations here: do one non-streaming
    // call, then emit its content as a single delta so the client's
    // SSE consumer doesn't need a separate code path.
    if (model === "groq/compound") {
      const result = await this.chat(model, messages);
      yield { delta: result.content };
      if (result.citations?.length) yield { citations: result.citations };
      return;
    }

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
    });

    if (!res.ok || !res.body) {
      const errText = await res.text().catch(() => "");
      throw new AIProviderError(`Groq API error: ${res.status} — ${errText}`, res.status);
    }

    yield* readOpenAICompatibleSSE(res.body);
  },
};
