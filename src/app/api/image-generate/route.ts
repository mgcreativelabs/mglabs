// ============================================================
// src/app/api/image-generate/route.ts
// Generates an image from a text prompt using Pollinations.ai —
// a free, keyless image generation service. No signup, no cost.
// Supports multiple free models (see src/lib/data/ai-models.ts);
// the user picks one in the MG Labs AI chat UI.
// ============================================================
import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_IMAGE_MODEL, isValidImageModel } from "@/lib/data/ai-models";

export const runtime = "nodejs";

const MAX_PROMPT_LENGTH = 500;

export async function POST(req: NextRequest) {
  try {
    const { prompt, model } = await req.json();

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json(
        { error: "Please provide a description of the image you want." },
        { status: 400 }
      );
    }

    // Only allow models we actually advertise in the UI.
    const selectedModel =
      typeof model === "string" && isValidImageModel(model) ? model : DEFAULT_IMAGE_MODEL;

    const cleanPrompt = prompt.trim().slice(0, MAX_PROMPT_LENGTH);

    // Pollinations serves images directly via a GET URL — the prompt
    // is the path itself. We add a random seed so repeated identical
    // prompts don't just return a cached identical image every time.
    const seed = Math.floor(Math.random() * 1_000_000);
    const encodedPrompt = encodeURIComponent(cleanPrompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${seed}&model=${selectedModel}&nologo=true`;

    // Verify the image actually generates before handing the URL back,
    // so the user doesn't get a broken <img> tag in chat.
    const checkRes = await fetch(imageUrl, { method: "GET" });

    if (!checkRes.ok) {
      return NextResponse.json(
        { error: "Image generation failed. Try a different description or model." },
        { status: 502 }
      );
    }

    return NextResponse.json({ imageUrl, prompt: cleanPrompt, model: selectedModel });
  } catch (err) {
    console.error("image-generate error:", err);
    return NextResponse.json(
      { error: "Unexpected server error during image generation." },
      { status: 500 }
    );
  }
}
