"use client";
// ============================================================
// src/app/mg-ai/MGAIChat.tsx  (Client Component)
// Full chat UI — history, streaming feel, markdown render,
// voice input/output, and free image generation.
// ============================================================
import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  Bot, Send, Trash2, Copy, Check, Sparkles,
  ArrowRight, Zap, RotateCcw, Mic, Square, Volume2, VolumeX,
  ImageIcon, Loader2, X, Pencil, RefreshCw, ArrowDown,
} from "lucide-react";
import {
  TEXT_MODELS,
  IMAGE_MODELS,
  DEFAULT_IMAGE_MODEL,
  AUTO_MODEL_ID,
  AUTO_MODEL_OPTION,
  isAutoModel,
} from "@/lib/data/ai-models";
import { highlightCode } from "@/lib/utils/highlight";
import "./hljs-theme.css";

// ── Types ────────────────────────────────────────────────────
interface Citation {
  title: string;
  url: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  id: string;
  imageUrl?: string;
  imageModelLabel?: string;
  /** Set on assistant messages answered while "Auto" was selected —
   * which real model actually handled this specific turn. */
  modelUsed?: string;
  /** Web sources the model cited, when smart routing picked the
   * search-enabled model for this turn. */
  citations?: Citation[];
  /** True while this assistant reply is still receiving stream deltas —
   * drives the typing cursor and the empty-bubble loading dots. */
  streaming?: boolean;
}

/** One event from /api/chat's SSE stream — see route.ts for the protocol. */
interface ChatStreamEvent {
  delta?: string;
  error?: string;
  done?: boolean;
  modelUsed?: string;
  routedReason?: string;
}

/** Reads the custom `data: {...}` SSE protocol /api/chat streams back.
 * Not the OpenAI wire format — this project owns both ends, so the
 * event shape is whatever's simplest for the UI to consume. */
