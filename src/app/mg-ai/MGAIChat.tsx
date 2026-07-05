"use client";
// ============================================================
// src/app/mg-ai/MGAIChat.tsx  (Client Component)
// Full chat UI — history, streaming feel, markdown render
// ============================================================
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Bot, Send, Trash2, Copy, Check, Sparkles,
  ArrowRight, Zap, RotateCcw,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────
interface Message {
  role: "user" | "assistant";
  content: string;
  id: string;
}

// ── Starter prompts ──────────────────────────────────────────
const STARTERS = [
  { label: "Explain prompt engineering", prompt: "Explain prompt engineering in simple terms and give me 3 actionable tips to write better prompts." },
  { label: "Build a chatbot", prompt: "How do I build a simple AI chatbot using the OpenAI API and Next.js? Give me a step-by-step guide." },
  { label: "Best AI tools 2025", prompt: "What are the best AI tools I should be using in 2025 for productivity and creativity?" },
  { label: "Write me a prompt", prompt: "Write me a detailed system prompt for an AI assistant that helps freelancers find clients on LinkedIn." },
  { label: "n8n automation ideas", prompt: "Give me 5 practical n8n automation workflows that would save a freelancer time every week." },
  { label: "Midjourney tips", prompt: "Share 5 advanced Midjourney prompt techniques for better, more consistent results." },
];

// ── Tiny inline markdown renderer ────────────────────────────
function renderMarkdown(text: string) {
  const lines = text.split("\n");
  const result: React.ReactNode[] = [];
  let inCode = false;
  let codeLines: string[] = [];
  let key = 0;

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCode) {
        result.push(
          <pre key={key++} className="bg-black/40 rounded-lg p-3 my-2 overflow-x-auto text-xs font-mono text-green-300 border border-white/10">
            <code>{codeLines.join("\n")}</code>
          </pre>
        );
        codeLines = [];
        inCode = false;
      } else {
        inCode = true;
      }
      continue;
    }
    if (inCode) { codeLines.push(line); continue; }

    if (line.startsWith("### ")) {
      result.push(<h3 key={key++} className="text-sm font-semibold text-white mt-3 mb-1">{line.slice(4)}</h3>);
    } else if (line.startsWith("## ")) {
      result.push(<h2 key={key++} className="text-base font-bold text-white mt-4 mb-2">{line.slice(3)}</h2>);
    } else if (line.startsWith("# ")) {
      result.push(<h1 key={key++} className="text-lg font-bold text-white mt-4 mb-2">{line.slice(2)}</h1>);
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      result.push(<li key={key++} className="ml-4 text-gray-300 list-disc text-sm mb-0.5">{renderInline(line.slice(2))}</li>);
    } else if (line.match(/^\d+\.\s/)) {
      result.push(<li key={key++} className="ml-4 text-gray-300 list-decimal text-sm mb-0.5">{renderInline(line.replace(/^\d+\.\s/, ""))}</li>);
    } else if (line.startsWith("---") || line.startsWith("***")) {
      result.push(<hr key={key++} className="border-white/10 my-3" />);
    } else if (line.trim() === "") {
      result.push(<div key={key++} className="h-1.5" />);
    } else {
      result.push(<p key={key++} className="text-gray-300 text-sm leading-relaxed">{renderInline(line)}</p>);
    }
  }
  return result;
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i} className="bg-black/40 text-green-300 px-1 py-0.5 rounded text-xs font-mono">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

