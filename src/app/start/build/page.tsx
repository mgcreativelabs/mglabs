"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight, Bot, Lightbulb, Zap, MessageSquare,
  CheckCircle2, Loader2, Send, User
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────
type AiType = "chatbot" | "idea-generator" | "assistant";
type Behavior =
  | "helpful-assistant" | "business-advisor" | "student-helper"
  | "startup-ideas"     | "creative-projects" | "side-hustle-ideas"
  | "productivity-coach"| "writing-helper"    | "tech-support";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// ─────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────
const aiTypes: { id: AiType; label: string; icon: React.ReactNode; desc: string }[] = [
  {
    id: "chatbot",
    label: "AI Chatbot",
    icon: <MessageSquare className="w-6 h-6" />,
    desc: "A conversational AI that answers questions and helps users.",
  },
  {
    id: "idea-generator",
    label: "Idea Generator",
    icon: <Lightbulb className="w-6 h-6" />,
    desc: "An AI that generates creative ideas based on your inputs.",
  },
  {
    id: "assistant",
    label: "AI Assistant",
    icon: <Bot className="w-6 h-6" />,
    desc: "A specialized assistant built for a specific task or workflow.",
  },
];

const behaviorOptions: Record<AiType, { id: Behavior; label: string; desc: string }[]> = {
  chatbot: [
    { id: "helpful-assistant", label: "Helpful Assistant", desc: "Answers questions, helps with tasks." },
    { id: "business-advisor",  label: "Business Advisor",  desc: "Strategy, decisions, and growth advice." },
    { id: "student-helper",    label: "Student Helper",    desc: "Patient tutor that explains concepts clearly." },
  ],
  "idea-generator": [
    { id: "startup-ideas",     label: "Startup Ideas",     desc: "Generates business concepts with validation steps." },
    { id: "creative-projects", label: "Creative Projects", desc: "Side projects, art, content, and creative work." },
    { id: "side-hustle-ideas", label: "Side Hustle Ideas", desc: "Income ideas you can start this week." },
  ],
  assistant: [
    { id: "productivity-coach", label: "Productivity Coach", desc: "Time management, focus, and habits." },
    { id: "writing-helper",     label: "Writing Helper",     desc: "Improves emails, posts, and documents." },
    { id: "tech-support",       label: "Tech Support Bot",   desc: "Solves software and device problems." },
  ],
};

const suggestedMessages: Record<Behavior, string[]> = {
  "helpful-assistant":   ["What can you help me with?", "Give me an overview of prompt engineering."],
  "business-advisor":    ["I'm thinking of starting a freelance design business. What should I focus on first?", "How do I price my services?"],
  "student-helper":      ["Explain machine learning to me like I'm 16.", "What's the difference between AI and automation?"],
  "startup-ideas":       ["I have a background in fitness. What AI startup could I build?", "Give me 3 ideas for a solo founder with no investment."],
  "creative-projects":   ["I want to start a creative project but have no idea where to begin.", "I'm interested in writing and technology — what could I make?"],
  "side-hustle-ideas":   ["I can write and know basic AI tools. What side hustle fits me?", "I want to make $500/month on the side. Give me ideas."],
  "productivity-coach":  ["I keep procrastinating on important projects. Help me fix this.", "What's the best way to structure a workday?"],
  "writing-helper":      ["Here's an email I need to improve: 'Hey, just checking in on that thing.'", "Help me write a LinkedIn post about starting my AI journey."],
  "tech-support":        ["My MacBook is running really slow. What should I check first?", "How do I fix a 'Failed to fetch' error in JavaScript?"],
};

