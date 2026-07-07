// ============================================================
// src/app/api/chat/route.ts
// Validates the request, then hands off to the AI router, which
// dispatches to whichever provider owns the requested model
// (Groq, Gemini, Mistral, ...). Keys stay server-side in each
// provider adapter — this route never touches them directly.
// ============================================================
import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_TEXT_MODEL, isValidTextModel, isAutoModel } from "@/lib/data/ai-models";
import { routeChat } from "@/lib/ai/router";
import { routeAuto } from "@/lib/ai/routing";
import { AIProviderError } from "@/lib/ai/types";

// nodejs runtime — some provider REST APIs (Gemini, Mistral) are not
// guaranteed to work on the edge runtime the same way Groq's did.
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
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

  const conversation = body.messages as {
    role: "system" | "user" | "assistant";
    content: string;
  }[];

  // "auto" isn't a real model — resolve it to one via the heuristic
  // router before validating/dispatching. Anything else falls back
  // to the default the same way it always has.
  let model: string;
  let routedReason: string | undefined;
  if (body.model && isAutoModel(body.model)) {
    const decision = routeAuto(conversation);
    model = decision.modelId;
    routedReason = decision.reason;
  } else {
    model = body.model && isValidTextModel(body.model) ? body.model : DEFAULT_TEXT_MODEL;
  }

  try {
    const result = await routeChat(model, conversation);

    // Preserve the old response shape (data.choices[0].message.content)
    // so existing UI code needs zero changes, while adding the new
    // fields Auto mode and web search need — both optional, so callers
    // that don't know about them are unaffected.
    return NextResponse.json({
      choices: [{ message: { role: "assistant", content: result.content } }],
      modelUsed: model,
      routedReason,
      citations: result.citations,
    });
  } catch (err) {
    if (err instanceof AIProviderError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json(
      { error: `Network error: ${(err as Error).message}` },
      { status: 500 }
    );
  }
}