// ── Main Component ────────────────────────────────────────────
export function MGAIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState("llama-3.3-70b-versatile");
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const uid = () => Math.random().toString(36).slice(2);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    setError(null);

    const userMsg: Message = { role: "user", content: text.trim(), id: uid() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // Reset textarea height
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
  model: selectedModel,
  messages: newMessages.map(({ role, content }) => ({
    role,
    content,
  })),
}),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      const assistantContent: string =
        data.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantContent, id: uid() },
      ]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 200) + "px";
  };

  const copyMessage = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/[0.06] bg-surface/50 backdrop-blur-xl sticky top-16 z-30">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center shadow-lg">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm leading-none">MG Labs AI</div>
            <div className="text-gray-500 text-xs mt-0.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 inline-block" />
              Powered by Llama 3.3 70B · Free
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">

  <select
    value={selectedModel}
    onChange={(e) => setSelectedModel(e.target.value)}
    className="bg-surface-2 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
  >
    <option value="llama-3.3-70b-versatile">
      🦙 Llama 3.3
    </option>

    <option value="deepseek-r1-distill-llama-70b">
      🧠 DeepSeek
    </option>

    <option value="qwen/qwen3-32b">
      💻 Qwen
    </option>
  </select>
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-surface-2 transition-colors border border-white/[0.06]"
            >
              <Trash2 className="h-3 w-3" /> Clear
            </button>
          )}
          <Link href="/signup" className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-brand-blue hover:text-white hover:bg-surface-2 transition-colors border border-brand-blue/20">
            <Zap className="h-3 w-3" /> Get full access
          </Link>
        </div>
      </div>

      {/* ── Main chat area ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">

          {/* Empty state */}
          {isEmpty && (
            <div className="text-center py-16">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 border border-white/10 flex items-center justify-center mx-auto mb-6">
                <Bot className="h-8 w-8 text-brand-purple" />
              </div>
              <h1 className="text-3xl font-display font-bold text-white mb-2">
                MG Labs AI
              </h1>
              <p className="text-gray-400 mb-2">
                Your free AI assistant for all things AI, coding, design, and automation.
              </p>
              <p className="text-gray-600 text-sm mb-12">
                Powered by Llama 3.3 70B via Groq · No account needed
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-left">
                {STARTERS.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => sendMessage(s.prompt)}
                    className="group p-4 rounded-xl bg-surface-1 border border-white/[0.06] hover:border-brand-blue/40 hover:bg-surface-2 transition-all text-left"
                  >
                    <div className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-brand-purple flex-shrink-0 mt-0.5" />
                      <span className="text-gray-400 text-sm group-hover:text-white transition-colors leading-relaxed">
                        {s.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-6 ${msg.role === "user" ? "flex justify-end" : "flex justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center flex-shrink-0 mr-3 mt-1 shadow-lg">
                  <Bot className="h-3.5 w-3.5 text-white" />
                </div>
              )}

              <div
                className={`max-w-[85%] relative group ${
                  msg.role === "user"
                    ? "bg-brand-blue text-white px-4 py-3 rounded-2xl rounded-tr-sm"
                    : "bg-surface-1 border border-white/[0.06] px-5 py-4 rounded-2xl rounded-tl-sm"
                }`}
              >
                {msg.role === "user" ? (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                ) : (
                  <div className="text-sm leading-relaxed space-y-0.5">
                    {renderMarkdown(msg.content)}
                  </div>
                )}

                {/* Copy button */}
                {msg.role === "assistant" && (
                  <button
                    onClick={() => copyMessage(msg.content, msg.id)}
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-surface-3 text-gray-600 hover:text-gray-300"
                  >
                    {copiedId === msg.id ? (
                      <Check className="h-3.5 w-3.5 text-green-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                )}
              </div>

              {msg.role === "user" && (
                <div className="h-7 w-7 rounded-lg bg-surface-2 border border-white/10 flex items-center justify-center flex-shrink-0 ml-3 mt-1 text-xs font-semibold text-gray-400">
                  U
                </div>
              )}
            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-start mb-6">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center flex-shrink-0 mr-3 mt-1">
                <Bot className="h-3.5 w-3.5 text-white" />
              </div>
              <div className="bg-surface-1 border border-white/[0.06] px-5 py-4 rounded-2xl rounded-tl-sm">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-brand-blue animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 rounded-full bg-brand-purple animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 rounded-full bg-brand-blue animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
              <div className="flex-1">
                <strong className="text-red-300">Error:</strong> {error}
              </div>
              <button onClick={() => setError(null)} className="text-red-500 hover:text-red-300 flex-shrink-0">
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* ── Input area ── */}
      <div className="sticky bottom-0 bg-surface/80 backdrop-blur-xl border-t border-white/[0.06] px-4 sm:px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-3 bg-surface-1 border border-white/[0.06] rounded-2xl px-4 py-3 focus-within:border-brand-blue/50 transition-colors">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about AI, coding, design, or automation…"
              rows={1}
              className="flex-1 bg-transparent text-white text-sm placeholder-gray-600 resize-none outline-none leading-relaxed min-h-[24px] max-h-[200px]"
              disabled={loading}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className="h-8 w-8 rounded-lg bg-brand-blue hover:bg-brand-blue/80 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0 transition-all hover:scale-105 active:scale-95"
              aria-label="Send message"
            >
              <Send className="h-3.5 w-3.5 text-white" />
            </button>
          </div>
          <div className="flex items-center justify-between mt-2 px-1">
            <p className="text-xs text-gray-700">
              Press <kbd className="text-gray-600 bg-surface-2 px-1 py-0.5 rounded text-[10px] border border-white/10">Enter</kbd> to send · <kbd className="text-gray-600 bg-surface-2 px-1 py-0.5 rounded text-[10px] border border-white/10">Shift+Enter</kbd> for new line
            </p>
            <Link href="/signup" className="text-xs text-brand-purple hover:text-white transition-colors flex items-center gap-1">
              Unlock full platform <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
