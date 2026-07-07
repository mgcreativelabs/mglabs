// ─────────────────────────────────────────────────────────────────────
// src/app/api/tools-chat/route.ts
// Groq proxy for the free AI tools (Prompt Optimizer, Project Ideas).
// Tool type is sent from the client; system prompt is built server-side.
// ─────────────────────────────────────────────────────────────────────
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

type ToolType = "prompt-optimizer" | "project-ideas";

function getSystemPrompt(tool: ToolType): string {
  if (tool === "prompt-optimizer") {
    return `You are an expert prompt engineer. When given a prompt, you improve it.

Return your response as valid JSON with exactly this structure:
{
  "original": "the original prompt as-is",
  "optimized": "the improved prompt",
  "improvements": [
    "First specific thing that was improved and why",
    "Second specific thing that was improved and why",
    "Third specific thing that was improved and why"
  ],
  "score_before": 3,
  "score_after": 9
}

Rules for optimization:
- Make the role/context explicit if missing
- Add format instructions if the output format matters
- Add constraints and rules to prevent bad outputs
- Be specific where the original is vague
- Scores are out of 10 based on clarity, specificity, and completeness
- Improvements must be concrete and educational — explain WHY each change makes it better
- Return ONLY valid JSON. No markdown fences. No extra text before or after.`;
  }

  if (tool === "project-ideas") {
    return `You are an AI project advisor helping beginners build their first AI product.

Return your response as valid JSON with exactly this structure:
{
  "ideas": [
    {
      "title": "Project name",
      "description": "One sentence: what it does and for whom",
      "difficulty": "Beginner" or "Intermediate",
      "build_time": "e.g. 1 weekend",
      "income_potential": "e.g. $0 (portfolio) or $200-500/month",
      "first_step": "The very first thing to do to start building this"
    }
  ]
}

Rules:
- Generate exactly 5 ideas
- Ideas must be genuinely buildable by a beginner using free AI APIs (Groq, Gemini)
- Be specific — not "build a chatbot" but "build an AI chatbot for hotel reception to answer FAQs"
- first_step must be concrete and actionable today
- Return ONLY valid JSON. No markdown fences. No extra text.`;
  }

  return "You are a helpful AI assistant.";
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "AI service not available. Please try again later." },
      { status: 500 }
    );
  }

  let body: { tool?: ToolType; userMessage?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.tool || !body.userMessage) {
    return NextResponse.json(
      { error: "tool and userMessage are required." },
      { status: 400 }
    );
  }

  const systemPrompt = getSystemPrompt(body.tool);

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "qwen/qwen3.6-27b",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: body.userMessage },
        ],
        max_tokens: 1024,
        temperature: 0.6,
      }),
    });

    if (!groqRes.ok) {
      return NextResponse.json(
        { error: `AI service error: ${groqRes.status}` },
        { status: groqRes.status }
      );
    }

    const data = await groqRes.json();
    const raw = data.choices?.[0]?.message?.content ?? "{}";

    // Strip markdown fences if model adds them despite instructions
    const clean = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    try {
      const parsed = JSON.parse(clean);
      return NextResponse.json({ result: parsed });
    } catch {
      // If JSON parse fails, return raw so client can handle it
      return NextResponse.json({ result: null, raw });
    }
  } catch (err) {
    return NextResponse.json(
      { error: `Network error: ${(err as Error).message}` },
      { status: 500 }
    );
  }
}
