// ============================================================
// src/app/api/chat/route.ts
// Validates the request, then hands off to the AI router, which
// dispatches to whichever provider owns the requested model
// (Groq, Gemini, Mistral, ...). Keys stay server-side in each
// provider adapter — this route never touches them directly.
//
// Streams the reply back as SSE ("data: {...}\n\n") so the UI can
// render tokens as they arrive instead of waiting for the full
// response. Each event is `{ delta: string }` for a text chunk, or
// `{ done: true }` as the terminal event. On failure before any
// content has streamed, falls back to a plain JSON error response
// so existing error handling in the UI keeps working unchanged.
// ============================================================
import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_TEXT_MODEL, isValidTextModel, TEXT_MODELS } from "@/lib/data/ai-models";
import { routeChatStream } from "@/lib/ai/router";
import { AIProviderError, type ChatMessage } from "@/lib/ai/types";

// nodejs runtime — some provider REST APIs (Gemini, Mistral) are not
// guaranteed to work on the edge runtime the same way Groq's did.
export const runtime = "nodejs";

// Requests carrying at least one image_url part need routing to a
// vision-capable model — silently sending them to a text-only model
// would just have the provider ignore the image or error out.
function messagesContainImage(messages: ChatMessage[]): boolean {
  return messages.some(
    (m) => Array.isArray(m.content) && m.content.some((p) => p.type === "image_url")
  );
}

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

  // Only allow models we actually advertise in the UI — prevents callers
  // from passing an arbitrary/unsupported model id through this route.
  let model = body.model && isValidTextModel(body.model) ? body.model : DEFAULT_TEXT_MODEL;
  const messages = body.messages as ChatMessage[];

  // If the request includes an image but the chosen model can't see
  // images, transparently reroute to a vision-capable model rather
  // than failing — the client surfaces which model actually answered
  // via the same response, so this stays visible, not silent magic.
  if (messagesContainImage(messages)) {
    const current = TEXT_MODELS.find((m) => m.id === model);
    if (!current?.supportsVision) {
      const visionModel = TEXT_MODELS.find((m) => m.supportsVision);
      if (visionModel) model = visionModel.id;
    }
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (payload: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
      };

      try {
        send({ model }); // tells the client which model actually answered (post-vision-reroute)
        for await (const chunk of routeChatStream(model, messages)) {
          if ("delta" in chunk) send({ delta: chunk.delta });
          if ("citations" in chunk) send({ citations: chunk.citations });
        }
        send({ done: true });
      } catch (err) {
        // Once headers are sent, we can't fall back to a JSON error
        // response — instead emit an error event the client's SSE
        // reader watches for, matching the shape AIProviderError
        // would have produced as a normal HTTP error.
        const message =
          err instanceof AIProviderError ? err.message : `Network error: ${(err as Error).message}`;
        send({ error: message });
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
