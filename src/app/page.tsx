// =============================================
// HOME PAGE — src/app/page.tsx
// =============================================
import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Testimonials } from "@/components/sections/Testimonials";
import { Newsletter } from "@/components/sections/Newsletter";
import { ArrowRight, BookOpen, Code, Palette, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "MG Creative Labs — Master AI, Prompt Engineering & AI Design",
  description: "The #1 platform to learn AI, prompt engineering, AI coding, AI design, and automation. Join 50,000+ creators.",
};

const learningPaths = [
  {
    step: "01",
    title: "Learn AI fundamentals",
    description: "Understand how LLMs work, what you can build, and where to start.",
    icon: BookOpen,
    href: "/ai-learning-hub",
    time: "2–4 hours",
  },
  {
    step: "02",
    title: "Master prompt engineering",
    description: "Learn to write prompts that get 10x better results from any AI.",
    icon: Sparkles,
    href: "/prompt-library",
    time: "4–8 hours",
  },
  {
    step: "03",
    title: "Build with AI",
    description: "Create real projects using Cursor, v0, Bolt, and AI coding tools.",
    icon: Code,
    href: "/ai-coding-academy",
    time: "10–20 hours",
  },
  {
    step: "04",
    title: "Design with AI",
    description: "Generate professional visuals, brand assets, and UI with AI design tools.",
    icon: Palette,
    href: "/ai-design-academy",
    time: "6–12 hours",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />

      {/* Learning Path Section */}
      <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge variant="blue" className="mb-4">Structured learning</Badge>
            <h2 className="text-4xl font-display font-bold text-white mb-5 leading-tight">
              A clear path from beginner to AI creator
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              No random tutorials. No overwhelm. A proven 4-step path that takes you from &ldquo;I&apos;ve heard of ChatGPT&rdquo; to building real AI-powered projects.
            </p>
            <Link href="/ai-learning-hub">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Start your path
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {learningPaths.map((path, i) => (
              <Link key={path.step} href={path.href}>
                <div className="group flex items-start gap-4 p-5 rounded-2xl bg-surface-1 border border-white/[0.06] hover:border-brand-blue/30 hover:bg-surface-2 transition-all duration-200">
                  <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-surface-3 flex items-center justify-center">
                    <span className="text-xs font-mono font-bold text-brand-blue">{path.step}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white text-sm">{path.title}</h3>
                      <span className="text-xs text-gray-600 ml-auto">{path.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{path.description}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-600 group-hover:text-brand-blue group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <Newsletter />

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-5">
            The future belongs to AI-fluent creators.
          </h2>
          <p className="text-gray-500 text-lg mb-8">
            Start today. It&apos;s free.
          </p>
          <Link href="/signup">
            <Button size="xl" variant="primary" rightIcon={<ArrowRight className="h-5 w-5" />}>
              Create your free account
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
