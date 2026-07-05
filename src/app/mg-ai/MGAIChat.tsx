"use client";
// ============================================================
// src/app/mg-ai/MGAIChat.tsx  (Client Component)
// Full chat UI — history, streaming feel, markdown render,
// voice input/output, and free image generation.
// ============================================================
import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Bot, Send, Trash2, Copy, Check, Sparkles,
  ArrowRight, Zap, RotateCcw, Mic, Square, Volume2, VolumeX,
  ImageIcon, Loader2,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────
interface Message {
  role: "user" | "assistant";
  content: string;
  id: string;
  imageUrl?: string;
}

interface ModelOption {
  id: string;
  label: string;
  emoji: string;
  description: string;
}

// ── Model catalog ─────────────────────────────────────────────
const MODELS: ModelOption[] = [
  { id: "openai/gpt-oss-120b", label: "GPT-OSS 120B", emoji: "🧠", description: "Smartest — best for reasoning & code" },
  { id: "openai/gpt-oss-20b", label: "GPT-OSS 20B", emoji: "⚡", description: "Fast reasoning, lighter" },
  { id: "llama-3.3-70b-versatile", label: "Llama 3.3 70B", emoji: "🦙", description: "Well-rounded all-purpose" },
  { id: "qwen/qwen3-32b", label: "Qwen3 32B", emoji: "💻", description: "Strong at code & logic" },
  { id: "meta-llama/llama-4-scout-17b-16e-instruct", label: "Llama 4 Scout", emoji: "👁️", description: "Vision + huge context" },
  { id: "groq/compound", label: "Compound (Web Search)", emoji: "🌐", description: "Live web search + code execution" },
];

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
  const [selectedModel, setSelectedModel] = useState(MODELS[0].id);

  // Voice mode state
  const [voiceModeOn, setVoiceModeOn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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

  // ── Send a chat message (text or image command) ─────────────
  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    setError(null);

    // Handle "/image <description>" as an image generation request
    if (text.trim().toLowerCase().startsWith(IMAGE_COMMAND_PREFIX)) {
      const prompt = text.trim().slice(IMAGE_COMMAND_PREFIX.length).trim();
      if (!prompt) {
        setError("Add a description after /image, e.g. /image a red fox in snow");
        return;
      }
      await generateImage(prompt);
      return;
    }

    const userMsg: Message = { role: "user", content: text.trim(), id: uid() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    if (textareaRef.current) textareaRef.current.style.height = "auto";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: selectedModel,
          messages: newMessages.map(({ role, content }) => ({ role, content })),
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

      // In voice mode, speak the reply aloud automatically
      if (voiceModeOn) {
        speakText(assistantContent);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // ── Generate an image via Pollinations ───────────────────────
  const generateImage = async (prompt: string) => {
    const userMsg: Message = { role: "user", content: `/image ${prompt}`, id: uid() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/image-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
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
        },
      ]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
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
                Your free AI assistant — chat, voice, and image generation.
              </p>
              <p className="text-gray-600 text-sm mb-2">
                Currently using {currentModel.emoji} <span className="text-gray-400">{currentModel.label}</span> — {currentModel.description}
              </p>
              <p className="text-gray-700 text-xs mb-12">
                Tap the mic to talk · Type <code className="bg-surface-2 px-1 rounded">/image</code> to generate art · No account needed
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
                    {msg.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={msg.imageUrl}
                        alt="AI generated"
                        className="mt-2 rounded-xl border border-white/10 max-w-full"
                        loading="lazy"
                      />
                    )}
                  </div>
                )}

                {/* Copy / speak controls */}
                {msg.role === "assistant" && !msg.imageUrl && (
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
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
                    >
                      {copiedId === msg.id ? (
                        <Check className="h-3.5 w-3.5 text-green-400" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
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

            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder={
                isRecording
                  ? "Listening… tap the square to stop"
                  : "Ask anything, or type /image to generate art…"
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
              onClick={() =>
                input.trim().toLowerCase().startsWith(IMAGE_COMMAND_PREFIX)
                  ? sendMessage(input)
                  : sendMessage(input)
              }
              disabled={!input.trim() || loading}
              className="h-8 w-8 rounded-lg bg-brand-blue hover:bg-brand-blue/80 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0 transition-all hover:scale-105 active:scale-95"
              aria-label="Send message"
            >
              {input.trim().toLowerCase().startsWith(IMAGE_COMMAND_PREFIX) ? (
                <ImageIcon className="h-3.5 w-3.5 text-white" />
              ) : (
                <Send className="h-3.5 w-3.5 text-white" />
              )}
            </button>
          </div>
          <div className="flex items-center justify-between mt-2 px-1">
            <p className="text-xs text-gray-700">
              <kbd className="text-gray-600 bg-surface-2 px-1 py-0.5 rounded text-[10px] border border-white/10">Enter</kbd> to send · Tap 🎤 to talk · <code className="text-gray-600">/image</code> to create art
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
