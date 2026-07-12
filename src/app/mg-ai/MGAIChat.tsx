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
  ImageIcon, Loader2, X, Menu, Pencil, RefreshCw, StopCircle,
  Paperclip, Globe,
} from "lucide-react";
import {
  TEXT_MODELS,
  IMAGE_MODELS,
  DEFAULT_TEXT_MODEL,
  DEFAULT_IMAGE_MODEL,
} from "@/lib/data/ai-models";
import {
  classifyFile,
  fileToDataUrl,
  fileToText,
  formatTextAttachment,
  MAX_IMAGE_BYTES,
} from "@/lib/utils/attachments";
import { useChatSession } from "@/lib/hooks/useChatSession";
import { useChatHistory } from "@/lib/hooks/useChatHistory";
import { readSSE } from "@/lib/ai/readSSE";
import { ChatSidebar } from "./ChatSidebar";
import { CodeBlock } from "./CodeBlock";

// ── Types ────────────────────────────────────────────────────
interface Attachment {
  /** Data URL (data:image/...;base64,...) — sent to vision models as-is. */
  dataUrl: string;
  name: string;
}

interface Citation {
  title?: string;
  url: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  id: string;
  /** Generated image shown on an assistant reply (from /image or image mode). */
  imageUrl?: string;
  imageModelLabel?: string;
  /** Images the user attached to this (their own) message. */
  attachments?: Attachment[];
  /** Web search sources, when the reply came from a search-capable model. */
  citations?: Citation[];
}

// Text + image model catalogs live in src/lib/data/ai-models.ts —
// the single source of truth shared with the API routes, so the
// UI never offers a model the backend won't accept.
const MODELS = TEXT_MODELS;

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

// ── Slash commands ───────────────────────────────────────────
// Typing "/" at the start of an empty composer opens a small
// autocomplete menu (see slashMenuOpen state) — /image and /search
// insert their prefix and let the user keep typing; /clear and /new
// act immediately since they take no argument.
interface SlashCommand {
  command: string;
  label: string;
  description: string;
  icon: "image" | "search" | "clear" | "new";
  /** Inserts "/command " into the composer and keeps it open for typing,
   * vs. running immediately with no further input needed. */
  action: "insert" | "immediate";
}

const SLASH_COMMANDS: SlashCommand[] = [
  { command: "/image", label: "Image", description: "Generate an image from a description", icon: "image", action: "insert" },
  { command: "/search", label: "Search", description: "Ask with live web search (Compound)", icon: "search", action: "insert" },
  { command: "/new", label: "New chat", description: "Start a fresh conversation", icon: "new", action: "immediate" },
  { command: "/clear", label: "Clear chat", description: "Delete this conversation", icon: "clear", action: "immediate" },
];

const WEB_SEARCH_MODEL_ID = "groq/compound";
const SEARCH_COMMAND_PREFIX = "/search";

