import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen, Code, Palette, Brain, Zap, Star } from "lucide-react";

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
  { name: "Marcus Williams", role: "Software Engineer", content: "The prompt library alone saved me 10 hours a week. Most practical AI tutorials I've found.", badge: "AI Coding" },
  { name: "Priya Patel", role: "Startup Founder", content: "I automated my entire customer onboarding with the automation course. Life-changing.", badge: "Automation" },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg pt-16">
        <div className="absolute top-1/4 left-1/4 h