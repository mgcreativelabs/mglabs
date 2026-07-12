import Link from "next/link";
import { ArrowRight, Bot, Zap, BookOpen, Rocket, Play, Sparkles, CheckCircle2, Video, Briefcase, Package } from "lucide-react";
import React from "react";
import { getPlatformStats, formatStatCountOrNull } from "@/lib/data/platform-stats";
import { Newsletter } from "@/components/sections/Newsletter";

// Revalidate once per hour — keeps stats fresh without a per-visit DB call.
export const revalidate = 3600;

export default async function Home() {
  const stats    = await getPlatformStats();
  const ctaLabel = formatStatCountOrNull(stats.learners, 20);

  return (
    <div className="min-h-screen bg-surface relative overflow-hidden w-full">

      {/* ═══════════════════════════
          HERO
      ═══════════════════════════ */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center w-full px-4 sm:px-6 text-center">

        {/* Platform pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 backdrop-blur-xl mb-8">
          <span className="flex h-2 w-2 rounded-full bg-brand-blue animate-pulse" />
          <span className="text-sm text-brand-blue font-medium">AI Builder Platform</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 max-w-5xl mx-auto leading-[1.05]">
          <span className="block text-ink">Build your first</span>
          <span className="block text-brand-blue">
            AI tool in 20 minutes.
          </span>
        </h1>

        <p className="text-ink-2 text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed">
          No experience needed. MG Labs takes you from your first AI experiment
          to a real, deployed product — step by step.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 w-full px-4">
          <Link
            href="/start"
            className="group px-8 py-4 bg-brand-blue text-white hover:bg-brand-blue-hover rounded-xl font-semibold hover:scale-[1.02] transition-all duration-200 flex items-center gap-3 w-full sm:w-auto justify-center text-lg"
          >
            Start Free AI Build
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/mg-ai"
            className="px-8 py-4 rounded-xl font-medium text-ink-2 border border-border hover:border-border-strong hover:text-ink hover:bg-surface-2 transition-all duration-200 w-full sm:w-auto flex items-center gap-2 justify-center"
          >
            <Bot className="w-5 h-5" />
            Try MG AI free
          </Link>
        </div>

        {/* Honest trust signals */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-sm text-ink-muted">
          {[
            "Free to start",
            "No credit card required",
            "No coding experience needed",
          ].map((item, i) => (
            <React.Fragment key={item}>
              {i > 0 && <div className="hidden sm:block w-px h-4 bg-surface-2" />}
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>{item}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════
          HOW IT WORKS
      ═══════════════════════════ */}
      <section className="relative z-10 py-32 px-4 sm:px-6 w-full">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-brand-blue text-sm font-semibold uppercase tracking-widest mb-3">
              How it works
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-ink">
              From zero to AI product in 3 stages
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                step: "01",
                icon: <Play className="w-6 h-6" />,
                colorClass: "text-brand-blue bg-brand-blue/10 border-brand-blue/20",
                ctaColor: "text-brand-blue",
                title: "Experiment with AI",
                desc: "Jump into our AI playground. No account needed. Build a mini AI chatbot in minutes and see exactly what's possible.",
                href: "/start",
                cta: "Start free →",
              },
              {
                step: "02",
                icon: <BookOpen className="w-6 h-6" />,
                colorClass: "text-indigo-500 bg-indigo-400/10 border-indigo-400/20",
                ctaColor: "text-indigo-500",
                title: "Learn how it works",
                desc: "5 free guided lessons — from 'what is AI' to building your first real logic system. No fluff. Just what you need to move forward.",
                href: "/learn",
                cta: "Start learning →",
              },
              {
                step: "03",
                icon: <Rocket className="w-6 h-6" />,
                colorClass: "text-green-400 bg-green-400/10 border-green-400/20",
                ctaColor: "text-green-400",
                title: "Build + launch your product",
                desc: "The Launch Program takes you from idea to a deployed AI product. Real. Live. Yours. With expert guidance the whole way.",
                href: "/pricing",
                cta: "See Launch Program →",
              },
            ].map((item) => (
              <Link
                key={item.step}
                href={item.href}
                className="group relative p-8 rounded-2xl bg-surface-2 border border-border hover:border-border-strong transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden"
              >
                {/* Watermark step number */}
                <div className="absolute top-4 right-5 text-7xl font-black text-ink/[0.04] select-none leading-none">
                  {item.step}
                </div>

                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-6 ${item.colorClass}`}>
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold text-ink mb-3">{item.title}</h3>
                <p className="text-ink-2 text-sm leading-relaxed flex-1 mb-6">{item.desc}</p>

                <div className={`text-sm font-semibold flex items-center gap-1.5 ${item.ctaColor} group-hover:gap-2.5 transition-all`}>
                  {item.cta}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════
          LAUNCH PROGRAM HIGHLIGHT
      ═══════════════════════════ */}
      <section className="relative z-10 py-16 px-4 sm:px-6 w-full">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-brand-blue/20 bg-brand-blue/5 p-10 md:p-14">

            {/* Top glow line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-brand-blue/30" />

            <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-14">

              {/* Left: copy */}
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-blue text-xs font-bold mb-5">
                  ⭐ Flagship Offer — Launch Program
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4 leading-tight">
                  Go from idea to deployed AI product in 4 weeks
                </h2>
                <p className="text-ink-2 leading-relaxed mb-7 max-w-xl">
                  You bring the idea. We guide you through every decision — building,
                  connecting AI APIs, deploying, and handing you a real working product you own.
                </p>
                <ul className="space-y-2.5 mb-8">
                  {[
                    "Done-with-you — we build it together, not for you",
                    "Your project deployed live with a real URL",
                    "Step-by-step structure, not just tutorials",
                    "WhatsApp access throughout your build",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-ink-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/pricing#launch"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-blue text-white hover:bg-brand-blue-hover rounded-xl font-semibold hover:scale-[1.02] transition-all"
                >
                  Apply for Launch Program — $500
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Right: price callout */}
              <div className="md:text-right flex-shrink-0">
                <div className="text-6xl md:text-7xl font-black text-ink mb-2">$500</div>
                <div className="text-ink-muted text-sm leading-relaxed">
                  One-time.<br />One project.<br />Real result.
                </div>
                <div className="mt-4 text-xs text-ink-muted line-through">
                  vs $3,000+ hiring a developer
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════
          PLATFORM FEATURES
      ═══════════════════════════ */}
      <section className="relative z-10 py-24 px-4 sm:px-6 w-full">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-ink-muted text-sm font-semibold uppercase tracking-widest mb-3">
              The platform
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-ink mb-4">
              Everything to build with AI
            </h2>
            <p className="text-ink-2 max-w-xl mx-auto">
              From your first prompt to a live product — everything you need is here.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                href: "/start",
                icon: <Rocket className="w-6 h-6" />,
                gradient: "from-brand-blue/20 to-brand-blue/5",
                iconColor: "text-brand-blue",
                title: "AI Builder",
                desc: "Build mini AI tools in minutes. Choose a type, customize the behavior, and test it live — no code required.",
              },
              {
                href: "/learn",
                icon: <BookOpen className="w-6 h-6" />,
                gradient: "from-indigo-500/15 to-indigo-500/5",
                iconColor: "text-indigo-500",
                title: "AI Lessons",
                desc: "Structured lessons from basics to real AI systems. A free 5-lesson foundation path is included for everyone.",
              },
              {
                href: "/prompt-library",
                icon: <Sparkles className="w-6 h-6" />,
                gradient: "from-yellow-500/20 to-yellow-500/5",
                iconColor: "text-yellow-400",
                title: "Prompt Library",
                desc: "Hundreds of tested prompts for coding, business, design, and automation. Use them. Remix them. Save them.",
              },
              {
                href: "/mg-ai",
                icon: <Bot className="w-6 h-6" />,
                gradient: "from-cyan-500/20 to-cyan-500/5",
                iconColor: "text-cyan-400",
                title: "MG AI",
                desc: "Your personal AI powered by Groq. Faster than most chatbots. Completely free. No account needed.",
              },
              {
                href: "/community",
                icon: <Zap className="w-6 h-6" />,
                gradient: "from-green-500/20 to-green-500/5",
                iconColor: "text-green-400",
                title: "Community",
                desc: "Connect with other AI builders. Share projects, get feedback, and move faster when you're not building alone.",
              },
              {
                href: "/pricing",
                icon: <ArrowRight className="w-6 h-6" />,
                gradient: "from-pink-500/20 to-pink-500/5",
                iconColor: "text-pink-400",
                title: "Launch Program",
                desc: "Ready to build something real? Our $500 program takes you from idea to deployed product with expert guidance.",
              },
            ].map((f) => (
              <Link
                key={f.title}
                href={f.href}
                className="group p-7 rounded-2xl bg-surface-2 border border-border hover:bg-surface-2 hover:border-border-strong transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-5 ${f.iconColor}`}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-ink mb-2 group-hover:text-brand-blue transition-colors">
                  {f.title}
                </h3>
                <p className="text-ink-muted text-sm leading-relaxed flex-1">{f.desc}</p>
                <div className="mt-5 flex items-center gap-1 text-xs text-ink-muted group-hover:text-brand-blue transition-colors">
                  Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════
          SERVICES PREVIEW
      ═══════════════════════════ */}
      <section className="relative z-10 py-24 px-4 sm:px-6 w-full">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-ink-muted text-sm font-semibold uppercase tracking-widest mb-3">
              Need it done for you?
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-ink mb-4">
              Hands-on services, when speed matters
            </h2>
            <p className="text-ink-2 max-w-xl mx-auto">
              Beyond the platform — content production, freelance work, and ready-made digital products.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Video className="w-6 h-6" />,
                gradient: "from-brand-blue/20 to-brand-blue/5",
                iconColor: "text-brand-blue",
                title: "AI Content & Video",
                desc: "High-converting short-form content — TikTok, Reels, YouTube Shorts, and AI-generated ads.",
              },
              {
                icon: <Briefcase className="w-6 h-6" />,
                gradient: "from-indigo-500/15 to-indigo-500/5",
                iconColor: "text-indigo-500",
                title: "Freelance Services",
                desc: "Custom video editing, copywriting, web builds, design, and virtual assistance.",
              },
              {
                icon: <Package className="w-6 h-6" />,
                gradient: "from-green-500/20 to-green-500/5",
                iconColor: "text-green-400",
                title: "Digital Products",
                desc: "Ready-to-use prompts, templates, Notion workspaces, Canva templates, and e-books.",
              },
            ].map((s) => (
              <Link
                key={s.title}
                href="/services"
                className="group p-7 rounded-2xl bg-surface-2 border border-border hover:bg-surface-2 hover:border-border-strong transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-5 ${s.iconColor}`}>
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold text-ink mb-2 group-hover:text-brand-blue transition-colors">
                  {s.title}
                </h3>
                <p className="text-ink-muted text-sm leading-relaxed flex-1">{s.desc}</p>
                <div className="mt-5 flex items-center gap-1 text-xs text-ink-muted group-hover:text-brand-blue transition-colors">
                  See services <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════
          FINAL CTA
      ═══════════════════════════ */}
      <section className="relative z-10 py-24 px-4 sm:px-6 w-full">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-ink mb-4">
            Your first AI product starts here.
          </h2>
          <p className="text-ink-2 text-lg mb-10 max-w-xl mx-auto">
            {ctaLabel
              ? `Join ${ctaLabel} builders already on MG Labs. Start free — no credit card, no experience needed.`
              : "Start free — no credit card, no experience needed. Build something real today."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/start"
              className="group px-8 py-4 bg-brand-blue text-white hover:bg-brand-blue-hover rounded-xl font-semibold hover:scale-[1.02] transition-all flex items-center gap-2 justify-center"
            >
              Start Free AI Build
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 rounded-xl font-medium text-ink-2 border border-border hover:border-border-strong hover:text-ink transition-all flex items-center gap-2 justify-center"
            >
              View pricing
            </Link>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
