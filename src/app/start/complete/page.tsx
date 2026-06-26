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

      {/* Subtle bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 via-surface to-surface pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-24 sm:py-32">

        {/* Celebration header */}
        <div className="text-center mb-16">
          <div className="text-5xl mb-6">🚀</div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-semibold">You built your first AI tool</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            You&apos;ve started.<br />
            <span className="text-gradient">You&apos;re not finished yet.</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-xl mx-auto leading-relaxed">
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
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-7 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
            <h2 className="text-gray-400 font-bold mb-5 flex items-center gap-2 text-sm uppercase tracking-wider">
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
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-400">
                  <XCircle className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Emotional pivot */}
        <div className="text-center mb-14">
          <div className="text-2xl font-bold text-white mb-3">
            Most people stop here.
          </div>
          <div className="text-gray-400 max-w-md mx-auto leading-relaxed">
            They built something, felt good about it, and then never turned it into anything real.
            Not because they couldn&apos;t — because they didn&apos;t know the next steps.
          </div>
        </div>

        {/* The two paths */}
        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          {/* Free path */}
          <div className="p-7 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex flex-col">
            <h3 className="text-white font-bold mb-2">Continue learning free</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
              Take the 5-lesson AI Builder Foundation Path. Learn how AI tools work,
              how to write better prompts, and what building a real product actually involves.
            </p>
            <Link
              href="/learn"
              className="block w-full py-3 px-4 rounded-xl font-medium text-sm text-gray-200 border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all text-center"
            >
              Start free lessons →
            </Link>
          </div>

          {/* Paid path — highlighted */}
          <div className="p-7 rounded-2xl bg-gradient-to-b from-brand-blue/20 to-brand-purple/10 border-2 border-brand-blue/40 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-brand-blue to-transparent" />
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-brand text-white">
                Recommended
              </span>
            </div>

            <h3 className="text-white font-bold mb-2 mt-3">Build a real AI product</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-5 flex-1">
              The Launch Program takes you from the idea you have right now to a deployed
              AI product with a real URL — in 4 weeks, with expert guidance every step.
            </p>
            <div className="mb-4">
              <span className="text-3xl font-black text-white">$500</span>
              <span className="text-gray-500 text-sm ml-2">per project</span>
            </div>
            <Link
              href="/pricing#launch"
              className="block w-full py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-brand text-white shadow-lg shadow-brand-blue/30 hover:scale-[1.01] transition-all text-center flex items-center justify-center gap-2"
            >
              Apply for Launch Program <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Final line */}
        <div className="text-center">
          <p className="text-gray-600 text-sm">
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
