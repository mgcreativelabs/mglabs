// =============================================
// FEATURES — src/components/sections/Features.tsx
// =============================================
import React from "react";
import Link from "next/link";
import { BookOpen, Sparkles, Code, Palette, Users, ArrowRight, Zap, Brain, Rocket } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const features = [
  {
    icon: Brain,
    title: "AI Learning Hub",
    description: "Structured courses on AI fundamentals, GPT-4, Claude, Gemini, and the latest models. No PhD required.",
    href: "/ai-learning-hub",
    badge: "Beginner friendly",
    color: "blue",
    gradient: "from-blue-500/10 to-blue-600/5",
    border: "border-blue-500/20",
  },
  {
    icon: Sparkles,
    title: "Prompt Library",
    description: "1,200+ hand-crafted prompts for writing, coding, business, and creativity. Copy, customize, and deploy.",
    href: "/prompt-library",
    badge: "1,200+ prompts",
    color: "purple",
    gradient: "from-purple-500/10 to-purple-600/5",
    border: "border-purple-500/20",
  },
  {
    icon: Code,
    title: "AI Coding Academy",
    description: "Build real apps with AI. Learn Cursor, Copilot, v0, Bolt, and how to pair-program with LLMs.",
    href: "/ai-coding-academy",
    badge: "Project-based",
    color: "blue",
    gradient: "from-cyan-500/10 to-blue-600/5",
    border: "border-cyan-500/20",
  },
  {
    icon: Palette,
    title: "AI Design Academy",
    description: "Master Midjourney, DALL-E, Stable Diffusion, and Figma AI. Create stunning visuals without a design degree.",
    href: "/ai-design-academy",
    badge: "Creative",
    color: "purple",
    gradient: "from-pink-500/10 to-purple-600/5",
    border: "border-pink-500/20",
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Build n8n, Zapier, and Make workflows. Automate your business and reclaim hours every week.",
    href: "/ai-learning-hub#automation",
    badge: "Time-saving",
    color: "blue",
    gradient: "from-yellow-500/10 to-orange-600/5",
    border: "border-yellow-500/20",
  },
  {
    icon: Users,
    title: "Community",
    description: "Connect with 50K+ AI creators. Share projects, get feedback, find collaborators, and grow together.",
    href: "/community",
    badge: "50K+ members",
    color: "purple",
    gradient: "from-green-500/10 to-teal-600/5",
    border: "border-green-500/20",
  },
];

export function Features() {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <Badge variant="purple" className="mb-4">Everything you need</Badge>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
          One platform. Every AI skill.
        </h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Whether you want to write better, code faster, design smarter, or automate everything — we have the resources.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature) => (
          <Link key={feature.title} href={feature.href} className="group">
            <Card
              className={`h-full bg-gradient-to-br ${feature.gradient} ${feature.border} border hover:scale-[1.02] transition-all duration-300 hover:shadow-xl`}
              className="p-6" />
            >
              <div className="flex items-start gap-4">
                <div className={`p-2.5 rounded-xl bg-surface-2 border border-white/[0.06]`}>
                  <feature.icon className={`h-5 w-5 ${feature.color === "blue" ? "text-brand-blue" : "text-brand-purple"}`} />
                </div>
                <Badge variant={feature.color === "blue" ? "blue" : "purple"} size="sm">
                  {feature.badge}
                </Badge>
              </div>
              <h3 className="text-lg font-semibold text-white mt-4 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              <div className="flex items-center gap-1.5 mt-4 text-xs font-medium text-gray-600 group-hover:text-brand-blue transition-colors">
                Explore <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
