// =============================================
// ABOUT PAGE — src/app/about/page.tsx
// =============================================
import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Target, Heart, Zap, Users, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about MG Creative Labs — our mission, values, and the team building the future of AI education.",
};

const values = [
  {
    icon: Target,
    title: "Clarity over complexity",
    description: "We take the hardest AI concepts and make them genuinely understandable. No gatekeeping, no fluff.",
  },
  {
    icon: Heart,
    title: "Practical over theoretical",
    description: "Every lesson ends with something you can use today. We measure success by what you can build, not what you can recite.",
  },
  {
    icon: Zap,
    title: "Fast over perfect",
    description: "AI moves fast. Our content moves fast. We ship new tutorials weekly so you're always learning what matters now.",
  },
  {
    icon: Users,
    title: "Community over isolation",
    description: "Learning in public, helping each other, and building together is how we all grow faster.",
  },
];

const timeline = [
  { year: "2024", event: "MG Creative Labs founded with a simple idea: AI education should be free and actually good." },
  { year: "Q1 2025", event: "Launched the Prompt Library with 500 hand-crafted prompts. 10,000 users in 30 days." },
  { year: "Q2 2025", event: "AI Coding Academy goes live. Waitlist of 5,000 before launch day." },
  { year: "Q3 2025", event: "Community platform launched. 50,000+ members and growing." },
  { year: "2026", event: "Mobile app, AI Academy, and SaaS products on the roadmap." },
];

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 px-4 sm:px-6 max-w-4xl mx-auto text-center mesh-bg">
        <Badge variant="blue" className="mb-5">Our story</Badge>
        <h1 className="text-5xl sm:text-6xl font-display font-bold text-white mb-6 leading-tight">
          We believe AI education{" "}
          <span className="text-gradient">should be free</span>.
        </h1>
        <p className="text-gray-400 text-xl leading-relaxed max-w-2xl mx-auto">
          MG Creative Labs was built by creators who were frustrated with bad AI courses, overwhelming jargon, and paywalled tutorials. We&apos;re fixing that — one lesson at a time.
        </p>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Badge variant="purple" className="mb-4">Mission</Badge>
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Helping the next generation master AI
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              The world is being reshaped by AI. The people who understand it will build the future. The people who don&apos;t will be left behind.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Our mission is to make sure every student, freelancer, entrepreneur, and developer has access to world-class AI education — regardless of background or budget.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: "50K+", label: "Learners worldwide" },
              { n: "1,200+", label: "Prompts published" },
              { n: "80+", label: "Free tutorials" },
              { n: "4.9★", label: "Average rating" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-2xl p-6 text-center border border-white/[0.06]">
                <div className="text-3xl font-display font-bold text-white mb-1">{s.n}</div>
                <div className="text-xs text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="blue" className="mb-4">Values</Badge>
          <h2 className="text-3xl font-display font-bold text-white">How we think</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {values.map((v) => (
            <div key={v.title} className="glass rounded-2xl p-6 border border-white/[0.06]">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-surface-3">
                  <v.icon className="h-5 w-5 text-brand-blue" />
                </div>
                <h3 className="font-semibold text-white">{v.title}</h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="purple" className="mb-4">Journey</Badge>
          <h2 className="text-3xl font-display font-bold text-white">How we got here</h2>
        </div>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-brand-blue/50 to-brand-purple/20" />
          <div className="space-y-8">
            {timeline.map((item) => (
              <div key={item.year} className="flex gap-6 pl-10 relative">
                <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-surface-2 border border-brand-blue/30 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-brand-blue" />
                </div>
                <div>
                  <div className="text-xs font-mono text-brand-blue mb-1">{item.year}</div>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-display font-bold text-white mb-4">Join us on the mission</h2>
        <p className="text-gray-500 mb-8">Start learning today — it&apos;s completely free.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup">
            <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Create free account
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="secondary">Contact us</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
