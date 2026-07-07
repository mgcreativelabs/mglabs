// ============================================================
// src/lib/ai/routing.ts
// Smart model routing for "Auto" mode. Given the conversation,
// picks which registered TEXT_MODELS entry should answer —
// without the user ever choosing a model themselves.
//
// Deliberately heuristic (keyword/shape based) rather than an
// extra LLM call: it needs to be instant and free, and the
// signals for "this needs live web data" or "this is a code
// question" are strong enough that a classifier call would
// mostly add latency, not accuracy.
//
// Add a new routing target by adding a case below — it must
// reference a model id that exists in ai-models.ts.
// ============================================================
import { TEXT_MODELS, DEFAULT_TEXT_MODEL } from "@/lib/data/ai-models";

export type RouteReason =
  | "web-search"
  | "coding"
  | "reasoning"
  | "quick"
  | "default";

export interface RouteDecision {
  modelId: string;
  reason: RouteReason;
}

const WEB_SEARCH_PATTERNS = [
  /\b(today|tonight|this week|this month|right now|currently|as of)\b/i,
  /\b(latest|newest|recent|upcoming)\b/i,
  /\b(202[4-9]|2030)\b/, // any near-current year mentioned
  /\b(news|headline|score|weather|stock price|exchange rate|release date)\b/i,
  /\bwho (is|are) the current\b/i,
  /\bwhat('s| is) the (current|latest)\b/i,
  // Russian equivalents — \b is ASCII-only in JS, so these match on
  // whitespace/punctuation boundaries instead of word boundaries.
  /(^|[\s,.!?])(сегодня|сейчас|прямо сейчас|на данный момент|последние новости|последние|новост[иья]|курс валют|погода)([\s,.!?]|$)/iu,
];

const CODING_PATTERNS = [
  /```/,
  /\b(function|const|let|var|class|import|def|SELECT|useState|useEffect)\b/,
  /\b(bug|error|exception|stack trace|traceback|debug|regex|compile|syntax error)\b/i,
  /\b(python|javascript|typescript|react|next\.js|node\.js|java|c\+\+|sql|css|html)\b/i,
  /\bwrite (a|some) (code|function|script|component)\b/i,
  /(^|[\s,.!?])(код|напиши код|функци[юяи]|ошибк[аиу]|баг|отладк[аиу])([\s,.!?]|$)/iu,
];

const REASONING_PATTERNS = [
  /\b(compare|pros and cons|trade-?offs?|strategy|architecture|plan out|analyze|evaluate)\b/i,
  /\bwhy (does|is|do|would|should)\b/i,
  /\bwhat('s| is) the difference between\b/i,
  /(^|[\s,.!?])(сравни|стратеги[юяи]|проанализируй|в чём разница|почему)([\s,.!?]|$)/iu,
];

/** Model chosen for each routing reason. Falls back to the default
 * model if the preferred id isn't in the current catalog (e.g. it
 * was removed from ai-models.ts), so routing never throws. */
function pickForReason(reason: RouteReason): string {
  const preferred: Record<RouteReason, string> = {
    "web-search": "groq/compound",
    coding: "openai/gpt-oss-120b",
    reasoning: "openai/gpt-oss-120b",
    quick: "openai/gpt-oss-20b",
    default: DEFAULT_TEXT_MODEL,
  };

  const wanted = preferred[reason];
  return TEXT_MODELS.some((m) => m.id === wanted) ? wanted : DEFAULT_TEXT_MODEL;
}

/** Picks a model for the latest user turn. `messages` is the full
 * conversation so far (same shape sent to /api/chat); only the most
 * recent user message drives the decision — earlier turns are noise
 * for routing purposes even though they matter for the reply itself. */
export function routeAuto(
  messages: { role: string; content: string }[]
): RouteDecision {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const text = lastUser?.content ?? "";

  // Order matters: a message can match several categories (e.g. "debug
  // this using the latest numpy release notes") — web search wins
  // because stale training data is the harder failure mode of the two.
  if (WEB_SEARCH_PATTERNS.some((re) => re.test(text))) {
    return { modelId: pickForReason("web-search"), reason: "web-search" };
  }
  if (CODING_PATTERNS.some((re) => re.test(text))) {
    return { modelId: pickForReason("coding"), reason: "coding" };
  }
  if (REASONING_PATTERNS.some((re) => re.test(text))) {
    return { modelId: pickForReason("reasoning"), reason: "reasoning" };
  }
  if (text.trim().length > 0 && text.trim().length < 60) {
    return { modelId: pickForReason("quick"), reason: "quick" };
  }
  return { modelId: pickForReason("default"), reason: "default" };
}