// ── Markdown renderer ────────────────────────────────────────
// Deliberately hand-rolled rather than a full markdown library:
// chat replies only ever use a small, predictable subset (headers,
// lists, bold/inline code, fenced code blocks, rules), and this
// stays synchronous and streaming-safe — an unterminated fence
// (still receiving tokens) renders as a live, unhighlighted block
// instead of throwing, since CodeBlock's language detection just
// no-ops until the language tag line has fully arrived.
function renderMarkdown(text: string) {
  const lines = text.split("\n");
  const result: React.ReactNode[] = [];
  let inCode = false;
  let codeLang = "";
  let codeLines: string[] = [];
  let key = 0;

  const flushCode = () => {
    result.push(<CodeBlock key={key++} code={codeLines.join("\n")} language={codeLang} />);
    codeLines = [];
    codeLang = "";
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCode) {
        flushCode();
        inCode = false;
      } else {
        inCode = true;
        codeLang = line.slice(3).trim();
      }
      continue;
    }
    if (inCode) { codeLines.push(line); continue; }

    if (line.startsWith("### ")) {
      result.push(<h3 key={key++} className="text-sm font-semibold text-ink mt-3 mb-1">{line.slice(4)}</h3>);
    } else if (line.startsWith("## ")) {
      result.push(<h2 key={key++} className="text-base font-bold text-ink mt-4 mb-2">{line.slice(3)}</h2>);
    } else if (line.startsWith("# ")) {
      result.push(<h1 key={key++} className="text-lg font-bold text-ink mt-4 mb-2">{line.slice(2)}</h1>);
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      result.push(<li key={key++} className="ml-4 text-ink-2 list-disc text-sm mb-0.5">{renderInline(line.slice(2))}</li>);
    } else if (line.match(/^\d+\.\s/)) {
      result.push(<li key={key++} className="ml-4 text-ink-2 list-decimal text-sm mb-0.5">{renderInline(line.replace(/^\d+\.\s/, ""))}</li>);
    } else if (line.startsWith("---") || line.startsWith("***")) {
      result.push(<hr key={key++} className="border-border my-3" />);
    } else if (line.trim() === "") {
      result.push(<div key={key++} className="h-1.5" />);
    } else {
      result.push(<p key={key++} className="text-ink-2 text-sm leading-relaxed">{renderInline(line)}</p>);
    }
  }

  // A fence opened but never closed — the stream is still mid-code-block.
  // Render what's arrived so far rather than dropping it until the
  // closing ``` shows up.
  if (inCode && codeLines.length > 0) {
    flushCode();
  }

  return result;
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="text-ink font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i} className="bg-surface-1 text-green-300 px-1 py-0.5 rounded text-xs font-mono">{part.slice(1, -1)}</code>;
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
  const [selectedModel, setSelectedModel] = useState(DEFAULT_TEXT_MODEL);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");
  // Images staged in the composer, not yet sent — cleared once the
  // message goes out. Text/PDF attachments aren't previewed as
  // thumbnails; their extracted text is appended straight into the
  // input box instead (see handleFileSelect), so this list is
  // images only.
  const [pendingAttachments, setPendingAttachments] = useState<Attachment[]>([]);
  const [attachmentError, setAttachmentError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Conversation persistence ─────────────────────────────────
  // sessionId identifies this browser (no login required for MG
  // Labs AI). history is the Supabase-backed sidebar data layer —
  // see useChatSession.ts / useChatHistory.ts for how anonymous
  // vs signed-in ownership works.
  const sessionId = useChatSession();
  const history = useChatHistory(sessionId);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [conversationLoading, setConversationLoading] = useState(false);
  // Ref mirror of activeConversationId so async send handlers always
  // read the latest id without becoming stale closures.
  const activeConversationIdRef = useRef<string | null>(null);
  useEffect(() => {
    activeConversationIdRef.current = activeConversationId;
  }, [activeConversationId]);

  // Image generation mode — toggled via the image icon next to the
  // mic, or auto-enabled when the user types the "/image" shortcut.
  const [imageMode, setImageMode] = useState(false);
  const [selectedImageModel, setSelectedImageModel] = useState(DEFAULT_IMAGE_MODEL);

  // Slash command autocomplete — opens when the composer's only
  // content is "/" plus optional letters, closes on space, escape,
  // selection, or once the text no longer matches a command prefix.
  const [slashMenuOpen, setSlashMenuOpen] = useState(false);
  const [slashHighlightIndex, setSlashHighlightIndex] = useState(0);

  // Voice mode state
  const [voiceModeOn, setVoiceModeOn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Streaming state — streamingId identifies which assistant message
  // bubble is currently receiving deltas (drives the blinking cursor);
  // abortControllerRef lets the Stop button cancel the in-flight fetch.
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // uid() is only ever called from event handlers (send, generate image,
  // etc.), never during render, so a fresh id per call is safe despite
  // being "impure" in the abstract. crypto.randomUUID is standard in all
  // modern browsers this app targets.
  const uid = () => crypto.randomUUID();
  const currentModel = MODELS.find((m) => m.id === selectedModel) ?? MODELS[0];

  const stopSpeaking = useCallback(() => {
    audioPlayerRef.current?.pause();
    setIsSpeaking(false);
  }, []);

  // ── Switch to an existing conversation from the sidebar ──────
  const selectConversation = useCallback(
    async (id: string) => {
      if (id === activeConversationIdRef.current) {
        setMobileSidebarOpen(false);
        return;
      }
      setConversationLoading(true);
      setError(null);
      stopSpeaking();
      const stored = await history.loadMessages(id);
      setMessages(
        stored.map((m) => ({
          role: m.role,
          content: m.content,
          id: m.id,
          imageUrl: m.imageUrl ?? undefined,
          imageModelLabel: m.imageModel ?? undefined,
          attachments: m.attachments ?? undefined,
          citations: m.citations ?? undefined,
        }))
      );
      setActiveConversationId(id);
      setMobileSidebarOpen(false);
      setConversationLoading(false);
    },
    [history, stopSpeaking]
  );

  const startNewChat = useCallback(() => {
    setMessages([]);
    setActiveConversationId(null);
    setError(null);
    setImageMode(false);
    setMobileSidebarOpen(false);
    stopSpeaking();
  }, [stopSpeaking]);

  // ── Global keyboard shortcuts ────────────────────────────────
  // Cmd/Ctrl+K: new chat (matches the convention used by ChatGPT,
  // Claude, Linear, etc. for "start fresh"). Cmd/Ctrl+/: jump focus
  // to the composer from anywhere on the page, useful after
  // scrolling through history or clicking a sidebar chat.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isModKey = e.metaKey || e.ctrlKey;
      if (!isModKey) return;

      if (e.key === "k") {
        e.preventDefault();
        startNewChat();
      } else if (e.key === "/") {
        e.preventDefault();
        textareaRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [startNewChat]);

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

  // ── Send a chat message (text, image command, or image mode) ─
  // editFromId: when set, this call is an "edit and resend" — the
  // user message at that id and everything after it (in local state)
  // is replaced rather than appended, and newMessages is truncated to
  // just before it before calling the API.
  const sendMessage = async (text: string, editFromId?: string) => {
    // Edit-and-resend never carries pending attachments (those only
    // exist for the composer's current, unsent draft) — only the
    // fresh-send path picks them up.
    const attachments = editFromId ? [] : pendingAttachments;
    if ((!text.trim() && attachments.length === 0) || loading || streamingId) return;
    setError(null);
    setAttachmentError(null);

    // Handle "/image <description>" as an image generation request,
    // regardless of whether image mode is toggled on.
    if (text.trim().toLowerCase().startsWith(IMAGE_COMMAND_PREFIX)) {
      const prompt = stripImageCommand(text);
      if (!prompt) {
        setError("Add a description after /image, e.g. /image a red fox in snow");
        return;
      }
      await generateImage(prompt);
      return;
    }

    // Image mode is toggled on via the image icon — treat plain text
    // as an image prompt too, so the user doesn't have to type /image.
    if (imageMode) {
      await generateImage(text.trim());
      return;
    }

    // "/search <question>" forces this one turn onto the web-search-
    // capable Compound model regardless of which model is currently
    // selected in the picker — the picker itself is left untouched so
    // the next message goes back to whatever the user had chosen.
    const isSearchCommand = text.trim().toLowerCase().startsWith(SEARCH_COMMAND_PREFIX);
    const searchQuery = isSearchCommand
      ? text.trim().slice(SEARCH_COMMAND_PREFIX.length).trim()
      : null;
    if (isSearchCommand && !searchQuery) {
      setError("Add a question after /search, e.g. /search latest Next.js version");
      return;
    }

    const base = editFromId
      ? messages.slice(0, messages.findIndex((m) => m.id === editFromId))
      : messages;

    const userMsg: Message = {
      role: "user",
      content: (searchQuery ?? text).trim(),
      id: uid(),
      attachments: attachments.length > 0 ? attachments : undefined,
    };
    const newMessages = [...base, userMsg];
    setMessages(newMessages);
    setInput("");
    setPendingAttachments([]);
    setLoading(true);

    if (textareaRef.current) textareaRef.current.style.height = "auto";

    // If this turn includes images but the selected model can't see
    // images, the API route reroutes to a vision-capable model and
    // reports back which one via the SSE "model" event — see below.
    const apiModel = isSearchCommand ? WEB_SEARCH_MODEL_ID : selectedModel;

    // First message of a fresh chat: create the conversation row now
    // so both this message and the reply below have somewhere to land.
    // isNewConversation short-circuits the sidebar refresh below since
    // createConversation() already triggers it.
    let conversationId = activeConversationIdRef.current;
    let isNewConversation = false;
    if (!conversationId && sessionId) {
      conversationId = await history.createConversation(userMsg.content || "Image conversation", apiModel);
      if (conversationId) {
        isNewConversation = true;
        activeConversationIdRef.current = conversationId;
        setActiveConversationId(conversationId);
      }
    }
    if (conversationId) {
      history.saveMessage(conversationId, {
        role: "user",
        content: userMsg.content,
        attachments: userMsg.attachments,
      });
    }

    const assistantId = uid();
    const controller = new AbortController();
    abortControllerRef.current = controller;
    // Hoisted above the try block so the AbortError branch in catch
    // can still save whatever partial content/citations had streamed
    // in before the user hit Stop.
    let assistantContent = "";
    let citations: Citation[] | undefined;

    try {
      // Only the newest user message carries image parts — earlier
      // turns in history stay plain strings, matching how every
      // provider expects multi-turn vision context to be shaped.
      const apiMessages = newMessages.map(({ role, content }, i) => {
        const isLatest = i === newMessages.length - 1;
        if (isLatest && attachments.length > 0) {
          return {
            role,
            content: [
              ...(content ? [{ type: "text" as const, text: content }] : []),
              ...attachments.map((a) => ({
                type: "image_url" as const,
                image_url: { url: a.dataUrl },
              })),
            ],
          };
        }
        return { role, content };
      });

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: apiModel, messages: apiMessages }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }

      // Placeholder bubble the streamed deltas append into — added
      // once, then mutated via functional setState per chunk so React
      // only ever needs to diff one changed message, not the whole list.
      setMessages((prev) => [...prev, { role: "assistant", content: "", id: assistantId }]);
      setLoading(false);
      setStreamingId(assistantId);

      let streamError: string | null = null;

      for await (const event of readSSE(res.body)) {
        if (event.delta) {
          assistantContent += event.delta;
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, content: assistantContent } : m))
          );
        }
        if (event.citations?.length) {
          citations = event.citations;
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, citations } : m))
          );
        }
        if (event.error) {
          streamError = event.error;
        }
      }

      if (streamError && !assistantContent) {
        // Failed before any content arrived — drop the empty bubble
        // and surface the error banner instead, matching the old
        // non-streaming error UX.
        setMessages((prev) => prev.filter((m) => m.id !== assistantId));
        throw new Error(streamError);
      }

      if (conversationId && assistantContent) {
        history.saveMessage(conversationId, { role: "assistant", content: assistantContent, citations });
        if (!isNewConversation) history.refresh();
      }

      // In voice mode, speak the reply aloud automatically
      if (voiceModeOn && assistantContent) {
        speakText(assistantContent);
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        // User hit Stop — keep whatever streamed in so far as the
        // final message rather than treating it as a failure. Any
        // citations that had already arrived before the abort are
        // captured too via the closure over `citations` above.
        setMessages((prev) => {
          const partial = prev.find((m) => m.id === assistantId);
          if (partial && partial.content && conversationId) {
            history.saveMessage(conversationId, { role: "assistant", content: partial.content, citations });
          }
          return prev;
        });
      } else {
        setError((err as Error).message);
      }
    } finally {
      setLoading(false);
      setStreamingId(null);
      abortControllerRef.current = null;
    }
  };

  const stopGenerating = () => {
    abortControllerRef.current?.abort();
  };

  const retryLastResponse = () => {
    // Find the last user message and resend from there — drops the
    // assistant reply that followed it (and anything after, though
    // there normally isn't anything after the latest turn).
    const lastUserIndex = [...messages].reverse().findIndex((m) => m.role === "user");
    if (lastUserIndex === -1) return;
    const idx = messages.length - 1 - lastUserIndex;
    const lastUserMsg = messages[idx];
    sendMessage(lastUserMsg.content, lastUserMsg.id);
  };

  // ── Generate an image via Pollinations ───────────────────────
  const generateImage = async (prompt: string) => {
    if (!prompt.trim()) {
      setError("Add a description of the image you want.");
      return;
    }

    const imageModel =
      IMAGE_MODELS.find((m) => m.id === selectedImageModel) ?? IMAGE_MODELS[0];

    const userMsg: Message = { role: "user", content: `/image ${prompt}`, id: uid() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setError(null);

    let conversationId = activeConversationIdRef.current;
    let isNewConversation = false;
    if (!conversationId && sessionId) {
      conversationId = await history.createConversation(userMsg.content, selectedModel);
      if (conversationId) {
        isNewConversation = true;
        activeConversationIdRef.current = conversationId;
        setActiveConversationId(conversationId);
      }
    }
    if (conversationId) {
      history.saveMessage(conversationId, { role: "user", content: userMsg.content });
    }

    try {
      const res = await fetch("/api/image-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model: imageModel.id }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Image generation failed.");
      }

      const replyText = `Here's your image for: "${prompt}"`;
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: replyText,
          id: uid(),
          imageUrl: data.imageUrl,
          imageModelLabel: `${imageModel.emoji} ${imageModel.label}`,
        },
      ]);

      if (conversationId) {
        history.saveMessage(conversationId, {
          role: "assistant",
          content: replyText,
          imageUrl: data.imageUrl,
          imageModel: imageModel.id,
        });
        if (!isNewConversation) history.refresh();
      }
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

  const toggleImageMode = () => {
    setImageMode((prev) => !prev);
    setError(null);
  };

  // ── File attachments ──────────────────────────────────────────
  // Images become pendingAttachments (shown as thumbnails, sent as
  // image_url content parts). Text-like files get their content read
  // and appended straight into the composer as a fenced block — every
  // provider already handles plain text uniformly, so no separate
  // upload plumbing is needed for those.
  const processFiles = async (files: FileList | File[]) => {
    setAttachmentError(null);
    for (const file of Array.from(files)) {
      const kind = classifyFile(file);

      if (kind === "image") {
        if (file.size > MAX_IMAGE_BYTES) {
          setAttachmentError(`${file.name} is too large — images must be under 8MB.`);
          continue;
        }
        try {
          const dataUrl = await fileToDataUrl(file);
          setPendingAttachments((prev) => [...prev, { dataUrl, name: file.name }]);
        } catch {
          setAttachmentError(`Couldn't read ${file.name}.`);
        }
        continue;
      }

      if (kind === "text") {
        try {
          const text = await fileToText(file);
          setInput((prev) => prev + formatTextAttachment(file.name, text));
        } catch {
          setAttachmentError(`Couldn't read ${file.name}.`);
        }
        continue;
      }

      setAttachmentError(
        `${file.name}: only images and text-based files (.txt, .md, .csv, .json, code files) are supported right now.`
      );
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) processFiles(e.target.files);
    e.target.value = ""; // allow re-selecting the same file later
  };

  const removePendingAttachment = (index: number) => {
    setPendingAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const files = Array.from(e.clipboardData.files);
    if (files.length > 0) {
      e.preventDefault();
      processFiles(files);
    }
  };

  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingFile(false);
    if (e.dataTransfer.files?.length) processFiles(e.dataTransfer.files);
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Commands that filter the slash menu — "/" alone shows all of them,
  // "/im" narrows to /image, etc. Menu closes as soon as text no longer
  // looks like a command-in-progress (a space after the command, or
  // the value no longer starts with "/").
  const filteredSlashCommands = SLASH_COMMANDS.filter((c) =>
    c.command.startsWith(input.trim().toLowerCase())
  );

  const runSlashCommand = (cmd: SlashCommand) => {
    setSlashMenuOpen(false);
    if (cmd.action === "insert") {
      setInput(cmd.command + " ");
      if (cmd.command === IMAGE_COMMAND_PREFIX) setImageMode(true);
      textareaRef.current?.focus();
      return;
    }
    if (cmd.command === "/new") {
      startNewChat();
    } else if (cmd.command === "/clear") {
      clearChat();
    }
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (slashMenuOpen && filteredSlashCommands.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSlashHighlightIndex((i) => (i + 1) % filteredSlashCommands.length);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSlashHighlightIndex((i) => (i - 1 + filteredSlashCommands.length) % filteredSlashCommands.length);
        return;
      }
      if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        runSlashCommand(filteredSlashCommands[slashHighlightIndex]);
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setSlashMenuOpen(false);
        return;
      }
    }

    if (e.key === "Escape" && (loading || streamingId)) {
      e.preventDefault();
      stopGenerating();
      return;
    }

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

    // The slash menu only makes sense while the composer is a bare
    // "/..." token being typed — as soon as there's a space (the
    // command is complete and an argument is being typed) or the
    // text no longer starts with "/", close it.
    const trimmed = value.trimStart();
    const looksLikeCommandInProgress = trimmed.startsWith("/") && !trimmed.includes(" ");
    setSlashMenuOpen(looksLikeCommandInProgress && trimmed.length > 0);
    setSlashHighlightIndex(0);
  };

  const copyMessage = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    const idToDelete = activeConversationIdRef.current;
    setMessages([]);
    setError(null);
    setImageMode(false);
    setActiveConversationId(null);
    stopSpeaking();
    if (idToDelete) {
      history.deleteConversation(idToDelete);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="min-h-screen flex">
      <ChatSidebar
        conversations={history.conversations}
        loading={history.loading}
        activeId={activeConversationId}
        collapsed={sidebarCollapsed}
        onToggleCollapsed={() => setSidebarCollapsed((v) => !v)}
        onSelect={selectConversation}
        onNewChat={startNewChat}
        onRename={history.renameConversation}
        onTogglePinned={history.togglePinned}
        onDelete={(id) => {
          history.deleteConversation(id);
          if (id === activeConversationIdRef.current) startNewChat();
        }}
      />

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div className="sm:hidden fixed inset-0 z-40 flex">
          <div className="w-72 bg-surface flex flex-col">
            <ChatSidebar
              conversations={history.conversations}
              loading={history.loading}
              activeId={activeConversationId}
              collapsed={false}
              onToggleCollapsed={() => setMobileSidebarOpen(false)}
              onSelect={selectConversation}
              onNewChat={startNewChat}
              onRename={history.renameConversation}
              onTogglePinned={history.togglePinned}
              onDelete={(id) => {
                history.deleteConversation(id);
                if (id === activeConversationIdRef.current) startNewChat();
              }}
            />
          </div>
          <div className="flex-1 bg-surface-1" onClick={() => setMobileSidebarOpen(false)} />
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border bg-surface/50 backdrop-blur-xl sticky top-16 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="sm:hidden h-8 w-8 rounded-lg flex items-center justify-center text-ink-2 hover:text-ink hover:bg-surface-2 flex-shrink-0"
            aria-label="Open chat history"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div className="h-8 w-8 rounded-lg bg-brand-blue flex items-center justify-center">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="text-ink font-semibold text-sm leading-none">MG Labs AI</div>
            <div className="text-ink-muted text-xs mt-0.5 flex items-center gap-1.5">
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
                ? "bg-brand-blue/20 text-brand-blue border-brand-blue/40"
                : "text-ink-2 hover:text-ink hover:bg-surface-2 border-border"
            }`}
          >
            {voiceModeOn ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
            Voice
          </button>

          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            title={currentModel.description}
            className="bg-surface-2 border border-border rounded-lg px-3 py-1.5 text-xs text-ink max-w-[120px] sm:max-w-none"
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-ink-2 hover:text-ink hover:bg-surface-2 transition-colors border border-border"
            >
              <Trash2 className="h-3 w-3" /> Clear
            </button>
          )}
          <Link href="/signup" className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-brand-blue hover:text-ink hover:bg-surface-2 transition-colors border border-brand-blue/20">
            <Zap className="h-3 w-3" /> Get full access
          </Link>
        </div>
      </div>

      {/* ── Main chat area ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">

          {/* Loading a conversation from the sidebar */}
          {conversationLoading && (
            <div className="space-y-6">
              {[0, 1, 0].map((align, i) => (
                <div key={i} className={align ? "flex justify-end" : "flex justify-start"}>
                  <div className="h-16 w-2/3 max-w-sm rounded-2xl bg-surface-1 border border-border animate-pulse" />
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!conversationLoading && isEmpty && (
            <div className="text-center py-16">
              <div className="h-16 w-16 rounded-2xl bg-brand-blue/10 border border-border flex items-center justify-center mx-auto mb-6">
                <Bot className="h-8 w-8 text-brand-blue" />
              </div>
              <h1 className="text-3xl font-display font-bold text-ink mb-2">
                MG Labs AI
              </h1>
              <p className="text-ink-2 mb-2">
                Your free AI assistant — chat, voice, and image generation.
              </p>
              <p className="text-ink-muted text-sm mb-2">
                Currently using {currentModel.emoji} <span className="text-ink-2">{currentModel.label}</span> — {currentModel.description}
              </p>
              <p className="text-ink-muted text-xs mb-12">
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
                    className="group p-4 rounded-xl bg-surface-1 border border-border hover:border-brand-blue/40 hover:bg-surface-2 transition-all text-left"
                  >
                    <div className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-brand-blue flex-shrink-0 mt-0.5" />
                      <span className="text-ink-2 text-sm group-hover:text-ink transition-colors leading-relaxed">
                        {s.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {!conversationLoading && messages.map((msg, index) => {
            const isLastAssistant =
              msg.role === "assistant" && index === messages.length - 1 && !streamingId;
            const isStreamingThis = msg.id === streamingId;
            const isEditingThis = msg.id === editingMessageId;

            return (
            <div
              key={msg.id}
              className={`mb-6 ${msg.role === "user" ? "flex justify-end" : "flex justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="h-7 w-7 rounded-lg bg-brand-blue flex items-center justify-center flex-shrink-0 mr-3 mt-1">
                  <Bot className="h-3.5 w-3.5 text-white" />
                </div>
              )}

              <div className={isEditingThis ? "w-full max-w-[85%]" : "max-w-[85%] relative group"}>
              <div
                className={
                  isEditingThis
                    ? "bg-surface-1 border border-brand-blue/40 px-4 py-3 rounded-2xl"
                    : msg.role === "user"
                      ? "bg-brand-blue text-white hover:bg-brand-blue-hover px-4 py-3 rounded-2xl rounded-tr-sm"
                      : "bg-surface-1 border border-border px-5 py-4 rounded-2xl rounded-tl-sm"
                }
              >
                {msg.role === "user" ? (
                  isEditingThis ? (
                    <div className="space-y-2">
                      <textarea
                        autoFocus
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            const value = editingValue;
                            setEditingMessageId(null);
                            sendMessage(value, msg.id);
                          }
                          if (e.key === "Escape") setEditingMessageId(null);
                        }}
                        rows={2}
                        className="w-full bg-transparent text-ink text-sm resize-none outline-none leading-relaxed"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingMessageId(null)}
                          className="px-2.5 py-1 rounded-md text-xs text-ink-2 hover:text-ink hover:bg-surface-3"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            const value = editingValue;
                            setEditingMessageId(null);
                            sendMessage(value, msg.id);
                          }}
                          disabled={!editingValue.trim()}
                          className="px-2.5 py-1 rounded-md text-xs bg-brand-blue text-white hover:bg-brand-blue-hover hover:bg-brand-blue/80 disabled:opacity-40"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {msg.attachments.map((att, i) => (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              key={i}
                              src={att.dataUrl}
                              alt={att.name}
                              className="h-16 w-16 object-cover rounded-lg border border-border-strong"
                            />
                          ))}
                        </div>
                      )}
                      {msg.content && (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      )}
                    </div>
                  )
                ) : (
                  <div className="text-sm leading-relaxed space-y-0.5">
                    {renderMarkdown(msg.content)}
                    {isStreamingThis && (
                      <span className="inline-block w-1.5 h-4 bg-brand-blue align-middle ml-0.5 animate-pulse" />
                    )}
                    {msg.imageUrl && (
                      <div className="mt-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={msg.imageUrl}
                          alt="AI generated"
                          className="rounded-xl border border-border max-w-full"
                          loading="lazy"
                        />
                        {msg.imageModelLabel && (
                          <div className="mt-1.5 text-[11px] text-ink-muted">
                            Generated with {msg.imageModelLabel}
                          </div>
                        )}
                      </div>
                    )}
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <div className="flex items-center gap-1.5 mb-1.5 text-[11px] text-ink-muted">
                          <Globe className="h-3 w-3" />
                          Sources
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.citations.map((c, i) => (
                            <a
                              key={i}
                              href={c.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={c.url}
                              className="text-[11px] px-2 py-1 rounded-md bg-surface-2 border border-border text-ink-2 hover:text-brand-blue hover:border-brand-blue/40 transition-colors max-w-[180px] truncate"
                            >
                              {c.title || new URL(c.url).hostname.replace(/^www\./, "")}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Copy / speak / retry controls */}
                {msg.role === "assistant" && !msg.imageUrl && !isStreamingThis && msg.content && (
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    {isLastAssistant && (
                      <button
                        onClick={retryLastResponse}
                        className="p-1.5 rounded-md hover:bg-surface-3 text-ink-muted hover:text-ink-2"
                        title="Retry"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => speakText(msg.content)}
                      className="p-1.5 rounded-md hover:bg-surface-3 text-ink-muted hover:text-ink-2"
                      title="Read aloud"
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => copyMessage(msg.content, msg.id)}
                      className="p-1.5 rounded-md hover:bg-surface-3 text-ink-muted hover:text-ink-2"
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

              {/* Edit control for user messages — hidden while any
                  message is streaming/editing to avoid overlapping
                  edits mid-response. */}
              {msg.role === "user" && !isEditingThis && !loading && !streamingId && (
                <div className="flex justify-end mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      setEditingMessageId(msg.id);
                      setEditingValue(msg.content);
                    }}
                    className="p-1 rounded-md text-ink-muted hover:text-ink-2 hover:bg-surface-3 flex items-center gap-1 text-[11px]"
                    title="Edit and resend"
                  >
                    <Pencil className="h-3 w-3" /> Edit
                  </button>
                </div>
              )}
              </div>

              {msg.role === "user" && (
                <div className="h-7 w-7 rounded-lg bg-surface-2 border border-border flex items-center justify-center flex-shrink-0 ml-3 mt-1 text-xs font-semibold text-ink-2">
                  U
                </div>
              )}
            </div>
            );
          })}

          {/* Loading indicator — shown only before the streamed reply's
              placeholder bubble exists (see sendMessage: setLoading(false)
              fires as soon as the stream starts, so this and the blinking
              cursor never show at the same time). */}
          {loading && (
            <div className="flex justify-start mb-6">
              <div className="h-7 w-7 rounded-lg bg-brand-blue flex items-center justify-center flex-shrink-0 mr-3 mt-1">
                <Bot className="h-3.5 w-3.5 text-white" />
              </div>
              <div className="bg-surface-1 border border-border px-5 py-4 rounded-2xl rounded-tl-sm">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-brand-blue animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 rounded-full bg-brand-blue animate-bounce" style={{ animationDelay: "150ms" }} />
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
      <div
        className={`sticky bottom-0 bg-surface/80 backdrop-blur-xl border-t px-4 sm:px-6 py-4 transition-colors ${
          isDraggingFile ? "border-brand-blue/60 bg-brand-blue/[0.03]" : "border-border"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingFile(true);
        }}
        onDragLeave={() => setIsDraggingFile(false)}
        onDrop={handleDrop}
      >
        <div className="max-w-3xl mx-auto">

          {isDraggingFile && (
            <div className="mb-2 px-3 py-4 rounded-xl border-2 border-dashed border-brand-blue/50 bg-brand-blue/[0.06] text-center text-xs text-brand-blue">
              Drop images or text files to attach
            </div>
          )}

          {attachmentError && (
            <div className="mb-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-300 flex items-center justify-between">
              <span>{attachmentError}</span>
              <button onClick={() => setAttachmentError(null)}>
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          {/* Staged image attachments — cleared once the message sends */}
          {pendingAttachments.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2 px-1">
              {pendingAttachments.map((att, i) => (
                <div key={i} className="relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={att.dataUrl}
                    alt={att.name}
                    className="h-14 w-14 object-cover rounded-lg border border-border"
                  />
                  <button
                    onClick={() => removePendingAttachment(i)}
                    className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-surface-3 border border-border-strong flex items-center justify-center text-ink-2 hover:text-white hover:bg-red-500/80 transition-colors"
                    title="Remove"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Slash command menu — appears while the composer contains
              a bare "/..." token being typed. Positioned relative to
              the composer wrapper below via the outer relative div. */}
          <div className="relative">
            {slashMenuOpen && filteredSlashCommands.length > 0 && (
              <div className="absolute bottom-full mb-2 left-0 right-0 bg-surface-1 border border-border rounded-xl shadow-2xl overflow-hidden z-20">
                {filteredSlashCommands.map((cmd, i) => {
                  const Icon =
                    cmd.icon === "image" ? ImageIcon
                    : cmd.icon === "search" ? Globe
                    : cmd.icon === "clear" ? Trash2
                    : Sparkles;
                  return (
                    <button
                      key={cmd.command}
                      onMouseEnter={() => setSlashHighlightIndex(i)}
                      onClick={() => runSlashCommand(cmd)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                        i === slashHighlightIndex ? "bg-surface-3" : "hover:bg-surface-2"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5 text-brand-blue flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-ink">{cmd.command}</div>
                        <div className="text-[11px] text-ink-muted truncate">{cmd.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

          {/* Image mode bar — appears above the input when active,
              lets the user pick which free image model to use. */}
          {imageMode && (
            <div className="flex items-center gap-2 mb-2 px-1 animate-fade-up">
              <ImageIcon className="h-3.5 w-3.5 text-brand-blue flex-shrink-0" />
              <span className="text-xs text-ink-2 flex-shrink-0">Image mode</span>
              <select
                value={selectedImageModel}
                onChange={(e) => setSelectedImageModel(e.target.value)}
                title={
                  IMAGE_MODELS.find((m) => m.id === selectedImageModel)?.description
                }
                className="bg-surface-2 border border-border rounded-lg px-2 py-1 text-xs text-ink flex-1 min-w-0"
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
                className="h-6 w-6 rounded-md flex items-center justify-center flex-shrink-0 text-ink-muted hover:text-ink hover:bg-surface-2 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          <div className="flex items-end gap-3 bg-surface-1 border border-border rounded-2xl px-4 py-3 focus-within:border-brand-blue/50 transition-colors">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.txt,.md,.csv,.json,.log,.yml,.yaml,.xml,.html,.css,.js,.jsx,.ts,.tsx,.py,.rb,.go,.rs,.java,.c,.cpp,.cs,.php,.sql,.sh"
              onChange={handleFileInputChange}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={loading || !!streamingId}
              title="Attach a file"
              className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-surface-2 hover:bg-surface-3 border border-border text-ink-2 disabled:opacity-40 transition-all"
            >
              <Paperclip className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={handleMicClick}
              disabled={isTranscribing || loading || !!streamingId}
              title={isRecording ? "Stop recording" : "Speak your message"}
              className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                isRecording
                  ? "bg-red-500 animate-pulse"
                  : "bg-surface-2 hover:bg-surface-3 border border-border"
              } disabled:opacity-40`}
            >
              {isTranscribing ? (
                <Loader2 className="h-3.5 w-3.5 text-ink-2 animate-spin" />
              ) : isRecording ? (
                <Square className="h-3 w-3 text-white" fill="white" />
              ) : (
                <Mic className="h-3.5 w-3.5 text-ink-2" />
              )}
            </button>

            {/* Image icon — same treatment as the mic button. Tapping
                toggles image mode on/off, no /image typing required. */}
            <button
              onClick={toggleImageMode}
              disabled={loading || !!streamingId}
              title={imageMode ? "Exit image mode" : "Generate an image"}
              className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                imageMode
                  ? "bg-brand-blue/20 border border-brand-blue/40 text-brand-blue"
                  : "bg-surface-2 hover:bg-surface-3 border border-border text-ink-2"
              } disabled:opacity-40`}
            >
              <ImageIcon className="h-3.5 w-3.5" />
            </button>

            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              onBlur={() => {
                // Delay so a click on a menu item (which blurs the
                // textarea first) still registers before we close it.
                setTimeout(() => setSlashMenuOpen(false), 150);
              }}
              placeholder={
                isRecording
                  ? "Listening… tap the square to stop"
                  : imageMode
                    ? "Describe the image you want to create…"
                    : "Ask anything, or tap the image icon to generate art…"
              }
              rows={1}
              className="flex-1 bg-transparent text-ink text-sm placeholder-ink-muted resize-none outline-none leading-relaxed min-h-[24px] max-h-[200px]"
              disabled={loading || isRecording || !!streamingId}
            />

            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                title="Stop speaking"
                className="h-8 w-8 rounded-lg bg-brand-blue/20 border border-brand-blue/40 flex items-center justify-center flex-shrink-0"
              >
                <VolumeX className="h-3.5 w-3.5 text-brand-blue" />
              </button>
            )}

            {loading || streamingId ? (
              <button
                onClick={stopGenerating}
                title="Stop generating"
                className="h-8 w-8 rounded-lg bg-surface-2 hover:bg-red-500/20 border border-border hover:border-red-500/40 flex items-center justify-center flex-shrink-0 transition-all group/stop"
                aria-label="Stop generating"
              >
                <StopCircle className="h-3.5 w-3.5 text-ink-2 group-hover/stop:text-red-400" />
              </button>
            ) : (
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="h-8 w-8 rounded-lg bg-brand-blue hover:bg-brand-blue/80 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0 transition-all hover:scale-105 active:scale-95"
                aria-label="Send message"
              >
                {imageMode || input.trim().toLowerCase().startsWith(IMAGE_COMMAND_PREFIX) ? (
                  <ImageIcon className="h-3.5 w-3.5 text-white" />
                ) : (
                  <Send className="h-3.5 w-3.5 text-white" />
                )}
              </button>
            )}
          </div>
          </div>
          <div className="flex items-center justify-between mt-2 px-1">
            <p className="text-xs text-ink-muted">
              <kbd className="text-ink-muted bg-surface-2 px-1 py-0.5 rounded text-[10px] border border-border">Enter</kbd> to send · Tap 🎤 to talk · Type <code className="text-ink-muted">/</code> for commands
            </p>
            <Link href="/signup" className="text-xs text-brand-blue hover:text-ink transition-colors flex items-center gap-1">
              Unlock full platform <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
