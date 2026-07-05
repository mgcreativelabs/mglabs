// ============================================================
// src/app/api/voice-transcribe/route.ts
// Receives recorded audio (webm/mp3/wav) from the browser,
// sends it to Groq's Whisper model, returns the transcribed text.
// ============================================================
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server is missing GROQ_API_KEY." },
        { status: 500 }
      );
    }

    // The browser sends the recorded audio as multipart/form-data
    const incomingForm = await req.formData();
    const audioFile = incomingForm.get("audio");

    if (!audioFile || !(audioFile instanceof Blob)) {
      return NextResponse.json(
        { error: "No audio file received." },
        { status: 400 }
      );
    }

    // Groq expects a multipart form with the same shape as OpenAI's
    // Whisper endpoint: a "file" field + "model" field.
    const groqForm = new FormData();
    groqForm.append("file", audioFile, "recording.webm");
    groqForm.append("model", "whisper-large-v3-turbo"); // fast + free tier
    groqForm.append("response_format", "json");

    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        body: groqForm,
      }
    );

    const data = await groqRes.json();

    if (!groqRes.ok) {
      return NextResponse.json(
        { error: data.error?.message || "Transcription failed." },
        { status: groqRes.status }
      );
    }

    return NextResponse.json({ text: data.text ?? "" });
  } catch (err) {
    console.error("voice-transcribe error:", err);
    return NextResponse.json(
      { error: "Unexpected server error during transcription." },
      { status: 500 }
    );
  }
}
