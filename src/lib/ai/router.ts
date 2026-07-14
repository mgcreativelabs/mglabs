// ============================================================
// src/lib/ai/router.ts
// Single entry point for chat completions. The API route and
// UI only ever know a model id — this router looks up which
// provider owns that model (via ai-models.ts) and dispatches
// to the matching adapter. Add a new provider by: writing an
// adapter in ./providers, registering it below, and adding its
// models to src/lib/data/ai-models.ts. Nothing else changes.
// ============================================================
import type { ChatAdapter, ChatMessage, ChatResult } from "@/lib/ai/types";
import { AIProviderError } from "@/lib/ai/types";
import { groqAdapter } from "@/lib/ai/providers/groq";
import { geminiAdapter } from "@/lib/ai/providers/gemini";
import { mistralAdapter } from "@/lib/ai/providers/mistral";
import { TEXT_MODELS } from "@/lib/data/ai-models";

const ADAPTERS: Record<string, ChatAdapter> = {
  groq: groqAdapter,
  gemini: geminiAdapter,
  mistral: mistralAdapter,
};

export async function routeChat(
  modelId: string,
  messages: ChatMessage[]
): Promise<ChatResult> {
  const model = TEXT_MODELS.find((m) => m.id === modelId);
  if (!model) {
    throw new AIProviderError(`Unknown model id: ${modelId}`, 400);
  }

  const adapter = ADAPTERS[model.provider];
  if (!adapter) {
    throw new AIProviderError(
      `No adapter registered for provider "${model.provider}".`,
      500
    );
  }

  return adapter.chat(modelId, messages);
}
