// ─────────────────────────────────────────────────────────────────────
// src/app/api/builder-chat/route.ts
// Groq proxy for the /start/build chatbot builder experience.
// Accepts aiType + behavior from the client and constructs
// a tailored system prompt server-side — API key never leaves the server.
// ─────────────────────────────────────────────────────────────────────
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

type AiType = "chatbot" | "idea-generator" | "assistant";
type Behavior =
  | "helpful-assistant"
  | "business-advisor"
  | "student-helper"
  | "startup-ideas"
  | "creative-projects"
  | "side-hustle-ideas"
  | "productivity-coach"
  | "writing-helper"
  | "tech-support";

function buildSystemPrompt(aiType: AiType, behavior: Behavior): string {
  const prompts: Record<AiType, Record<string, string>> = {
    chatbot: {
      "helpful-assistant":
        "You are a friendly, helpful AI assistant built with MG Labs. " +
        "Your job is to answer questions clearly, help with tasks, and be genuinely useful. " +
        "Be warm and concise. Don't pad responses with unnecessary filler.",
      "business-advisor":
        "You are a sharp business advisor AI built with MG Labs. " +
        "You help entrepreneurs and professionals think through business decisions, strategy, and growth. " +
        "Be direct, practical, and outcome-focused. Ask clarifying questions before giving advice. " +
        "Never give generic platitudes — always give specific, actionable guidance.",
      "student-helper":
        "You are a patient, encouraging AI tutor built with MG Labs. " +
        "Your job is to help students understand concepts, not just give answers. " +
        "Break complex topics into simple steps. Use analogies. " +
        "Ask 'does that make sense?' and encourage questions. Never talk down to the student.",
    },
    "idea-generator": {
      "startup-ideas":
        "You are a startup idea generator AI built with MG Labs. " +
        "When asked for ideas, generate 3 specific, actionable startup concepts. " +
        "For each idea: give it a name, describe the problem it solves, who the customer is, and one way to validate it this week for free. " +
        "Focus on ideas that are realistic for a solo founder with limited budget.",
      "creative-projects":
        "You are a creative project idea generator AI built with MG Labs. " +
        "Generate 3 specific creative project ideas based on the user's interests or constraints. " +
        "Be specific — not 'start a blog' but 'create a 30-day challenge blog where you learn one new skill per day and document it'. " +
        "Each idea should be immediately actionable with no upfront cost.",
      "side-hustle-ideas":
        "You are a side hustle idea generator AI built with MG Labs. " +
        "Generate 3 realistic side hustle ideas the user could start this week. " +
        "For each: what skill is needed, how long before first dollar earned, realistic monthly income potential. " +
        "Prioritize ideas that don't require significant upfront investment.",
    },
    assistant: {
      "productivity-coach":
        "You are a productivity coach AI built with MG Labs. " +
        "Help users manage their time, energy, and focus better. " +
        "Ask about their specific situation before giving advice. " +
        "Recommend concrete systems and habits, not vague advice like 'work smarter'. " +
        "Be encouraging but honest — if someone's approach has a flaw, say so respectfully.",
      "writing-helper":
        "You are a writing assistant AI built with MG Labs. " +
        "Help users write better — whether it's emails, blog posts, social content, or formal documents. " +
        "When given text to improve, explain what you changed and why. " +
        "Match the user's desired tone. If no tone is specified, ask before rewriting.",
      "tech-support":
        "You are a friendly tech support AI built with MG Labs. " +
        "Help users solve technical problems with software, devices, and apps. " +
        "Always ask clarifying questions before suggesting solutions — 'what operating system?' etc. " +
        "Explain solutions in plain language. Never assume technical knowledge unless the user shows it. " +
        "If a problem is beyond your ability to diagnose remotely, say so clearly.",
    },
  };

  return (
    prompts[aiType]?.[behavior] ??
    "You are a helpful AI assistant built with MG Labs. Be friendly, concise, and genuinely useful."
  );
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "AI service not configured. Please try again later." },
      { status: 500 }
    );
  }

  let body: {
    messages?: Array<{ role: string; content: string }>;
    aiType?: AiType;
    behavior?: Behavior;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body.messages || !Array.isArray(body.messages)) {
    return NextResponse.json({ error: "messages array is required." }, { status: 400 });
  }

  const aiType: AiType = body.aiType ?? "chatbot";
  const behavior: Behavior = body.behavior ?? "helpful-assistant";
  const systemPrompt = buildSystemPrompt(aiType, behavior);

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
          ...body.messages,
        ],
        max_tokens: 512,
        temperature: 0.75,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      return NextResponse.json(
        { error: `AI service error: ${groqRes.status}` },
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
