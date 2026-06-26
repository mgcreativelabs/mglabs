"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Lightbulb, ArrowRight, Loader2, Lock,
  Clock, TrendingUp, AlertCircle, Zap
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────
interface ProjectIdea {
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate";
  build_time: string;
  income_potential: string;
  first_step: string;
}

interface IdeasResult {
  ideas: ProjectIdea[];
}

// ─── Idea card ────────────────────────────────────────────────────────
function IdeaCard({
  idea,
  index,
  locked,
}: {
  idea: ProjectIdea;
  index: number;
  locked: boolean;
}) {
  return (
    <div className={`relative rounded-2xl border p-6 transition-all ${
      locked
        ? "border-white/[0.05] bg-white/[0.01]"
        : "border-white/[0.08] bg-white/[0.03] hover:border-brand-blue/30"
    }`}>
      {/* Lock overlay */}
      {locked && (
        <div className="absolute inset-0 rounded-2xl backdrop-blur-[2px] bg-surface/60 flex flex-col items-center justify-center z-10 gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-2 border border-white/10 flex items-center justify-center">
            <Lock className="w-5 h-5 text-gray-500" />
          </div>
          <p className="text-gray-500 text-sm text-center max-w-[200px] leading-snug">
            Want us to help you build this?
          </p>
          <Link
            href="/pricing#launch"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-brand text-white hover:scale-[1.02] transition-all"
          >
            Join $500 Launch Program →
          </Link>
        </div>
      )}

      {/* Card content */}
      <div className={locked ? "blur-sm select-none" : ""}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue text-xs font-bold">
              {index + 1}
            </div>
            <h3 className="font-bold text-white">{idea.title}</h3>
          </div>
          <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-md font-medium ${
            idea.difficulty === "Beginner"
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
          }`}>
            {idea.difficulty}
          </span>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-4">{idea.description}</p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Clock className="w-3.5 h-3.5 text-gray-600" />
            {idea.build_time}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <TrendingUp className="w-3.5 h-3.5 text-gray-600" />
            {idea.income_potential}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-brand-blue/5 border border-brand-blue/10">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">
            First step
          </p>
          <p className="text-xs text-gray-300 leading-relaxed">{idea.first_step}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────
export default function ProjectIdeasPage() {
  const [interest, setInterest]     = useState("");
  const [skillLevel, setSkillLevel] = useState("Beginner");
  const [goal, setGoal]             = useState("");
  const [result, setResult]         = useState<IdeasResult | null>(null);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");

  async function handleGenerate() {
    if (!interest.trim() || loading) return;
    setLoading(true);
    setError("");
    setResult(null);

    const userMessage = [
      `Interest area: ${interest.trim()}`,
      `Skill level: ${skillLevel}`,
      goal.trim() ? `Goal: ${goal.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("/api/tools-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: "project-ideas", userMessage }),
      });

      const data = await res.json();

      if (data.error) { setError(data.error); return; }
      if (data.result?.ideas) {
        setResult(data.result as IdeasResult);
      } else {
        setError("Couldn't generate ideas. Please try again.");
      }
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  const INTEREST_EXAMPLES = [
    "fitness & health", "restaurants & food", "education",
    "e-commerce", "real estate", "finance", "travel",
  ];

  return (
    <div className="min-h-screen bg-surface">

      {/* ── Header ── */}
      <section className="pt-24 pb-12 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple/10 border border-brand-purple/20 mb-6">
          <Lightbulb className="w-4 h-4 text-brand-purple" />
          <span className="text-sm text-brand-purple font-medium">Free AI Tool</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
          AI Project Idea Generator
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
          Tell us what you&apos;re interested in and your skill level.
          Get 5 AI project ideas you can actually build.
        </p>
      </section>

      {/* ── Generator form ── */}
      <section className="px-4 sm:px-6 max-w-4xl mx-auto pb-16">
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-6 mb-6">
          <div className="grid sm:grid-cols-2 gap-5 mb-5">

            {/* Interest */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-white mb-2">
                What are you interested in? *
              </label>
              <input
                type="text"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                placeholder="e.g. fitness, restaurants, real estate, education..."
                className="w-full bg-surface-1 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-blue/50 transition-colors"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {INTEREST_EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => setInterest(ex)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-surface-3 border border-white/[0.06] text-gray-500 hover:text-white hover:border-brand-purple/30 transition-all"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            {/* Skill level */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Your skill level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Beginner", "Intermediate", "Advanced"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSkillLevel(level)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      skillLevel === level
                        ? "bg-brand-purple/20 border-brand-purple/50 text-white"
                        : "bg-white/[0.02] border-white/[0.07] text-gray-500 hover:text-gray-300 hover:border-white/20"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Goal */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Your goal <span className="text-gray-600 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g. make money, build a portfolio, learn..."
                className="w-full bg-surface-1 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-blue/50 transition-colors"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!interest.trim() || loading}
            className="w-full sm:w-auto px-8 py-3 bg-gradient-brand text-white rounded-xl font-semibold text-sm hover:scale-[1.02] transition-all shadow-lg shadow-brand-blue/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 flex items-center gap-2 justify-center"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Generating ideas...</>
            ) : (
              <><Zap className="w-4 h-4" /> Generate My AI Project Ideas</>
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-6">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Results */}
        {result?.ideas && (
          <div className="animate-fade-up">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-white">
                Your 5 AI project ideas
              </h2>
              <span className="text-xs text-gray-600">
                First 3 free · Last 2 with Launch Program
              </span>
            </div>

            <div className="space-y-4">
              {result.ideas.map((idea, i) => (
                <IdeaCard
                  key={i}
                  idea={idea}
                  index={i}
                  locked={i >= 3}
                />
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-8 p-8 rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 border border-brand-blue/20 text-center">
              <h3 className="text-xl font-bold text-white mb-3">
                Found one you want to build?
              </h3>
              <p className="text-gray-400 text-sm max-w-md mx-auto mb-5 leading-relaxed">
                The Launch Program guides you from this idea list to a deployed,
                working AI product — in 4 weeks with expert support.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/pricing#launch"
                  className="px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-brand text-white shadow-lg shadow-brand-blue/30 hover:scale-[1.02] transition-all flex items-center gap-2 justify-center"
                >
                  Apply for Launch Program — $500
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/start"
                  className="px-6 py-3 rounded-xl font-medium text-sm text-gray-300 border border-white/10 hover:border-white/20 hover:text-white transition-all text-center"
                >
                  Try the free builder first
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
