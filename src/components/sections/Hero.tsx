// =============================================
// HERO SECTION — src/components/sections/Hero.tsx
// Signature element: animated gradient mesh + cursor-reactive glow
// =============================================
"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const stats = [
  { value: "50K+", label: "Learners" },
  { value: "1,200+", label: "AI Prompts" },
  { value: "80+", label: "Tutorials" },
  { value: "Free", label: "To start" },
];

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const glow = glowRef.current;
    if (!hero || !glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      glow.style.background = `radial-gradient(600px circle at ${x}% ${y}%, rgba(59, 130, 246, 0.06), transparent 50%)`;
    };

    hero.addEventListener("mousemove", handleMouseMove);
    return () => hero.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg pt-16"
    >
      {/* Cursor glow overlay */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none transition-all duration-300"
        style={{ background: "radial-gradient(600px circle at 50% 40%, rgba(59,130,246,0.06), transparent 50%)" }}
      />

      {/* Radial grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-brand-blue/5 blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 h-48 w-48 rounded-full bg-brand-purple/5 blur-3xl animate-pulse-slow pointer-events-none" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-20">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <Badge variant="blue" size="lg" className="gap-1.5">
            <Sparkles className="h-3 w-3" />
            AI Education Platform · 2025
          </Badge>
        </div>

        {/* Headline — the thesis */}
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.05] tracking-tight mb-6 animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          Master AI.{" "}
          <br className="hidden sm:block" />
          <span className="text-gradient">Build the future.</span>
        </h1>

        <p
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          The #1 platform to learn prompt engineering, AI coding, AI design, and automation.
          Go from beginner to AI-powered creator — for free.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <Link href="/signup">
            <Button size="xl" variant="primary" rightIcon={<ArrowRight className="h-5 w-5" />}>
              Start learning free
            </Button>
          </Link>
          <Link href="/prompt-library">
            <Button size="xl" variant="secondary" leftIcon={<Sparkles className="h-4 w-4" />}>
              Browse prompts
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.06] animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-surface-1 px-6 py-5 text-center">
              <div className="text-2xl sm:text-3xl font-display font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-600 mt-0.5 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-3 mt-8 text-sm text-gray-600 animate-fade-up" style={{ animationDelay: "0.6s" }}>
          <div className="flex -space-x-2">
            {["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444"].map((color, i) => (
              <div
                key={i}
                className="h-7 w-7 rounded-full border-2 border-surface"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span>
            Join <strong className="text-gray-400">50,000+</strong> creators already learning
          </span>
        </div>
      </div>
    </section>
  );
}
