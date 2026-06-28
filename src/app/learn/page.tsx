import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, CheckCircle2, Lock } from "lucide-react";
import { lessons } from "@/lib/data/lessons";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "AI Builder Foundation Path — Free Lessons | MG Labs",
  description:
    "5 free lessons that take you from zero to understanding how AI products actually work. No fluff, no filler.",
};

export default function LearnPage() {
  const totalTime = lessons.reduce((acc, l) => {
    const mins = parseInt(l.duration);
    return acc + mins;
  }, 0);

  return (
    <div className="min-h-screen bg-surface">

      {/* ── Header ── */}
      <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        <Badge variant="success" className="mb-5">5 free lessons</Badge>
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-5 leading-tight">
          AI Builder<br />
          <span className="text-gradient">Foundation Path</span>
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          5 lessons. {totalTime} minutes. Everything you need to understand how AI products
          actually work — from concept to your first working chatbot logic.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
          {[
            `${totalTime} min total`,
            "Free forever",
            "No account needed",
          ].map((item, i) => (
            <div key={item} className="flex items-center gap-2">
              {i > 0 && <div className="hidden sm:block w-px h-4 bg-white/10" />}
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ── What you'll know after ── */}
      <section className="py-6 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="p-6 rounded-2xl bg-brand-blue/5 border border-brand-blue/20 mb-10">
          <p className="text-brand-blue text-xs font-bold uppercase tracking-wider mb-3">
            After these 5 lessons you will understand
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "How every AI app is structured under the hood",
              "What large language models actually do",
              "How to write system prompts that define AI behavior",
              "How to improve AI responses through iteration",
              "What separates an AI experiment from a real product",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-sm text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* ── Lesson cards ── */}
        <div className="space-y-4 mb-16">
          {lessons.map((lesson, index) => (
            <Link
              key={lesson.slug}
             href={lesson.wall ? "/pricing#launch" : `/learn/${lesson.slug}`}
              className={`group block p-6 rounded-2xl border transition-all duration-200 ${
                lesson.wall
                  ? "bg-white/[0.02] border-white/[0.05] cursor-default"
                  : "bg-white/[0.03] border-white/[0.07] hover:border-brand-blue/40 hover:bg-brand-blue/5"
              }`}
            >
              <div className="flex items-start gap-5">
                {/* Number */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center font-bold text-lg transition-colors ${
                  lesson.wall
                    ? "border-white/[0.07] text-gray-600 bg-white/[0.02]"
                    : "border-brand-blue/30 text-brand-blue bg-brand-blue/10 group-hover:bg-brand-blue/20"
                }`}>
                  {String(lesson.number).padStart(2, "0")}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className={`font-semibold text-lg ${lesson.wall ? "text-gray-500" : "text-white group-hover:text-brand-blue transition-colors"}`}>
                      {lesson.title}
                    </h3>
                    {lesson.wall && (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-600">
                        <Lock className="w-3 h-3" />
                        Wall
                      </span>
                    )}
                    {index === 0 && (
                      <Badge variant="success" size="sm">Start here</Badge>
                    )}
                  </div>
                  <p className={`text-sm leading-relaxed ${lesson.wall ? "text-gray-600" : "text-gray-400"}`}>
                    {lesson.tagline}
                  </p>
                  <div className="flex items-center gap-3 mt-2.5">
                    <span className="flex items-center gap-1.5 text-xs text-gray-600">
                      <Clock className="w-3 h-3" />
                      {lesson.duration}
                    </span>
                    <span className="text-xs text-gray-700">·</span>
                    <span className="text-xs text-gray-600">{lesson.difficulty}</span>
                  </div>
                </div>

                {/* Arrow */}
                {!lesson.wall && (
                  <ArrowRight className="flex-shrink-0 w-5 h-5 text-gray-600 group-hover:text-brand-blue group-hover:translate-x-1 transition-all mt-1" />
                )}
              </div>

              {/* Wall message */}
              {lesson.wall && (
                <div className="mt-4 ml-17 pl-4 border-l-2 border-white/[0.06]">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    This lesson ends at the gap between experimenting and deploying.
                    Completing it opens the path to the{" "}
                    <Link href="/pricing#launch" className="text-brand-blue hover:underline">
                      Launch Program →
                    </Link>
                  </p>
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* ── After lessons CTA ── */}
        <div className="rounded-2xl bg-gradient-to-br from-brand-blue/15 via-surface-1 to-brand-purple/10 border border-brand-blue/30 p-10 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-brand-blue to-transparent" />
          <h2 className="text-2xl font-bold text-white mb-3">
            Ready to build something real?
          </h2>
          <p className="text-gray-400 text-sm max-w-md mx-auto mb-6 leading-relaxed">
            These lessons give you the foundation. The Launch Program gives you the result —
            a deployed AI product you own and can share.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/learn/${lessons[0].slug}`}
              className="px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-brand text-white shadow-lg shadow-brand-blue/30 hover:scale-[1.02] transition-all flex items-center gap-2 justify-center"
            >
              Start Lesson 1 <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing#launch"
              className="px-6 py-3 rounded-xl font-medium text-sm text-gray-300 border border-white/10 hover:border-white/20 hover:text-white transition-all text-center"
            >
              See Launch Program — $500
            </Link>
          </div>
        </div>
      </section>

      <div className="pb-20" />
    </div>
  );
}
