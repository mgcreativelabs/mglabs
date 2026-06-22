import Link from "next/link";
import { ArrowRight, Bot } from "lucide-react";
import React from "react";
import { getPlatformStats, formatStatCountOrNull } from "@/lib/data/platform-stats";
import { Newsletter } from "@/components/sections/Newsletter";

// Real counts are fetched from Supabase at request time but cached for an
// hour — keeps the homepage fast (no per-visit DB round trip) while making
// sure numbers stay truthful as the platform grows. Update this value if
// you want fresher (or staler) numbers.
export const revalidate = 3600;

function buildHeroStats(stats: { learners: number; prompts: number }) {
  const learnersLabel = formatStatCountOrNull(stats.learners, 10);
  const promptsLabel = formatStatCountOrNull(stats.prompts, 10);

  const dynamic: { n: string; label: string }[] = [];
  if (learnersLabel) dynamic.push({ n: learnersLabel, label: "Learners" });
  if (promptsLabel) dynamic.push({ n: promptsLabel, label: "AI Prompts" });

  // Evergreen, always-true badges — used to fill out the row when real
  // numbers aren't yet meaningful to show, instead of showing literal
  // zeros or fabricated figures.
  const evergreen = [
    { n: "Free", label: "To start" },
    { n: "All levels", label: "Beginner to pro" },
  ];

  return [...dynamic, ...evergreen].slice(0, 3);
}

function buildFeatures(promptsCount: number, communityCount: number) {
  const promptsLabel = formatStatCountOrNull(promptsCount, 10);
  const communityLabel = formatStatCountOrNull(communityCount, 20);

  return [
    {
      href: "/ai-learning-hub",
      gradient: "from-blue-500/30 to-blue-600/30",
      iconColor: "text-blue-400",
      title: "AI Learning Hub",
      desc: "Structured courses on AI fundamentals, GPT-4, Claude, Gemini, and the latest models.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      href: "/prompt-library",
      gradient: "from-purple-500/30 to-purple-600/30",
      iconColor: "text-purple-400",
      title: "Prompt Library",
      desc: promptsLabel
        ? `${promptsLabel} hand-crafted prompts for writing, coding, business, and creativity.`
        : "Hand-crafted prompts for writing, coding, business, and creativity. New prompts added every week.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    {
      href: "/ai-coding-academy",
      gradient: "from-cyan-500/30 to-cyan-600/30",
      iconColor: "text-cyan-400",
      title: "AI Coding Academy",
      desc: "Build real apps with AI. Learn Cursor, Copilot, v0, Bolt, and pair-programming.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      href: "/ai-design-academy",
      gradient: "from-pink-500/30 to-pink-600/30",
      iconColor: "text-pink-400",
      title: "AI Design Academy",
      desc: "Master Midjourney, DALL-E, Stable Diffusion, and Figma AI without a degree.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      href: "/ai-learning-hub",
      gradient: "from-yellow-500/30 to-orange-600/30",
      iconColor: "text-yellow-400",
      title: "Automation",
      desc: "Build n8n, Zapier, and Make workflows to reclaim hours every week.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      href: "/community",
      gradient: "from-green-500/30 to-teal-600/30",
      iconColor: "text-green-400",
      title: "Community",
      desc: communityLabel
        ? `Connect with ${communityLabel} AI creators. Share projects and grow together.`
        : "Connect with AI creators. Share projects and grow together.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];
}

export default async function Home() {
  const stats = await getPlatformStats();
  const heroStats = buildHeroStats(stats);
  const features = buildFeatures(stats.prompts, stats.learners);
  const ctaLabel = formatStatCountOrNull(stats.learners, 20);

  return (
    /*
      FIX: Changed <main> → <div> here.
      layout.tsx already wraps {children} in <main className="pt-16">.
      Having <main> inside <main> is invalid HTML and can cause
      browsers to produce unexpected layout behaviour.
    */
    <div className="min-h-screen bg-slate-950 relative overflow-hidden w-full">

      {/* ── Background ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-slate-950 to-purple-900/60 w-full" />
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] w-full" />

      {/* ═══════════════════════════════════════
          HERO — perfectly centered
      ═══════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center w-full px-4 sm:px-6 text-center">

        {/* Eyebrow pill */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl mb-8">
          <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-sm text-gray-200 font-medium">AI Education Platform · 2026</span>
        </div>

        {/* Headline */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6 max-w-5xl mx-auto">
          <span className="block text-white mb-2">Master AI.</span>
          <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
            Build the future.
          </span>
        </h1>

        <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed px-4">
          The #1 platform to learn prompt engineering, AI coding, AI design, and automation.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 w-full px-4">
          <Link
            href="/signup"
            className="group px-10 py-5 bg-white text-slate-950 rounded-full font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-3 shadow-2xl shadow-blue-500/30 w-full sm:w-auto justify-center"
          >
            <span>Start learning free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/prompt-library"
            className="px-10 py-5 rounded-full font-medium text-white border-2 border-white/30 hover:bg-white/10 transition-all duration-300 w-full sm:w-auto text-center"
          >
            Browse prompts
          </Link>
        </div>

        {/* MG AI banner */}
        <Link
          href="/mg-ai"
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 hover:bg-purple-500/30 transition-colors mb-16 text-sm font-medium"
        >
          <Bot className="w-4 h-4" />
          Try MG Labs AI — Free AI Chat, no account needed
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 text-sm w-full">
          {heroStats.map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 && <div className="hidden sm:block w-px h-16 bg-white/20" />}
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-1">{s.n}</div>
                <div className="text-gray-400">{s.label}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURES — centered grid
      ═══════════════════════════════════════ */}
      <section className="relative z-10 py-40 px-4 sm:px-6 w-full">
        <div className="w-full max-w-7xl mx-auto">

          {/* Section header */}
          <div className="text-center mb-20 w-full">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              One platform. Every AI skill.
            </h2>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Whether you want to write better, code faster, design smarter, or automate everything.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <Link
                key={f.title}
                href={f.href}
                className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-6 ${f.iconColor}`}>
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {f.title}
                </h3>
                <p className="text-gray-400 leading-relaxed flex-1">{f.desc}</p>
                <div className="mt-4 flex items-center gap-1.5 text-sm text-gray-500 group-hover:text-blue-400 transition-colors">
                  Learn more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-4 sm:px-6 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 p-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to master AI?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
              {ctaLabel
                ? `Join ${ctaLabel} creators who are already using AI to work smarter and build faster.`
                : "Join the creators already using AI to work smarter and build faster."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="px-8 py-4 bg-white text-slate-950 rounded-full font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center"
              >
                Get started free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/mg-ai"
                className="px-8 py-4 rounded-full font-medium text-white border-2 border-white/30 hover:bg-white/10 transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <Bot className="w-4 h-4" /> Try free AI chat
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />

    </div>
  );
}
