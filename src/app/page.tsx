import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Zap,
  BookOpen,
  Rocket,
  Play,
  Sparkles,
  CheckCircle2,
  Video,
  Briefcase,
  Package,
  ShieldCheck,
  Gauge,
  Layers,
} from "lucide-react";
import { getPlatformStats, formatStatCountOrNull } from "@/lib/data/platform-stats";
import { Newsletter } from "@/components/sections/Newsletter";

// Revalidate once per hour — keeps stats fresh without a per-visit DB call.
export const revalidate = 3600;

export default async function Home() {
  const stats = await getPlatformStats();
  const ctaLabel = formatStatCountOrNull(stats.learners, 20);

  return (
    <div className="min-h-screen bg-surface w-full">

      {/* ═══════════════════════════
          HERO
          One message, one primary action.
      ═══════════════════════════ */}
      <section className="relative flex flex-col items-center justify-center w-full px-6 pt-40 pb-28 text-center">

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border text-ink-2 text-sm font-medium mb-8">
          <span className="flex h-1.5 w-1.5 rounded-full bg-brand-blue" />
          AI Builder Platform &amp; Studio
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-[1.05] text-ink">
          Build your AI product,{" "}
          <span className="text-brand-blue">from idea to launch.</span>
        </h1>

        <p className="text-ink-2 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          MG Labs designs, builds, and ships custom AI chatbots, agents, and
          internal tools — or teaches you to build them yourself, step by step.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10 w-full px-4">
          <Link
            href="/pricing#launch"
            className="group px-7 py-3.5 bg-brand-blue text-white hover:bg-brand-blue-hover rounded-xl font-semibold transition-colors duration-150 flex items-center gap-2 w-full sm:w-auto justify-center text-base"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/mg-ai"
            className="px-7 py-3.5 rounded-xl font-medium text-ink border border-border hover:border-border-strong hover:bg-surface-1 transition-colors duration-150 w-full sm:w-auto flex items-center gap-2 justify-center text-base"
          >
            <Bot className="w-4 h-4" />
            Try MG AI
          </Link>
        </div>

        {/* Feature badges — what we build, at a glance */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-muted max-w-2xl mx-auto">
          {["AI Chatbots", "AI Agents", "Automations", "Internal Tools", "AI Websites"].map((item) => (
            <div key={item} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════
          PROCESS — simple visual timeline
      ═══════════════════════════ */}
      <section className="w-full px-6 py-24 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-blue text-sm font-semibold uppercase tracking-widest mb-3">
              How it works
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-ink">
              From idea to deployed product
            </h2>
          </div>

          <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-4">
            {[
              { label: "Tell us your idea", icon: <Sparkles className="w-5 h-5" /> },
              { label: "Strategy", icon: <Layers className="w-5 h-5" /> },
              { label: "Development", icon: <Play className="w-5 h-5" /> },
              { label: "Launch", icon: <Rocket className="w-5 h-5" /> },
              { label: "Support", icon: <ShieldCheck className="w-5 h-5" /> },
            ].map((step, i, arr) => (
              <div key={step.label} className="flex md:flex-1 items-center md:flex-col md:text-center gap-4 md:gap-3">
                <div className="flex flex-col items-center gap-3 md:w-full">
                  <div className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-brand-blue flex-shrink-0">
                    {step.icon}
                  </div>
                  <span className="text-sm font-medium text-ink whitespace-nowrap md:whitespace-normal">
                    {step.label}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden md:block flex-1 h-px bg-border mt-[-28px]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════
          SERVICES
      ═══════════════════════════ */}
      <section className="w-full px-6 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-ink-muted text-sm font-semibold uppercase tracking-widest mb-3">
              What we build
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
              Services
            </h2>
            <p className="text-ink-2 max-w-xl mx-auto">
              Choose the done-for-you path, or use the platform to build it yourself.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: <Bot className="w-5 h-5" />,
                title: "AI Chatbots",
                desc: "Conversational assistants trained on your business, deployed on your site.",
                href: "/services#chatbots",
              },
              {
                icon: <Zap className="w-5 h-5" />,
                title: "AI Automation",
                desc: "Connect your tools and let AI handle the repetitive work.",
                href: "/services#automation",
              },
              {
                icon: <Sparkles className="w-5 h-5" />,
                title: "AI Agents",
                desc: "Multi-step agents that take action, not just answer questions.",
                href: "/services#agents",
              },
              {
                icon: <Briefcase className="w-5 h-5" />,
                title: "Internal AI Systems",
                desc: "Company-specific tools your team uses every day.",
                href: "/services#internal",
              },
              {
                icon: <Rocket className="w-5 h-5" />,
                title: "Custom AI Software",
                desc: "Full products built around your idea, from spec to deployment.",
                href: "/services#custom",
              },
              {
                icon: <Video className="w-5 h-5" />,
                title: "AI Content Agency",
                desc: "AI-produced video, copy, and creative at production scale.",
                href: "/services#content",
              },
            ].map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group p-7 rounded-2xl border border-border hover:border-border-strong transition-colors duration-150 flex flex-col"
              >
                <div className="w-10 h-10 rounded-lg border border-border flex items-center justify-center mb-5 text-brand-blue">
                  {s.icon}
                </div>
                <h3 className="text-base font-semibold text-ink mb-2">{s.title}</h3>
                <p className="text-ink-2 text-sm leading-relaxed flex-1 mb-5">{s.desc}</p>
                <div className="text-sm font-medium text-brand-blue flex items-center gap-1.5">
                  Learn more
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════
          LAUNCH PROGRAM — flagship offer
      ═══════════════════════════ */}
      <section className="w-full px-6 py-24 border-t border-border">
        <div className="max-w-5xl mx-auto rounded-3xl border border-border p-10 md:p-14">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-14">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-ink-muted text-xs font-semibold uppercase tracking-wide mb-5">
                Flagship Offer
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4 leading-tight">
                The Launch Program
              </h2>
              <p className="text-ink-2 leading-relaxed mb-7 max-w-xl">
                You bring the idea. We build it with you — real APIs, real
                deployment, a real product you own at the end, in four weeks.
              </p>
              <ul className="space-y-2.5 mb-8">
                {[
                  "Done-with-you — we build it together, not for you",
                  "Deployed live with a real URL",
                  "Step-by-step structure, not just tutorials",
                  "Direct access throughout your build",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-ink-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing#launch"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-blue text-white hover:bg-brand-blue-hover rounded-xl font-semibold transition-colors duration-150"
              >
                Apply for the Launch Program
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="md:text-right flex-shrink-0">
              <div className="text-6xl font-bold text-ink mb-2">$500</div>
              <div className="text-ink-muted text-sm leading-relaxed">
                One-time. One project.<br />Real result.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════
          WHY CHOOSE US
      ═══════════════════════════ */}
      <section className="w-full px-6 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-ink-muted text-sm font-semibold uppercase tracking-widest mb-3">
              Why MG Labs
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-ink">
              Built for business, not demos
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
            {[
              { icon: <Gauge className="w-5 h-5" />, title: "Fast Delivery", desc: "Working software in days, not quarters." },
              { icon: <Sparkles className="w-5 h-5" />, title: "Custom Built", desc: "No templates pretending to be products." },
              { icon: <Bot className="w-5 h-5" />, title: "Modern AI Models", desc: "OpenAI, Claude, Gemini, and more — matched to the task." },
              { icon: <ShieldCheck className="w-5 h-5" />, title: "Secure", desc: "Your data and your users' data, handled properly." },
              { icon: <Layers className="w-5 h-5" />, title: "Scalable", desc: "Built to grow past the first hundred users." },
              { icon: <Briefcase className="w-5 h-5" />, title: "Built for Business", desc: "Outcomes you can measure, not just prototypes." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-brand-blue flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-ink mb-1">{item.title}</h3>
                  <p className="text-ink-2 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════
          TECHNOLOGY
      ═══════════════════════════ */}
      <section className="w-full px-6 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-ink-muted text-sm font-semibold uppercase tracking-widest mb-3">
              Technology
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-ink">
              We build on the best models available
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {["OpenAI", "Claude", "Gemini", "Grok", "Mistral", "Llama"].map((name) => (
              <div
                key={name}
                className="rounded-xl border border-border py-8 flex items-center justify-center text-ink font-semibold text-sm hover:border-border-strong transition-colors duration-150"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════
          SOCIAL PROOF — real, DB-backed stats
      ═══════════════════════════ */}
      <section className="w-full px-6 py-24 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
            {[
              { value: stats.learners, label: "Builders on the platform" },
              { value: stats.prompts, label: "Prompts in the library" },
              { value: stats.communityPosts, label: "Community posts" },
            ].map((stat) => (
              <div key={stat.label} className="p-8 rounded-2xl border border-border">
                <div className="text-4xl md:text-5xl font-bold text-ink mb-2 tabular-nums">
                  {stat.value.toLocaleString()}+
                </div>
                <div className="text-ink-2 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════
          FINAL CTA
      ═══════════════════════════ */}
      <section className="w-full px-6 py-28 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-ink mb-4">
            Ready to build your AI?
          </h2>
          <p className="text-ink-2 text-lg mb-10 max-w-xl mx-auto">
            {ctaLabel
              ? `Join ${ctaLabel} builders already on MG Labs. Let's create something incredible together.`
              : "Let's create something incredible together."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/pricing#launch"
              className="group px-7 py-3.5 bg-brand-blue text-white hover:bg-brand-blue-hover rounded-xl font-semibold transition-colors duration-150 flex items-center gap-2 justify-center"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/mg-ai"
              className="px-7 py-3.5 rounded-xl font-medium text-ink border border-border hover:border-border-strong hover:bg-surface-1 transition-colors duration-150 flex items-center gap-2 justify-center"
            >
              Try MG AI
            </Link>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
