import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen, Code, Palette, Brain, Zap, Star, CheckCircle } from "lucide-react";

const stats = [
  { value: "50K+", label: "Learners" },
  { value: "1,200+", label: "AI Prompts" },
  { value: "80+", label: "Tutorials" },
  { value: "Free", label: "To start" },
];

const features = [
  { icon: Brain, title: "AI Learning Hub", description: "Structured courses on AI fundamentals, GPT-4, Claude, and the latest models.", href: "/ai-learning-hub", color: "text-brand-blue", bg: "bg-brand-blue/10", border: "border-brand-blue/20" },
  { icon: Sparkles, title: "Prompt Library", description: "1,200+ hand-crafted prompts for writing, coding, business and creativity.", href: "/prompt-library", color: "text-brand-purple", bg: "bg-brand-purple/10", border: "border-brand-purple/20" },
  { icon: Code, title: "AI Coding Academy", description: "Build real apps with Cursor, v0, Bolt and AI coding tools.", href: "/ai-coding-academy", color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20" },
  { icon: Palette, title: "AI Design Academy", description: "Master Midjourney, DALL-E and Figma AI without a design degree.", href: "/ai-design-academy", color: "text-pink-400", bg: "bg-pink-400/10", border: "border-pink-400/20" },
  { icon: Zap, title: "Automation", description: "Build n8n and Zapier workflows. Automate your business and save hours.", href: "/ai-learning-hub", color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/20" },
  { icon: Star, title: "Community", description: "Connect with 50K+ AI creators. Share, learn and grow together.", href: "/community", color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20" },
];

const testimonials = [
  { name: "Sarah Chen", role: "Freelance Designer", content: "MG Creative Labs transformed how I work. I landed 3x my old freelance rate within 2 months.", badge: "AI Design" },
  { name: "Marcus Williams", role: "Software Engineer", content: "The prompt library alone saved me 10 hours a week. The AI coding tutorials are the most practical I've found.", badge: "AI Coding" },
  { name: "Priya Patel", role: "Startup Founder", content: "I automated my entire customer onboarding with the automation course. Genuinely life-changing.", badge: "Automation" },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg pt-16">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-brand-blue/5 blur-3xl animate-pulse-slow pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 h-48 w-48 rounded-full bg-brand-purple/5 blur-3xl animate-pulse-slow pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-20">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            AI Education Platform · 2025
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
            Master AI.{" "}
            <br className="hidden sm:block" />
            <span className="text-gradient">Build the future.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
            The #1 platform to learn prompt engineering, AI coding, AI design, and automation. Go from beginner to AI-powered creator — for free.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
            <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-brand text-white font-semibold text-lg shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/40 hover:scale-[1.02] transition-all">
              Start learning free <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/prompt-library" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-surface-2 border border-white/10 text-gray-200 font-semibold text-lg hover:border-brand-blue/40 transition-all">
              <Sparkles className="h-4 w-4" /> Browse prompts
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.06]">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-surface-1 px-6 py-5 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-600 mt-0.5 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-sm font-medium mb-4">Everything you need</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">One platform. Every AI skill.</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">Whether you want to write better, code faster, design smarter, or automate everything — we have the resources.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <Link key={feature.title} href={feature.href} className="group">
              <div className={`h-full rounded-2xl bg-surface-1 border ${feature.border} p-6 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl`}>
                <div className={`p-2.5 rounded-xl ${feature.bg} w-fit mb-4`}>
                  <feature.icon className={`h-5 w-5 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                <div className="flex items-center gap-1.5 mt-4 text-xs font-medium text-gray-600 group-hover:text-brand-blue transition-colors">
                  Explore <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-4 sm:px-6 bg-surface-1/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Real results, real people</h2>
            <p className="text-gray-500 text-lg">Join 50,000+ learners who leveled up with MG Creative Labs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="glass glass-hover rounded-2xl p-6 border border-white/[0.06]">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">&ldquo;{t.content}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white text-sm">{t.name}</div>
                    <div className="text-xs text-gray-600">{t.role}</div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-brand-blue/10 text-brand-blue border border-brand-blue/20">{t.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5">The future belongs to AI-fluent creators.</h2>
          <p className="text-gray-500 text-lg mb-8">Start today. It&apos;s free.</p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-brand text-white font-semibold text-lg shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/40 hover:scale-[1.02] transition-all">
            Create your free account <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}