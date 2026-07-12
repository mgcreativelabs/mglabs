// =============================================
// ABOUT PAGE — src/app/about/page.tsx
// =============================================
import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Target, Heart, Zap, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getPlatformStats, formatStatCountOrNull } from "@/lib/data/platform-stats";

export const revalidate = 3600;

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

// Real product milestones only — no invented user counts. If you want a
// milestone to cite a number ("X members"), pull it from getPlatformStats()
// at render time the way the stats grid below does, don't hardcode it here.
const timeline = [
  { year: "2024", event: "MG Creative Labs founded with a simple idea: AI education should be accessible and actually good." },
  { year: "2025", event: "Built the Prompt Library, AI Coding Academy, and AI Design Academy." },
  { year: "2025", event: "Launched the community platform for learners to share projects and help each other." },
  { year: "2026", event: "Mobile app, AI Academy, and SaaS products on the roadmap." },
];

export default async function AboutPage() {
  const stats = await getPlatformStats();
  const learnersLabel = formatStatCountOrNull(stats.learners, 10);
  const promptsLabel = formatStatCountOrNull(stats.prompts, 10);

  const missionStats = [
    learnersLabel ? { n: learnersLabel, label: "Learners worldwide" } : { n: "Open", label: "Now in beta" },
    promptsLabel ? { n: promptsLabel, label: "Prompts published" } : { n: "Growing", label: "Prompt library" },
    { n: "Free", label: "To start" },
    { n: "100%", label: "Real, no filler" },
  ];

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 px-4 sm:px-6 max-w-4xl mx-auto text-center mesh-bg">
        <Badge variant="blue" className="mb-5">Our story</Badge>
        <h1 className="text-5xl sm:text-6xl font-display font-bold text-ink mb-6 leading-tight">
          We believe AI education{" "}
          <span className="text-gradient">should be accessible</span>.
        </h1>
        <p className="text-ink-2 text-xl leading-relaxed max-w-2xl mx-auto">
          MG Creative Labs was built by creators who were frustrated with bad AI courses, overwhelming jargon, and paywalled tutorials. We&apos;re fixing that — one lesson at a time.
        </p>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Badge variant="purple" className="mb-4">Mission</Badge>
            <h2 className="text-3xl font-display font-bold text-ink mb-4">
              Helping the next generation master AI
            </h2>
            <p className="text-ink-2 leading-relaxed mb-4">
              The world is being reshaped by AI. The people who understand it will build the future. The people who don&apos;t will be left behind.
            </p>
            <p className="text-ink-2 leading-relaxed">
              Our mission is to make sure every student, freelancer, entrepreneur, and developer has access to world-class AI education — regardless of background or budget.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {missionStats.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-6 text-center border border-border">
                <div className="text-3xl font-display font-bold text-ink mb-1">{s.n}</div>
                <div className="text-xs text-ink-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="blue" className="mb-4">Values</Badge>
          <h2 className="text-3xl font-display font-bold text-ink">How we think</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {values.map((v) => (
            <div key={v.title} className="glass rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-surface-3">
                  <v.icon className="h-5 w-5 text-brand-blue" />
                </div>
                <h3 className="font-semibold text-ink">{v.title}</h3>
              </div>
              <p className="text-ink-muted text-sm leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="purple" className="mb-4">Journey</Badge>
          <h2 className="text-3xl font-display font-bold text-ink">How we got here</h2>
        </div>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-brand-blue/30" />
          <div className="space-y-8">
            {timeline.map((item) => (
              <div key={item.year} className="flex gap-6 pl-10 relative">
                <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-surface-2 border border-brand-blue/30 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-brand-blue" />
                </div>
                <div>
                  <div className="text-xs font-mono text-brand-blue mb-1">{item.year}</div>
                  <p className="text-ink-2 text-sm leading-relaxed">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-display font-bold text-ink mb-4">Join us on the mission</h2>
        <p className="text-ink-muted mb-8">Start learning today — it&apos;s completely free.</p>
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
