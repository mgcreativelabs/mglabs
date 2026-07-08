// ============================================================
// src/app/api/chat/route.ts
// Validates the request, then hands off to the AI router, which
// dispatches to whichever provider owns the requested model
// (Groq, Gemini, Mistral, ...). Keys stay server-side in each
// provider adapter — this route never touches them directly.
// ============================================================
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_TEXT_MODEL, isValidTextModel, isAutoModel } from "@/lib/data/ai-models";
import { routeChat, routeChatStream } from "@/lib/ai/router";
import { routeAuto } from "@/lib/ai/routing";
import { AIProviderError } from "@/lib/ai/types";

// nodejs runtime — some provider REST APIs (Gemini, Mistral) are not
// guaranteed to work on the edge runtime the same way Groq's did.
export const runtime = "nodejs";

// Compound models' citations only show up on the final, non-streamed
// response (see groq.ts) — stream everything else, keep this path on
// the original buffered JSON shape.
function isCompoundModel(modelId: string): boolean {
  return modelId.startsWith("groq/compound");
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // 🛡️ Zod Validation: Prevents AI API abuse and massive token costs
  const ChatRequestSchema = z.object({
    messages: z.array(
      z.object({
        role: z.enum(["system", "user", "assistant"]),
        content: z.string().max(4000, "Message content is too long."), // Max 4k chars per message
      })
    ).max(50, "Conversation history is too long."), // Max 50 messages in history
    model: z.string().optional(),
  });

  const validationResult = ChatRequestSchema.safeParse(body);

  if (!validationResult.success) {
    return NextResponse.json(
   { error: "Invalid request payload", details: validationResult.error.issues },      { status: 400 }
    );
  }

  // Now we know the data is safe and correctly typed
  const { messages, model: requestedModel } = validationResult.data;
  const conversation = messages;

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

  if (isCompoundModel(model)) {
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

  // ── Streaming path (everything else) ──────────────────────────
  // Custom SSE protocol, not the OpenAI wire format — the client owns
  // both ends, so there's no compatibility reason to mimic it:
  //   data: {"delta": "..."}                         zero or more
  //   data: {"error": "..."}                          on failure, then closes
  //   data: {"done": true, "modelUsed", "routedReason"} always last on success
  const encoder = new TextEncoder();
  const abortController = new AbortController();
  req.signal.addEventListener("abort", () => abortController.abort());

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (obj: unknown) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
      };

      try {
        for await (const delta of routeChatStream(model, conversation, {
          signal: abortController.signal,
        })) {
          send({ delta });
        }
        send({ done: true, modelUsed: model, routedReason });
      } catch (err) {
        // AbortError just means the client hit "stop" or navigated away —
        // not a real failure, so nothing to report back.
        if (err instanceof Error && err.name === "AbortError") {
          // no-op
        } else if (err instanceof AIProviderError) {
          send({ error: err.message });
        } else {
          send({ error: `Network error: ${(err as Error).message}` });
        }
      } finally {
        controller.close();
      }
    },
    cancel() {
      abortController.abort();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
