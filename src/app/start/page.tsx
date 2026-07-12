import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Zap, Bot, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Build Your First AI Tool in 20 Minutes — MG Labs",
  description:
    "No experience needed. No code required. Build a real working AI tool in your browser in 20 minutes.",
};

export default function StartPage() {
  return (
    <div className="min-h-screen bg-surface relative overflow-hidden">

      {/* ── Hero ── */}
      <section className="relative z-10 pt-24 pb-16 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-8">
          <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-green-400 font-medium">Free — No account needed</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-ink mb-6 leading-tight">
          Build your first AI tool<br />
          <span className="text-gradient">in 20 minutes.</span>
        </h1>

        <p className="text-xl text-ink-2 max-w-2xl mx-auto mb-10 leading-relaxed">
          No experience needed. No code required. You&apos;ll build a real working AI tool
          inside your browser — and it will actually respond to you.
        </p>

        <Link
          href="/start/build"
          className="group inline-flex items-center gap-3 px-10 py-5 bg-brand-blue text-white hover:bg-brand-blue-hover rounded-2xl font-bold text-xl hover:scale-[1.02] transition-all"
        >
          Start Free AI Build
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 text-sm text-ink-muted">
          {[
            "Free forever",
            "No credit card",
            "Works in your browser",
          ].map((item, i) => (
            <div key={item} className="flex items-center gap-2">
              {i > 0 && <div className="hidden sm:block w-px h-4 bg-surface-2" />}
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ── What you'll build ── */}
      <section className="relative z-10 py-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-ink mb-3">What you&apos;ll do in the next 20 minutes</h2>
          <p className="text-ink-2">Four steps. Real result.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              step: "1",
              icon: <Lightbulb className="w-5 h-5" />,
              color: "text-brand-blue bg-brand-blue/10 border-brand-blue/20",
              title: "Choose your AI type",
              desc: "Pick what kind of AI tool you want to build.",
            },
            {
              step: "2",
              icon: <Zap className="w-5 h-5" />,
              color: "text-indigo-500 bg-indigo-400/10 border-indigo-400/20",
              title: "Customize its behavior",
              desc: "Define what your AI does and how it responds.",
            },
            {
              step: "3",
              icon: <Bot className="w-5 h-5" />,
              color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
              title: "Talk to your AI",
              desc: "Test it live — powered by a real AI model.",
            },
            {
              step: "4",
              icon: <ArrowRight className="w-5 h-5" />,
              color: "text-green-400 bg-green-400/10 border-green-400/20",
              title: "See what you built",
              desc: "Understand what you made and what&apos;s next.",
            },
          ].map((s) => (
            <div key={s.step} className="p-6 rounded-2xl bg-surface-2 border border-border flex flex-col">
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${s.color}`}>
                {s.icon}
              </div>
              <div className="text-xs text-ink-muted font-bold uppercase tracking-widest mb-2">
                Step {s.step}
              </div>
              <h3 className="text-ink font-semibold mb-1.5">{s.title}</h3>
              <p className="text-ink-muted text-sm leading-relaxed flex-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Time estimate ── */}
      <section className="relative z-10 py-8 px-4 sm:px-6 max-w-2xl mx-auto text-center pb-20">
        <div className="inline-flex items-center gap-2 text-ink-muted text-sm mb-6">
          <Clock className="w-4 h-4" />
          Estimated time: 15–20 minutes
        </div>
        <div className="block" />
        <Link
          href="/start/build"
          className="group inline-flex items-center gap-2 px-8 py-4 bg-brand-blue text-white hover:bg-brand-blue-hover rounded-xl font-semibold hover:scale-[1.02] transition-all"
        >
          Let&apos;s build it →
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>
    </div>
  );
}
