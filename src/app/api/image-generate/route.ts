// ============================================================
// src/app/api/image-generate/route.ts
// Generates an image from a text prompt using Pollinations.ai —
// a free, keyless image generation service. No signup, no cost.
// ============================================================
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_PROMPT_LENGTH = 500;

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json(
        { error: "Please provide a description of the image you want." },
        { status: 400 }
      );
    }

    const cleanPrompt = prompt.trim().slice(0, MAX_PROMPT_LENGTH);

    // Pollinations serves images directly via a GET URL — the prompt
    // is the path itself. We add a random seed so repeated identical
    // prompts don't just return a cached identical image every time.
    const seed = Math.floor(Math.random() * 1_000_000);
    const encodedPrompt = encodeURIComponent(cleanPrompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${seed}&nologo=true`;

    // Verify the image actually generates before handing the URL back,
    // so the user doesn't get a broken <img> tag in chat.
    const checkRes = await fetch(imageUrl, { method: "GET" });

    if (!checkRes.ok) {
      return NextResponse.json(
        { error: "Image generation failed. Try a different description." },
        { status: 502 }
      );
    }

    return NextResponse.json({ imageUrl, prompt: cleanPrompt });
  } catch (err) {
    console.error("image-generate error:", err);
    return NextResponse.json(
      { error: "Unexpected server error during image generation." },
      { status: 500 }
    );
  }
}
