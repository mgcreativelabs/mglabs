// ============================================================
// src/app/api/voice-speak/route.ts
// Receives assistant text, sends it to Groq's PlayAI TTS model,
// returns raw WAV audio bytes for the browser to play.
// ============================================================
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// Strip markdown syntax before speaking, so the voice doesn't
// read out "asterisk asterisk bold asterisk asterisk" etc.
function stripMarkdownForSpeech(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, " code block omitted. ") // fenced code
    .replace(/`([^`]+)`/g, "$1")                          // inline code
    .replace(/\*\*([^*]+)\*\*/g, "$1")                    // bold
    .replace(/\*([^*]+)\*/g, "$1")                        // italics
    .replace(/^#+\s*/gm, "")                              // headings
    .replace(/^[-*]\s+/gm, "")                            // bullet markers
    .replace(/\n{2,}/g, ". ")                             // paragraph breaks
    .trim();
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server is missing GROQ_API_KEY." },
        { status: 500 }
      );
    }

    const { text, voice } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "No text provided to speak." },
        { status: 400 }
      );
    }

    // PlayAI TTS caps input length — keep replies reasonable so we
    // don't silently fail on long assistant answers.
    const cleaned = stripMarkdownForSpeech(text).slice(0, 2000);

    const groqRes = await fetch("https://api.groq.com/openai/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "playai-tts",
        input: cleaned,
        voice: voice || "Fritz-PlayAI",
        response_format: "wav",
      }),
    });

    if (!groqRes.ok) {
      const errData = await groqRes.json().catch(() => ({}));
      return NextResponse.json(
        { error: errData.error?.message || "Speech generation failed." },
        { status: groqRes.status }
      );
    }

    const audioBuffer = await groqRes.arrayBuffer();

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/wav",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("voice-speak error:", err);
    return NextResponse.json(
      { error: "Unexpected server error during speech generation." },
      { status: 500 }
    );
  }
}
