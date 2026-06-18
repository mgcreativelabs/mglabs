// ============================================================
// src/app/mg-ai/page.tsx
// MG Labs AI — Free chat powered by Groq (Llama 3.3 70B)
// ============================================================
import type { Metadata } from "next";
import { MGAIChat } from "./MGAIChat";

export const metadata: Metadata = {
  title: "MG Labs AI — Free AI Chat | MG Creative Labs",
  description:
    "Chat with MG Labs AI — powered by Llama 3.3 70B via Groq. Get help with prompt engineering, AI coding, design, and automation. 100% free, no account required.",
};

export default function MGAIPage() {
  return <MGAIChat />;
}
