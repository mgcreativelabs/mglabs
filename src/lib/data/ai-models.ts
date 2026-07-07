// =============================================
// AI MODEL CATALOG — src/lib/data/ai-models.ts
// Single source of truth for every free AI model MG Labs AI
// exposes to users — both text chat (Groq) and image
// generation (Pollinations). Imported by:
//   - src/app/api/chat/route.ts            (validates + defaults)
//   - src/app/api/image-generate/route.ts  (validates + defaults)
//   - src/app/mg-ai/MGAIChat.tsx            (renders the pickers)
//
// Keeping this in one file means the UI can never offer a model
// the backend doesn't accept, and vice versa — no drift.
// =============================================

export interface TextModelOption {
  id: string;
  label: string;
  emoji: string;
  description: string;
  /** Shown in the "best for" hint under the picker. */
  bestFor: string;
  /** Which adapter in src/lib/ai/providers handles this model. */
  provider: "groq" | "gemini" | "mistral";
}

export interface ImageModelOption {
  id: string;
  label: string;
  emoji: string;
  description: string;
}

// ── Text models (served via Groq) ────────────────────────────
// Curated for genuinely distinct strengths — no redundant entries.
// All are free on Groq's public API tier.
export const TEXT_MODELS: TextModelOption[] = [
  {
    id: "openai/gpt-oss-120b",
    label: "GPT-OSS 120B",
    emoji: "🧠",
    description: "Smartest — best for reasoning & code",
    bestFor: "Complex questions, planning, debugging",
    provider: "groq",
  },
  {
    id: "openai/gpt-oss-20b",
    label: "GPT-OSS 20B",
    emoji: "⚡",
    description: "Fast reasoning, lighter",
    bestFor: "Quick answers without heavy reasoning",
    provider: "groq",
  },
  {
    id: "llama-3.3-70b-versatile",
    label: "Llama 3.3 70B",
    emoji: "🦙",
    description: "Well-rounded all-purpose",
    bestFor: "General chat, writing, everyday tasks",
    provider: "groq",
  },
  {
    id: "qwen/qwen3-32b",
    label: "Qwen3 32B",
    emoji: "💻",
    description: "Strong at code & logic",
    bestFor: "Programming, math, structured logic",
    provider: "groq",
  },
  {
    id: "meta-llama/llama-4-scout-17b-16e-instruct",
    label: "Llama 4 Scout",
    emoji: "👁️",
    description: "Vision + huge context",
    bestFor: "Long documents, multi-step context",
    provider: "groq",
  },
  {
    id: "groq/compound",
    label: "Compound (Web Search)",
    emoji: "🌐",
    description: "Live web search + code execution",
    bestFor: "Current events, live facts, running code",
    provider: "groq",
  },
  {
    id: "gemini-2.5-flash",
    label: "Gemini 2.5 Flash",
    emoji: "✨",
    description: "Google's fast multimodal model",
    bestFor: "Quick answers, general chat, free tier",
    provider: "gemini",
  },
  {
    id: "mistral-small-latest",
    label: "Mistral Small",
    emoji: "🌊",
    description: "Fast & light, strong multilingual",
    bestFor: "Everyday tasks, translations, free tier",
    provider: "mistral",
  },
];

export const DEFAULT_TEXT_MODEL = TEXT_MODELS[2].id; // Llama 3.3 70B — best all-purpose default

// ── Image models (served via Pollinations — free, keyless) ──
// Trimmed to the 4 best free, no-signup-required models.
export const IMAGE_MODELS: ImageModelOption[] = [
  {
    id: "flux",
    label: "Flux",
    emoji: "🎨",
    description: "Best overall quality — sharp detail & lighting",
  },
  {
    id: "turbo",
    label: "Turbo",
    emoji: "⚡",
    description: "Fastest generation, great for quick drafts",
  },
  {
    id: "kontext",
    label: "Kontext",
    emoji: "🖼️",
    description: "Best for edits & style-consistent variations",
  },
  {
    id: "gptimage",
    label: "GPT Image",
    emoji: "✨",
    description: "Best prompt-following & text-in-image accuracy",
  },
];

export const DEFAULT_IMAGE_MODEL = IMAGE_MODELS[0].id; // Flux — best default quality

export function isValidTextModel(id: string): boolean {
  return TEXT_MODELS.some((m) => m.id === id);
}

export function isValidImageModel(id: string): boolean {
  return IMAGE_MODELS.some((m) => m.id === id);
}
