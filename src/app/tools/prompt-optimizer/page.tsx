"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles, ArrowRight, Loader2, Copy, CheckCircle2,
  TrendingUp, Zap, AlertCircle
} from "lucide-react";
import { Newsletter } from "@/components/sections/Newsletter";

// ─── Types ────────────────────────────────────────────────────────────
interface OptimizeResult {
  original: string;
  optimized: string;
  improvements: string[];
  score_before: number;
  score_after: number;
}

// ─── Score bar ────────────────────────────────────────────────────────
function ScoreBar({ score, label }: { score: number; label: string }) {
  const pct = (score / 10) * 100;
  const color =
    score <= 3 ? "bg-red-500" : score <= 6 ? "bg-yellow-500" : "bg-green-500";
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-gray-500">{label}</span>
        <span className="text-sm font-bold text-white">{score}/10</span>
      </div>
      <div className="h-2 w-full bg-surface-3 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ─── Copy button ──────────────────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
    >
      {copied
        ? <><CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> Copied</>
        : <><Copy className="w-3.5 h-3.5" /> Copy</>
      }
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────
export default function PromptOptimizerPage() {
  const [prompt, setPrompt]     = useState("");
  const [result, setResult]     = useState<OptimizeResult | null>(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  async function handleOptimize() {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/tools-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "prompt-optimizer",
          userMessage: `Optimize this prompt:\n\n${prompt.trim()}`,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      if (data.result) {
        setResult(data.result as OptimizeResult);
      } else {
        setError("Couldn't parse the AI response. Please try again.");
      }
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  const EXAMPLES = [
    "Write me a blog post about AI.",
    "Give me marketing ideas for my business.",
    "Help me write an email to my team about the new project deadline.",
    "Create a product description for my online store.",
  ];

  return (
    <div className="min-h-screen bg-surface">

      {/* ── Header ── */}
      <section className="pt-24 pb-12 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 mb-6">
          <Sparkles className="w-4 h-4 text-brand-blue" />
          <span className="text-sm text-brand-blue font-medium">Free AI Tool</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
          AI Prompt Optimizer
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
          Paste any prompt. Get a better version instantly — with a clear explanation
          of exactly what changed and why.
        </p>
      </section>

      {/* ── Tool ── */}
      <section className="px-4 sm:px-6 max-w-4xl mx-auto pb-16">

        {/* Input area */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-6 mb-5">
          <label className="block text-sm font-semibold text-white mb-3">
            Your prompt
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Paste any prompt here — ChatGPT, Claude, Gemini, or any AI tool..."
            rows={5}
            className="w-full bg-surface-1 border border-white/[0.08] rounded-xl p-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-blue/50 transition-colors resize-none leading-relaxed"
          />

          {/* Examples */}
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-xs text-gray-600">Try an example:</span>
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => setPrompt(ex)}
                className="text-xs px-2.5 py-1 rounded-lg bg-surface-3 border border-white/[0.06] text-gray-500 hover:text-white hover:border-brand-blue/30 transition-all"
              >
                {ex.length > 40 ? ex.slice(0, 38) + "…" : ex}
              </button>
            ))}
          </div>

          {/* Submit */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-gray-600">
              {prompt.length} characters
            </span>
            <button
              onClick={handleOptimize}
              disabled={!prompt.trim() || loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-brand text-white rounded-xl font-semibold text-sm hover:scale-[1.02] transition-all shadow-lg shadow-brand-blue/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Optimizing...</>
              ) : (
                <><Sparkles className="w-4 h-4" /> Optimize Prompt</>
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-5">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-5 animate-fade-up">

            {/* Score comparison */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <ScoreBar score={result.score_before} label="Before" />
              </div>
              <div className="p-5 rounded-2xl bg-green-500/5 border border-green-500/20">
                <ScoreBar score={result.score_after} label="After" />
                {result.score_after > result.score_before && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-green-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                    +{result.score_after - result.score_before} points improvement
                  </div>
                )}
              </div>
            </div>

            {/* Side by side prompts */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Original</span>
                  <CopyButton text={result.original} />
                </div>
                <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">{result.original}</p>
              </div>
              <div className="p-5 rounded-2xl bg-brand-blue/5 border border-brand-blue/20 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-brand-blue/50" />
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">Optimized</span>
                  <CopyButton text={result.optimized} />
                </div>
                <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">{result.optimized}</p>
              </div>
            </div>

            {/* What changed */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-brand-blue" />
                What changed and why
              </h3>
              <ul className="space-y-3">
                {result.improvements.map((imp, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-blue text-xs flex items-center justify-center font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-gray-300 text-sm leading-relaxed">{imp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA after result */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 border border-brand-blue/20 text-center">
              <h3 className="text-white font-bold mb-2">
                Want to learn prompt engineering properly?
              </h3>
              <p className="text-gray-400 text-sm mb-4 max-w-sm mx-auto">
                The Foundation Path covers prompts in depth — from basics to building
                AI tools that work reliably.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/learn/what-is-prompt-engineering"
                  className="px-5 py-2.5 rounded-xl font-medium text-sm bg-gradient-brand text-white hover:scale-[1.02] transition-all flex items-center gap-2 justify-center"
                >
                  Read the guide <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/learn"
                  className="px-5 py-2.5 rounded-xl font-medium text-sm text-gray-300 border border-white/10 hover:border-white/20 hover:text-white transition-all text-center"
                >
                  Free lesson path
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      <Newsletter />
    </div>
  );
}
