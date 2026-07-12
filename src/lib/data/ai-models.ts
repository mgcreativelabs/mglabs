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
  /** Can this model accept image_url content parts? Used by
   *  /api/chat to auto-reroute image messages to a capable model
   *  instead of silently failing on a text-only one. */
  supportsVision?: boolean;
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
    id: "qwen/qwen3.6-27b",
    label: "Qwen3.6 27B",
    emoji: "🦙",
    description: "Well-rounded, multilingual & vision",
    bestFor: "General chat, writing, everyday tasks",
    provider: "groq",
    supportsVision: true,
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
    supportsVision: true,
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

export const DEFAULT_TEXT_MODEL = TEXT_MODELS[2].id; // Qwen3.6 27B — best all-purpose default

// ── Auto (smart routing) ─────────────────────────────────────
// Not a real model — a sentinel the UI offers alongside TEXT_MODELS.
// When selected, /api/chat routes the message to whichever real model
// (see src/lib/ai/routing.ts) best fits it, including groq/compound
// for anything that needs live web search. Kept out of TEXT_MODELS so
// isValidTextModel() and the provider dispatch table never see it —
// the API route resolves it to a real id before either runs.
export const AUTO_MODEL_ID = "auto";

export const AUTO_MODEL_OPTION = {
  id: AUTO_MODEL_ID,
  label: "Auto",
  emoji: "🪄",
  description: "Smart routing — picks the best model per message",
  bestFor: "Let MG Labs AI choose (incl. live web search when needed)",
} as const;

export function isAutoModel(id: string): boolean {
  return id === AUTO_MODEL_ID;
}

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
