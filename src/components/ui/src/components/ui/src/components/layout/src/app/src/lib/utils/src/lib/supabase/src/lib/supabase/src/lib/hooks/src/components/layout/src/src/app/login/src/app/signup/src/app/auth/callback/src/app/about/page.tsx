import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about MG Creative Labs — our mission to make AI education free and genuinely good.",
};

export default function AboutPage() {
  return (
    <div className="pt-16 min-h-screen">
      <section className="py-24 px-4 sm:px-6 max-w-4xl mx-auto text-center mesh-bg">
        <span className="inline-block px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-medium mb-5">Our story</span>
        <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
          We believe AI education <span className="text-gradient">should be free</span>.
        </h1>
        <p className="text-gray-400 text-xl leading-relaxed max-w-2xl mx-auto">
          MG Creative Labs was built by creators frustrated with bad AI courses, overwhelming jargon, and paywalled tutorials. We&apos;re fixing that — one lesson at a time.
        </p>
      </section>

      <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Our mission</h2>
            <p className="text-gray-400 leading-relaxed mb-4">The world is being reshaped by AI. The people who understand it will build the future. The people who don&apos;t will be left behind.</p>
            <p className="text-gray-400 leading-relaxed">Our mission is to make sure every student, freelancer, entrepreneur, and developer has access to world-class AI education — regardless of background or budget.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[{ n: "50K+", l: "Learners worldwide" }, { n: "1,200+", l: "Prompts published" }, { n: "80+", l: "Free tutorials" }, { n: "4.9★", l: "Average rating" }].map((s) => (
              <div key={s.l} className="glass rounded-2xl p-6 text-center border border-white/[0.06]">
                <div className="text-3xl font-bold text-white mb-1">{s.n}</div>
                <div className="text-xs text-gray-600">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-brand text-white font-semibold shadow-lg shadow-brand-blue/20 hover:scale-[1.02] transition-all">
            Join the mission <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}