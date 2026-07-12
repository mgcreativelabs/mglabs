import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "You built your first AI tool — Now what? | MG Labs",
  description:
    "You just built a real AI tool. Here's the honest gap between what you built and a real, deployed AI product.",
};

export default function CompletePage() {
  return (
    <div className="min-h-screen bg-surface relative overflow-hidden">

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-24 sm:py-32">

        {/* Celebration header */}
        <div className="text-center mb-16">
          <div className="text-5xl mb-6">🚀</div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-semibold">You built your first AI tool</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-ink mb-5 leading-tight">
            You&apos;ve started.<br />
            <span className="text-gradient">You&apos;re not finished yet.</span>
          </h1>
          <p className="text-ink-2 text-xl max-w-xl mx-auto leading-relaxed">
            What you built is real. But right now it only lives inside MG Labs.
            Here&apos;s the honest picture.
          </p>
        </div>

        {/* What you know vs what you still need */}
        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          <div className="p-7 rounded-2xl bg-green-500/5 border border-green-500/20">
            <h2 className="text-green-400 font-bold mb-5 flex items-center gap-2 text-sm uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              What you now know
            </h2>
            <ul className="space-y-3">
              {[
                "How AI tools are structured",
                "What system prompts are and how they work",
                "How to customize AI behavior",
                "What a real AI model response looks like",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-7 rounded-2xl bg-surface-2 border border-border">
            <h2 className="text-ink-2 font-bold mb-5 flex items-center gap-2 text-sm uppercase tracking-wider">
              <XCircle className="w-4 h-4" />
              What you still don&apos;t have
            </h2>
            <ul className="space-y-3">
              {[
                "A URL to share with anyone",
                "A deployed product that runs 24/7",
                "Your own branding and interface",
                "The ability to monetize what you built",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink-2">
                  <XCircle className="w-4 h-4 text-ink-muted flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Emotional pivot */}
        <div className="text-center mb-14">
          <div className="text-2xl font-bold text-ink mb-3">
            Most people stop here.
          </div>
          <div className="text-ink-2 max-w-md mx-auto leading-relaxed">
            They built something, felt good about it, and then never turned it into anything real.
            Not because they couldn&apos;t — because they didn&apos;t know the next steps.
          </div>
        </div>

        {/* The two paths */}
        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          {/* Free path */}
          <div className="p-7 rounded-2xl bg-surface-2 border border-border flex flex-col">
            <h3 className="text-ink font-bold mb-2">Continue learning free</h3>
            <p className="text-ink-2 text-sm leading-relaxed mb-5 flex-1">
              Take the 5-lesson AI Builder Foundation Path. Learn how AI tools work,
              how to write better prompts, and what building a real product actually involves.
            </p>
            <Link
              href="/learn"
              className="block w-full py-3 px-4 rounded-xl font-medium text-sm text-ink border border-border hover:bg-surface-2 hover:border-border-strong transition-all text-center"
            >
              Start free lessons →
            </Link>
          </div>

          {/* Paid path — highlighted */}
          <div className="p-7 rounded-2xl bg-brand-blue/5 border-2 border-brand-blue/30 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-brand-blue/40" />
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-blue text-white hover:bg-brand-blue-hover">
                Recommended
              </span>
            </div>

            <h3 className="text-ink font-bold mb-2 mt-3">Build a real AI product</h3>
            <p className="text-ink-2 text-sm leading-relaxed mb-5 flex-1">
              The Launch Program takes you from the idea you have right now to a deployed
              AI product with a real URL — in 4 weeks, with expert guidance every step.
            </p>
            <div className="mb-4">
              <span className="text-3xl font-black text-ink">$500</span>
              <span className="text-ink-muted text-sm ml-2">per project</span>
            </div>
            <Link
              href="/pricing#launch"
              className="block w-full py-3 px-4 rounded-xl font-semibold text-sm bg-brand-blue text-white hover:bg-brand-blue-hover hover:scale-[1.01] transition-all text-center flex items-center justify-center gap-2"
            >
              Apply for Launch Program <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Final line */}
        <div className="text-center">
          <p className="text-ink-muted text-sm">
            Not sure yet?{" "}
            <Link href="/learn" className="text-brand-blue hover:underline">
              Start with the free lessons
            </Link>{" "}
            and come back when you&apos;re ready.
          </p>
        </div>
      </div>
    </div>
  );
}
