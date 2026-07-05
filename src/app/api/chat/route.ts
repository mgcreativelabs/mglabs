// ============================================================
// src/app/api/chat/route.ts
// Groq API proxy — keeps the API key server-side only
// ============================================================
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Groq API key not configured. Add GROQ_API_KEY to your .env.local file." },
      { status: 500 }
    );
  }

let body: {
  messages?: unknown[];
  model?: string;
};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.messages || !Array.isArray(body.messages)) {
    return NextResponse.json({ error: "messages array is required." }, { status: 400 });
  }

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
model: body.model || "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are MG Labs AI, a helpful AI assistant for MG Creative Labs — an AI education platform. " +
              "You specialize in AI tools, prompt engineering, coding with AI, AI design, and automation. " +
              "Be concise, practical, and friendly. Format responses with markdown when helpful.",
          },
          ...body.messages,
        ],
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      return NextResponse.json(
        { error: `Groq API error: ${groqRes.status} — ${errText}` },
        { status: groqRes.status }
      );
    }

    const data = await groqRes.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: `Network error: ${(err as Error).message}` },
      { status: 500 }
    );
  }
}