// ─────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────
export default function BuildPage() {
  const router = useRouter();

  const [step, setStep]             = useState<1 | 2 | 3 | 4>(1);
  const [selectedType, setSelectedType]     = useState<AiType | null>(null);
  const [selectedBehavior, setSelectedBehavior] = useState<Behavior | null>(null);
  const [messages, setMessages]     = useState<ChatMessage[]>([]);
  const [input, setInput]           = useState("");
  const [loading, setLoading]       = useState(false);
  const [msgCount, setMsgCount]     = useState(0);
  const bottomRef                   = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // ── Step 1 selection ──────────────────────────────────────
  function handleTypeSelect(type: AiType) {
    setSelectedType(type);
    setSelectedBehavior(null);
    setStep(2);
  }

  // ── Step 2 selection ──────────────────────────────────────
  function handleBehaviorSelect(behavior: Behavior) {
    setSelectedBehavior(behavior);
    const aiType = selectedType!;

    // Add a welcome message from the AI
    const welcomeMessages: Record<Behavior, string> = {
      "helpful-assistant":   "Hi! I'm your helpful AI assistant. What can I help you with today?",
      "business-advisor":    "Ready to talk business. What challenge are you working through?",
      "student-helper":      "Hey! I'm here to help you learn. What would you like to understand better?",
      "startup-ideas":       "Let's find you a great startup idea. Tell me about your skills or interests — or just ask me for ideas.",
      "creative-projects":   "Let's get creative. What are you interested in, or what kind of project are you looking for?",
      "side-hustle-ideas":   "Let's find you a side hustle. What skills do you have, or what areas interest you?",
      "productivity-coach":  "I'm your productivity coach. What's your biggest time or focus challenge right now?",
      "writing-helper":      "Share something you'd like to write or improve, and I'll help you make it better.",
      "tech-support":        "What technical problem can I help you solve? Give me as much detail as you can.",
    };

    setMessages([{ role: "assistant", content: welcomeMessages[behavior] }]);
    setStep(3);
  }

  // ── Chat send ─────────────────────────────────────────────
  async function sendMessage(text: string) {
    if (!text.trim() || loading || !selectedType || !selectedBehavior) return;

    const userMsg: ChatMessage = { role: "user", content: text.trim() };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/builder-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aiType: selectedType,
          behavior: selectedBehavior,
          messages: updatedMessages,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setMessages([...updatedMessages, {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        }]);
      } else {
        const aiReply = data.choices?.[0]?.message?.content ?? "I didn't understand that. Try rephrasing?";
        setMessages([...updatedMessages, { role: "assistant", content: aiReply }]);
        const newCount = msgCount + 1;
        setMsgCount(newCount);

        // After 3 exchanges, nudge toward completion
        if (newCount >= 3) {
          setTimeout(() => setStep(4), 1500);
        }
      }
    } catch {
      setMessages([...updatedMessages, {
        role: "assistant",
        content: "Connection issue. Check your internet and try again.",
      }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  // ─────────────────────────────────────────────────────────
  // Step indicators
  // ─────────────────────────────────────────────────────────
  const steps = [
    { n: 1, label: "Choose type" },
    { n: 2, label: "Customize" },
    { n: 3, label: "Talk to it" },
    { n: 4, label: "You built it" },
  ];

  // ─────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-surface">

      {/* ── Progress bar ── */}
      <div className="sticky top-16 z-40 bg-surface/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <React.Fragment key={s.n}>
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    step > s.n
                      ? "bg-green-500 text-white"
                      : step === s.n
                      ? "bg-gradient-brand text-white"
                      : "bg-surface-3 text-gray-600"
                  }`}>
                    {step > s.n ? <CheckCircle2 className="w-4 h-4" /> : s.n}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${
                    step === s.n ? "text-white" : step > s.n ? "text-green-400" : "text-gray-600"
                  }`}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-2 transition-colors duration-500 ${
                    step > s.n ? "bg-green-500/50" : "bg-white/[0.07]"
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* ─── STEP 1: Choose type ─────────────────────────── */}
        {step === 1 && (
          <div className="animate-fade-up">
            <div className="text-center mb-10">
              <div className="text-brand-blue text-xs font-bold uppercase tracking-widest mb-3">Step 1 of 4</div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                What kind of AI tool do you want to build?
              </h1>
              <p className="text-gray-400">Pick one. You can always build a different one later.</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {aiTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleTypeSelect(type.id)}
                  className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-brand-blue/50 hover:bg-brand-blue/5 transition-all duration-200 text-left flex flex-col gap-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue/20 transition-colors">
                    {type.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">{type.label}</div>
                    <div className="text-gray-400 text-sm leading-relaxed">{type.desc}</div>
                  </div>
                  <div className="mt-auto flex items-center gap-1.5 text-brand-blue text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Select <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ─── STEP 2: Choose behavior ─────────────────────── */}
        {step === 2 && selectedType && (
          <div className="animate-fade-up">
            <div className="text-center mb-10">
              <div className="text-brand-blue text-xs font-bold uppercase tracking-widest mb-3">Step 2 of 4</div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                How should your AI behave?
              </h1>
              <p className="text-gray-400">This defines your AI&apos;s personality and purpose.</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {behaviorOptions[selectedType].map((b) => (
                <button
                  key={b.id}
                  onClick={() => handleBehaviorSelect(b.id)}
                  className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-brand-purple/50 hover:bg-brand-purple/5 transition-all duration-200 text-left flex flex-col gap-2"
                >
                  <div className="font-semibold text-white">{b.label}</div>
                  <div className="text-gray-400 text-sm leading-relaxed">{b.desc}</div>
                  <div className="mt-3 flex items-center gap-1.5 text-brand-purple text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Choose this <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(1)}
              className="mt-6 text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              ← Back to AI type
            </button>
          </div>
        )}

        {/* ─── STEP 3: Chat ─────────────────────────────────── */}
        {step === 3 && selectedType && selectedBehavior && (
          <div className="animate-fade-up">
            <div className="text-center mb-6">
              <div className="text-brand-blue text-xs font-bold uppercase tracking-widest mb-2">Step 3 of 4</div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Talk to your AI — it&apos;s live.
              </h1>
              <p className="text-gray-400 text-sm">
                This is powered by a real AI model. What you&apos;re seeing is actual AI responding to you.
              </p>
            </div>

            {/* AI info bar */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.07] mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-white text-sm font-semibold">
                  {behaviorOptions[selectedType].find(b => b.id === selectedBehavior)?.label ?? "Your AI"}
                </div>
                <div className="text-gray-500 text-xs">Powered by Groq · Llama 3.3 70B</div>
              </div>
              <div className="ml-auto flex items-center gap-1.5 text-xs text-green-400">
                <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                Live
              </div>
            </div>

            {/* Chat window */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/[0.07] overflow-hidden">
              <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.role === "assistant"
                        ? "bg-gradient-brand"
                        : "bg-surface-3 border border-white/10"
                    }`}>
                      {msg.role === "assistant"
                        ? <Bot className="w-4 h-4 text-white" />
                        : <User className="w-4 h-4 text-gray-400" />
                      }
                    </div>
                    <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "assistant"
                        ? "bg-surface-2 text-gray-200 rounded-tl-sm"
                        : "bg-brand-blue/20 text-white rounded-tr-sm"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-surface-2 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
                      <span className="text-gray-500 text-sm">Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input area */}
              <div className="border-t border-white/[0.06] p-3">
                {/* Suggested prompts */}
                {messages.length < 3 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {suggestedMessages[selectedBehavior].map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="text-xs px-3 py-1.5 rounded-lg bg-surface-3 border border-white/[0.07] text-gray-400 hover:text-white hover:border-brand-blue/30 transition-all"
                      >
                        {s.length > 50 ? s.slice(0, 48) + "…" : s}
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    disabled={loading}
                    className="flex-1 bg-surface-3 border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-blue/50 transition-colors disabled:opacity-50"
                  />
                  <button
                    onClick={() => sendMessage(input)}
                    disabled={loading || !input.trim()}
                    className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center disabled:opacity-40 hover:scale-[1.05] transition-transform"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Manual finish */}
            <div className="text-center mt-6">
              <button
                onClick={() => setStep(4)}
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                Done testing → See what I built
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 4: Completion ───────────────────────────── */}
        {step === 4 && (
          <div className="animate-fade-up text-center">
            {/* Celebration */}
            <div className="text-6xl mb-6">🎉</div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">You built your first AI tool</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              You just built a working AI.
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              That AI you were just talking to? That&apos;s real. It&apos;s powered by Groq&apos;s Llama model.
              You defined its behavior. You tested it. You built it.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mb-10">
              {[
                { label: "Messages sent", value: msgCount + 1 },
                { label: "AI type built", value: aiTypes.find(t => t.id === selectedType)?.label ?? "AI Tool" },
                { label: "Time to build", value: "< 5 min" },
              ].map((s) => (
                <div key={s.label} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                  <div className="text-white font-bold text-sm">{s.value}</div>
                  <div className="text-gray-600 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="max-w-xl mx-auto">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] text-left mb-6">
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-3">
                  One thing to know
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Your AI currently only runs inside MG Labs. It doesn&apos;t have its own URL.
                  You can&apos;t share it, deploy it, or turn it into a real product — yet.
                  That&apos;s the next step.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => router.push("/start/complete")}
                  className="flex-1 py-3.5 px-5 bg-gradient-brand text-white rounded-xl font-semibold hover:scale-[1.02] transition-all shadow-lg shadow-brand-blue/30 flex items-center gap-2 justify-center"
                >
                  What happens next? <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setStep(1); setMessages([]); setMsgCount(0); }}
                  className="flex-1 py-3.5 px-5 rounded-xl font-medium text-gray-300 border border-white/10 hover:border-white/20 hover:text-white transition-all"
                >
                  Build a different one
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
