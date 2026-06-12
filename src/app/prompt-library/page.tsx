// =============================================
// PROMPT LIBRARY PAGE — src/app/prompt-library/page.tsx
// =============================================
import type { Metadata } from "next";
import { PromptLibraryClient } from "./PromptLibraryClient";

export const metadata: Metadata = {
  title: "Prompt Library",
  description: "1,200+ free AI prompts for writing, coding, design, business, and more. Copy, customize, and deploy with one click.",
  keywords: ["AI prompts", "ChatGPT prompts", "prompt engineering", "free prompts", "AI writing"],
};

export default function PromptLibraryPage() {
  return <PromptLibraryClient />;
}
