import React from "react";
import Link from "next/link";
import { BookOpen, Sparkles, Code, Palette, Users, ArrowRight, Zap, Brain } from "lucide-react";
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
    gradient: "from-blue-500/30 to-blue-600/30",
    border: "border-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Sparkles,
    title: "Prompt Library",
    description: "1,200+ hand-crafted prompts for writing, coding, business, and creativity. Copy, customize, and deploy.",
    href: "/prompt-library",
    badge: "1,200+ prompts",
    color: "purple",
    gradient: "from-purple-500/30 to-purple-600/30",
    border: "border-purple-500/20",
    iconColor: "text-purple-400",
  },
  {
    icon: Code,
    title: "AI Coding Academy",
    description: "Build real apps with AI. Learn Cursor, Copilot, v0, Bolt, and how to pair-program with LLMs.",
    href: "/ai-coding-academy",
    badge: "Project-based",
    color: "cyan",
    gradient: "from-cyan-500/30 to-cyan-600/30",
    border: "border-cyan-500/20",
    iconColor: "text-cyan-400",
  },
  {
    icon: Palette,
    title: "AI Design Academy",
    description: "Master Midjourney, DALL-E, Stable Diffusion, and Figma AI. Create stunning visuals without a design degree.",
    href: "/ai-design-academy",
    badge: "Creative",
    color: "pink",
    gradient: "from-pink-500/30 to-pink-600/30",
    border: "border-pink-500/20",
    iconColor: "text-pink-400",
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Build n8n, Zapier, and Make workflows. Automate your business and reclaim hours every week.",
    href: "/ai-learning-hub#automation",
    badge: "Time-saving",
    color: "yellow",
    gradient: "from-yellow-500/30 to-orange-600/30",
    border: "border-yellow-500/20",
    iconColor: "text-yellow-400",
  },
  {
    icon: Users,
    title: "Community",
    description: "Connect with 50K+ AI creators. Share projects, get feedback, find collaborators, and grow together.",
    href: "/community",
    badge: "50K+ members",
    color: "green",
    gradient: "from-green-500/30 to-teal-600/30",
    border: "border-green-500/20",
    iconColor: "text-green-400",
  },
];

export function Features() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* PERFECTLY CENTERED HEADER */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            One platform. Every AI skill.
          </h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Whether you want to write better, code faster, design smarter, or automate everything — we have the resources.
          </p>
        </div>

        {/* FEATURE CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Link key={feature.title} href={feature.href} className="group block">
              <div className={`h-full p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl`}>
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 border ${feature.border}`}>
                  <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                </div>
                
                {/* Badge */}
                <Badge variant={feature.color === "blue" || feature.color === "cyan" ? "blue" : "purple"} size="sm" className="mb-4">
                  {feature.badge}
                </Badge>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                
                {/* Description */}
                <p className="text-gray-400 leading-relaxed mb-6">{feature.description}</p>
                
                {/* Explore link */}
                <div className={`flex items-center gap-2 ${feature.iconColor} font-medium group-hover:gap-3 transition-all`}>
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* SPACING BEFORE FOOTER */}
        <div className="h-32" />
      </div>
    </section>
  );
}