async function* readChatSSE(res: Response): AsyncGenerator<ChatStreamEvent> {
  if (!res.body) return;
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const payload = trimmed.slice(5).trim();
        if (!payload) continue;
        try {
          yield JSON.parse(payload) as ChatStreamEvent;
        } catch {
          // Ignore a malformed/partial line — not fatal.
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

// Text + image model catalogs live in src/lib/data/ai-models.ts —
// the single source of truth shared with the API routes, so the
// UI never offers a model the backend won't accept. "Auto" is a UI
// + routing sentinel layered on top, not a real backend model.
const MODELS = [AUTO_MODEL_OPTION, ...TEXT_MODELS];

// ── Starter prompts ──────────────────────────────────────────
const STARTERS = [
  { label: "Explain prompt engineering", prompt: "Explain prompt engineering in simple terms and give me 3 actionable tips to write better prompts." },
  { label: "Build a chatbot", prompt: "How do I build a simple AI chatbot using the OpenAI API and Next.js? Give me a step-by-step guide." },
  { label: "Best AI tools 2026", prompt: "What are the best AI tools I should be using in 2026 for productivity and creativity?" },
  { label: "Generate an image", prompt: "/image a futuristic city at sunset, cinematic lighting" },
  { label: "n8n automation ideas", prompt: "Give me 5 practical n8n automation workflows that would save a freelancer time every week." },
  { label: "Try voice mode", prompt: "__voice_hint__" },
];

const IMAGE_COMMAND_PREFIX = "/image";

function stripImageCommand(text: string): string {
  return text.trim().slice(IMAGE_COMMAND_PREFIX.length).trim();
}

// ── Tiny inline markdown renderer ────────────────────────────
function renderMarkdown(text: string) {
  const lines = text.split("\n");
  const result: React.ReactNode[] = [];
  let inCode = false;
  let codeLines: string[] = [];
  let codeLang = "";
  let key = 0;

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCode) {
        result.push(
          <CodeBlock key={key++} code={codeLines.join("\n")} lang={codeLang} />
        );
        codeLines = [];
        codeLang = "";
        inCode = false;
      } else {
        codeLang = line.slice(3).trim();
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
  // An unclosed fence (still streaming mid-code-block) would otherwise
  // drop everything typed so far — render what's arrived so far instead.
  if (inCode && codeLines.length > 0) {
    result.push(<CodeBlock key={key++} code={codeLines.join("\n")} lang={codeLang} />);
  }
  return result;
}

/** A fenced code block: language label, copy button, and real syntax
 * highlighting (see src/lib/utils/highlight.ts) instead of flat green text. */
function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const html = useMemo(() => highlightCode(code, lang), [code, lang]);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="my-2 rounded-lg overflow-hidden border border-white/10 bg-black/40">
      <div className="flex items-center justify-between px-3 py-1.5 bg-white/[0.03] border-b border-white/10">
        <span className="text-[11px] text-gray-500 font-mono">{lang || "text"}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-gray-300 transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-green-400" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-3 overflow-x-auto text-xs font-mono leading-relaxed">
        {/* highlight.js output is our own escaped HTML, not user input
            rendered verbatim — see highlightCode()'s escape fallback. */}
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </div>
  );
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
  const [selectedModel, setSelectedModel] = useState(AUTO_MODEL_ID);

  // Editing a previously-sent user message — see submitEdit().
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  // Whether the user is scrolled near the bottom of the chat — drives
  // both auto-scroll-on-new-content and the floating "jump to latest"
  // button, so streaming replies don't yank the view out from under
  // someone who scrolled up to reread something.
  const [isNearBottom, setIsNearBottom] = useState(true);
  const isNearBottomRef = useRef(true);

  // Image generation mode — toggled via the image icon next to the
  // mic, or auto-enabled when the user types the "/image" shortcut.
  const [imageMode, setImageMode] = useState(false);
  const [selectedImageModel, setSelectedImageModel] = useState(DEFAULT_IMAGE_MODEL);

  // Voice mode state
  const [voiceModeOn, setVoiceModeOn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (isNearBottomRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
    isNearBottomRef.current = nearBottom;
    setIsNearBottom(nearBottom);
  };

  const scrollToLatest = () => {
    isNearBottomRef.current = true;
    setIsNearBottom(true);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Esc stops an in-flight generation from anywhere on the page, not
  // just while the (disabled, while loading) textarea has focus.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && loading) {
        abortControllerRef.current?.abort();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [loading]);

  const uid = () => Math.random().toString(36).slice(2);
  const currentModel = MODELS.find((m) => m.id === selectedModel) ?? MODELS[0];

  // ── Speak assistant text aloud (Groq PlayAI TTS) ────────────
  const speakText = useCallback(async (text: string) => {
    try {
      setIsSpeaking(true);
      const res = await fetch("/api/voice-speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        setIsSpeaking(false);
        return; // fail silently for voice — text reply is still shown
      }

      const audioBlob = await res.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
      const player = new Audio(audioUrl);
      audioPlayerRef.current = player;
      player.onended = () => setIsSpeaking(false);
      player.onerror = () => setIsSpeaking(false);
      await player.play();
    } catch {
      setIsSpeaking(false);
    }
  }, []);

  // ── Dispatch a piece of user text: image command, image mode, or
  // normal chat. Shared by sendMessage (typing) and submitEdit (editing
  // a past message) so both go through identical routing logic against
  // whatever "base" history they're building on top of. ──────────────
  const dispatchUserText = async (text: string, base: Message[]) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setError(null);

    if (trimmed.toLowerCase().startsWith(IMAGE_COMMAND_PREFIX)) {
      const prompt = stripImageCommand(trimmed);
      if (!prompt) {
        setError("Add a description after /image, e.g. /image a red fox in snow");
        return;
      }
      await generateImage(prompt, base);
      return;
    }

    if (imageMode) {
      await generateImage(trimmed, base);
      return;
    }

    await runChat(trimmed, base);
  };

  const sendMessage = (text: string) => dispatchUserText(text, messages);

  const submitEdit = (idx: number) => {
    const val = editValue.trim();
    if (!val) return;
    setEditingId(null);
    dispatchUserText(val, messages.slice(0, idx));
  };

  const retryMessage = (assistantIdx: number) => {
    const userIdx = assistantIdx - 1;
    if (userIdx < 0 || messages[userIdx]?.role !== "user") return;
    dispatchUserText(messages[userIdx].content, messages.slice(0, userIdx));
  };

  const stopGenerating = () => {
    abortControllerRef.current?.abort();
  };

  // ── Send a chat message and stream the reply into a live bubble ──
  const runChat = async (text: string, base: Message[]) => {
    const userMsg: Message = { role: "user", content: text, id: uid() };
    const assistantId = uid();
    const newMessages = [...base, userMsg];

    setMessages([...newMessages, { role: "assistant", content: "", id: assistantId, streaming: true }]);
    setInput("");
    setLoading(true);
    isNearBottomRef.current = true;
    setIsNearBottom(true);

    if (textareaRef.current) textareaRef.current.style.height = "auto";

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const updateAssistant = (patch: Partial<Message>) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, ...patch } : m))
      );
    };

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: selectedModel,
          messages: newMessages.map(({ role, content }) => ({ role, content })),
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }

      const isStream = (res.headers.get("content-type") || "").includes("text/event-stream");

      if (isStream) {
        let full = "";
        let modelUsed: string | undefined;
        for await (const evt of readChatSSE(res)) {
          if (evt.error) throw new Error(evt.error);
          if (evt.delta) {
            full += evt.delta;
            updateAssistant({ content: full });
          }
          if (evt.done) modelUsed = evt.modelUsed;
        }
        updateAssistant({
          streaming: false,
          modelUsed: isAutoModel(selectedModel) ? modelUsed : undefined,
        });
        if (voiceModeOn) speakText(full);
      } else {
        const data = await res.json();
        const assistantContent: string =
          data.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
        updateAssistant({
          content: assistantContent,
          streaming: false,
          modelUsed: isAutoModel(selectedModel) ? data.modelUsed : undefined,
          citations: data.citations,
        });
        if (voiceModeOn) speakText(assistantContent);
      }
    } catch (err) {
      const e = err as Error;
      if (e.name === "AbortError") {
        // User hit Stop — keep whatever streamed in so far, just drop
        // the "still typing" state instead of treating it as a failure.
        updateAssistant({ streaming: false });
      } else {
        setError(e.message);
        // No partial content to keep — drop the empty placeholder bubble.
        setMessages((prev) => prev.filter((m) => m.id !== assistantId || m.content));
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  // ── Generate an image via Pollinations ───────────────────────
  const generateImage = async (prompt: string, base: Message[] = messages) => {
    if (!prompt.trim()) {
      setError("Add a description of the image you want.");
      return;
    }

    const imageModel =
      IMAGE_MODELS.find((m) => m.id === selectedImageModel) ?? IMAGE_MODELS[0];

    const userMsg: Message = { role: "user", content: `/image ${prompt}`, id: uid() };
    setMessages([...base, userMsg]);
    setInput("");
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const res = await fetch("/api/image-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model: imageModel.id }),
        signal: controller.signal,
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Image generation failed.");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Here's your image for: "${prompt}"`,
          id: uid(),
          imageUrl: data.imageUrl,
          imageModelLabel: `${imageModel.emoji} ${imageModel.label}`,
        },
      ]);
    } catch (err) {
      const e = err as Error;
      if (e.name !== "AbortError") {
        setError(e.message);
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  // ── Voice recording (mic → Groq Whisper) ─────────────────────
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        await transcribeAndSend(audioBlob);
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch {
      setError("Microphone access denied or unavailable.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const transcribeAndSend = async (audioBlob: Blob) => {
    setIsTranscribing(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");

      const res = await fetch("/api/voice-transcribe", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Transcription failed.");
      }

      const transcribed = (data.text || "").trim();
      if (transcribed) {
        await sendMessage(transcribed);
      } else {
        setError("Didn't catch that — try speaking again.");
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsTranscribing(false);
    }
  };

  const toggleImageMode = () => {
    setImageMode((prev) => !prev);
    setError(null);
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const stopSpeaking = () => {
    audioPlayerRef.current?.pause();
    setIsSpeaking(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 200) + "px";

    // Typing the /image shortcut auto-enables image mode so the
    // model picker appears — keeps both entry points in sync.
    if (value.trim().toLowerCase().startsWith(IMAGE_COMMAND_PREFIX) && !imageMode) {
      setImageMode(true);
    }
  };

  const copyMessage = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    abortControllerRef.current?.abort();
    setMessages([]);
    setError(null);
    setImageMode(false);
    setEditingId(null);
    stopSpeaking();
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
              {currentModel.emoji} {currentModel.label} · Free
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Voice mode toggle */}
          <button
            onClick={() => {
              if (voiceModeOn) stopSpeaking();
              setVoiceModeOn((v) => !v);
            }}
            title={voiceModeOn ? "Voice mode on — replies will be spoken" : "Turn on voice mode"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors border ${
              voiceModeOn
                ? "bg-brand-purple/20 text-brand-purple border-brand-purple/40"
                : "text-gray-400 hover:text-white hover:bg-surface-2 border-white/[0.06]"
            }`}
          >
            {voiceModeOn ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
            Voice
          </button>

          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            title={currentModel.description}
            className="bg-surface-2 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white max-w-[120px] sm:max-w-none"
          >
            {MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.emoji} {m.label}
              </option>
            ))}
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
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto"
      >
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
                Your free AI assistant — chat, voice, and image generation.
              </p>
              <p className="text-gray-600 text-sm mb-2">
                Currently using {currentModel.emoji} <span className="text-gray-400">{currentModel.label}</span> — {currentModel.description}
              </p>
              <p className="text-gray-700 text-xs mb-12">
                Tap the mic to talk · Tap the image icon (or type <code className="bg-surface-2 px-1 rounded">/image</code>) to generate art · No account needed
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-left">
                {STARTERS.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => {
                      if (s.prompt === "__voice_hint__") {
                        setVoiceModeOn(true);
                        handleMicClick();
                        return;
                      }
                      sendMessage(s.prompt);
                    }}
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
          {messages.map((msg, idx) => {
            const isLastAssistant =
              msg.role === "assistant" && idx === messages.length - 1;
            const isEditingThis = editingId === msg.id;

            return (
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
                    isEditingThis ? (
                      <div className="flex flex-col gap-2 min-w-[220px]">
                        <textarea
                          autoFocus
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              submitEdit(idx);
                            } else if (e.key === "Escape") {
                              setEditingId(null);
                            }
                          }}
                          rows={Math.min(8, editValue.split("\n").length + 1)}
                          className="bg-black/20 text-white text-sm rounded-lg p-2 outline-none resize-none border border-white/20 leading-relaxed"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setEditingId(null)}
                            className="text-xs text-white/70 hover:text-white px-2 py-1"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => submitEdit(idx)}
                            className="text-xs bg-white/20 hover:bg-white/30 rounded px-2 py-1 transition-colors"
                          >
                            Save & resend
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    )
                  ) : (
                    <div className="text-sm leading-relaxed space-y-0.5">
                      {msg.modelUsed && (
                        <div className="mb-2 inline-flex items-center gap-1 text-[11px] text-brand-purple/80 bg-brand-purple/10 border border-brand-purple/20 rounded-full px-2 py-0.5">
                          <Sparkles className="h-2.5 w-2.5" />
                          {MODELS.find((m) => m.id === msg.modelUsed)?.emoji}{" "}
                          {MODELS.find((m) => m.id === msg.modelUsed)?.label ?? msg.modelUsed}
                        </div>
                      )}
                      {msg.streaming && msg.content === "" ? (
                        <div className="flex items-center gap-1.5 py-1">
                          <span className="h-2 w-2 rounded-full bg-brand-blue animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="h-2 w-2 rounded-full bg-brand-purple animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="h-2 w-2 rounded-full bg-brand-blue animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      ) : (
                        <>
                          {renderMarkdown(msg.content)}
                          {msg.streaming && (
                            <span className="inline-block w-1.5 h-4 bg-brand-purple/70 ml-0.5 align-text-bottom animate-pulse" />
                          )}
                        </>
                      )}
                      {msg.citations && msg.citations.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-white/[0.06]">
                          <div className="text-[11px] text-gray-600 mb-1.5">Sources</div>
                          <div className="flex flex-col gap-1">
                            {msg.citations.map((c, i) => (
                              <a
                                key={c.url + i}
                                href={c.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] text-brand-blue/80 hover:text-brand-blue truncate"
                                title={c.url}
                              >
                                {i + 1}. {c.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                      {msg.imageUrl && (
                        <div className="mt-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={msg.imageUrl}
                            alt="AI generated"
                            className="rounded-xl border border-white/10 max-w-full"
                            loading="lazy"
                          />
                          {msg.imageModelLabel && (
                            <div className="mt-1.5 text-[11px] text-gray-600">
                              Generated with {msg.imageModelLabel}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Copy / speak / retry controls */}
                  {msg.role === "assistant" && !msg.imageUrl && !msg.streaming && (
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      {isLastAssistant && (
                        <button
                          onClick={() => retryMessage(idx)}
                          disabled={loading}
                          className="p-1.5 rounded-md hover:bg-surface-3 text-gray-600 hover:text-gray-300 disabled:opacity-40"
                          title="Retry — regenerate this reply"
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => speakText(msg.content)}
                        className="p-1.5 rounded-md hover:bg-surface-3 text-gray-600 hover:text-gray-300"
                        title="Read aloud"
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => copyMessage(msg.content, msg.id)}
                        className="p-1.5 rounded-md hover:bg-surface-3 text-gray-600 hover:text-gray-300"
                        title="Copy"
                      >
                        {copiedId === msg.id ? (
                          <Check className="h-3.5 w-3.5 text-green-400" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  )}

                  {/* Edit control */}
                  {msg.role === "user" && !isEditingThis && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setEditingId(msg.id);
                          setEditValue(msg.content);
                        }}
                        disabled={loading}
                        className="p-1.5 rounded-md hover:bg-white/10 text-white/60 hover:text-white disabled:opacity-40"
                        title="Edit & resend"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {msg.role === "user" && (
                  <div className="h-7 w-7 rounded-lg bg-surface-2 border border-white/10 flex items-center justify-center flex-shrink-0 ml-3 mt-1 text-xs font-semibold text-gray-400">
                    U
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading indicator — only for requests with no placeholder
              bubble of their own yet (image generation in flight). Text
              chat shows its "typing" state inline in the message above. */}
          {loading && messages[messages.length - 1]?.role === "user" && (
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

      {/* Floating "jump to latest" — appears once the user scrolls away
          from the bottom, e.g. to reread something while a reply streams. */}
      {!isNearBottom && messages.length > 0 && (
        <button
          onClick={scrollToLatest}
          className="fixed bottom-28 right-4 sm:right-10 z-40 h-9 w-9 rounded-full bg-surface-2 border border-white/10 shadow-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-surface-3 transition-all"
          title="Scroll to latest"
        >
          <ArrowDown className="h-4 w-4" />
        </button>
      )}

      {/* ── Input area ── */}
      <div className="sticky bottom-0 bg-surface/80 backdrop-blur-xl border-t border-white/[0.06] px-4 sm:px-6 py-4">
        <div className="max-w-3xl mx-auto">

          {/* Image mode bar — appears above the input when active,
              lets the user pick which free image model to use. */}
          {imageMode && (
            <div className="flex items-center gap-2 mb-2 px-1 animate-fade-up">
              <ImageIcon className="h-3.5 w-3.5 text-brand-purple flex-shrink-0" />
              <span className="text-xs text-gray-400 flex-shrink-0">Image mode</span>
              <select
                value={selectedImageModel}
                onChange={(e) => setSelectedImageModel(e.target.value)}
                title={
                  IMAGE_MODELS.find((m) => m.id === selectedImageModel)?.description
                }
                className="bg-surface-2 border border-white/10 rounded-lg px-2 py-1 text-xs text-white flex-1 min-w-0"
              >
                {IMAGE_MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.emoji} {m.label} — {m.description}
                  </option>
                ))}
              </select>
              <button
                onClick={toggleImageMode}
                title="Exit image mode"
                className="h-6 w-6 rounded-md flex items-center justify-center flex-shrink-0 text-gray-500 hover:text-white hover:bg-surface-2 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          <div className="flex items-end gap-3 bg-surface-1 border border-white/[0.06] rounded-2xl px-4 py-3 focus-within:border-brand-blue/50 transition-colors">
            <button
              onClick={handleMicClick}
              disabled={isTranscribing || loading}
              title={isRecording ? "Stop recording" : "Speak your message"}
              className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                isRecording
                  ? "bg-red-500 animate-pulse"
                  : "bg-surface-2 hover:bg-surface-3 border border-white/10"
              } disabled:opacity-40`}
            >
              {isTranscribing ? (
                <Loader2 className="h-3.5 w-3.5 text-gray-300 animate-spin" />
              ) : isRecording ? (
                <Square className="h-3 w-3 text-white" fill="white" />
              ) : (
                <Mic className="h-3.5 w-3.5 text-gray-300" />
              )}
            </button>

            {/* Image icon — same treatment as the mic button. Tapping
                toggles image mode on/off, no /image typing required. */}
            <button
              onClick={toggleImageMode}
              disabled={loading}
              title={imageMode ? "Exit image mode" : "Generate an image"}
              className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                imageMode
                  ? "bg-brand-purple/20 border border-brand-purple/40 text-brand-purple"
                  : "bg-surface-2 hover:bg-surface-3 border border-white/10 text-gray-300"
              } disabled:opacity-40`}
            >
              <ImageIcon className="h-3.5 w-3.5" />
            </button>

            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder={
                isRecording
                  ? "Listening… tap the square to stop"
                  : imageMode
                    ? "Describe the image you want to create…"
                    : "Ask anything, or tap the image icon to generate art…"
              }
              rows={1}
              className="flex-1 bg-transparent text-white text-sm placeholder-gray-600 resize-none outline-none leading-relaxed min-h-[24px] max-h-[200px]"
              disabled={loading || isRecording}
            />

            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                title="Stop speaking"
                className="h-8 w-8 rounded-lg bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center flex-shrink-0"
              >
                <VolumeX className="h-3.5 w-3.5 text-brand-purple" />
              </button>
            )}

            <button
              onClick={loading ? stopGenerating : () => sendMessage(input)}
              disabled={!loading && !input.trim()}
              className={`h-8 w-8 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0 transition-all hover:scale-105 active:scale-95 ${
                loading
                  ? "bg-surface-3 border border-white/20 hover:bg-surface-2"
                  : "bg-brand-blue hover:bg-brand-blue/80"
              }`}
              aria-label={loading ? "Stop generating" : "Send message"}
              title={loading ? "Stop generating (Esc)" : "Send"}
            >
              {loading ? (
                <Square className="h-3 w-3 text-white" fill="white" />
              ) : imageMode || input.trim().toLowerCase().startsWith(IMAGE_COMMAND_PREFIX) ? (
                <ImageIcon className="h-3.5 w-3.5 text-white" />
              ) : (
                <Send className="h-3.5 w-3.5 text-white" />
              )}
            </button>
          </div>
          <div className="flex items-center justify-between mt-2 px-1">
            <p className="text-xs text-gray-700">
              <kbd className="text-gray-600 bg-surface-2 px-1 py-0.5 rounded text-[10px] border border-white/10">Enter</kbd> to send ·{" "}
              <kbd className="text-gray-600 bg-surface-2 px-1 py-0.5 rounded text-[10px] border border-white/10">Esc</kbd> to stop · Tap 🎤 to talk · Tap 🖼️ or type <code className="text-gray-600">/image</code> to create art
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
