import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ArrowRight, Palette, Image, Layers, Wand2, CheckCircle, Play, Star } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Design Academy — MG Creative Labs",
  description: "Master AI design tools — Midjourney, DALL-E, Stable Diffusion, Figma AI. Create stunning visuals without a design degree.",
};

const modules = [
  {
    icon: Image,
    title: "AI Image Generation",
    description: "Master Midjourney v6, DALL-E 3, and Stable Diffusion. Learn prompt techniques for photorealistic, artistic, and branded visuals. Go from a single line of text to gallery-quality images.",
    tools: ["Midjourney", "DALL-E 3", "Stable Diffusion"],
    lessons: 14,
    level: "Beginner",
    color: "text-pink-400",
    bg: "bg-pink-500/10 border-pink-500/20",
  },
  {
    icon: Layers,
    title: "Brand Identity with AI",
    description: "Create complete brand identities — logos, color palettes, typography, and brand guidelines — using AI design tools. Build a professional brand in hours, not weeks.",
    tools: ["Adobe Firefly", "Canva AI", "Looka"],
    lessons: 10,
    level: "Beginner",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: Wand2,
    title: "UI/UX with AI",
    description: "Design interfaces and prototypes 10x faster using Figma AI, Galileo, and other AI-native design tools. Go from wireframe to production-ready design in a single afternoon.",
    tools: ["Figma AI", "Galileo", "Framer AI"],
    lessons: 18,
    level: "Intermediate",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Palette,
    title: "AI Video & Motion",
    description: "Create professional videos, animations, and motion graphics using Runway, Pika, and Kling AI. Produce content that would cost thousands with a traditional production team.",
    tools: ["Runway", "Pika", "Kling"],
    lessons: 12,
    level: "Intermediate",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
  },
];

const skills = [
  "Generate photorealistic product images from text",
  "Build a full brand identity in under 2 hours",
  "Create UI mockups without knowing code",
  "Produce social media content at scale with AI",
  "Edit and upscale images using AI tools",
  "Generate AI videos for marketing campaigns",
  "Create consistent character styles across prompts",
  "Export assets ready for web, print, and social",
];

const testimonials = [
  {
    quote: "I went from zero design skills to landing my first $2,000 design client in 6 weeks using AI tools I learned here.",
    name: "Sarah M.",
    role: "Freelance Designer",
  },
  {
    quote: "The Midjourney module alone was worth it. My product images now look like they came from a professional studio.",
    name: "James K.",
    role: "E-commerce Entrepreneur",
  },
];

export default function AIDesignAcademyPage() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center mesh-bg">
        <Badge variant="purple" className="mb-5">
          <Palette className="h-3 w-3" /> Creative AI
        </Badge>
        <h1 className="text-5xl sm:text-6xl font-display font-bold text-white mb-5 leading-tight">
          AI Design <span className="text-gradient">Academy</span>
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed mb-8">
          No design degree needed. Learn to create stunning visuals, brands, and interfaces with the power of AI — and get paid for them.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup">
            <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Start creating for free
            </Button>
          </Link>
          <Link href="/prompt-library">
            <Button size="lg" variant="secondary">
              Browse design prompts
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Stats ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
        <div className="grid grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.06]">
          {[
            { n: "4", label: "Learning Modules" },
            { n: "54", label: "Total Lessons" },
            { n: "Free", label: "To Start" },
          ].map((s) => (
            <div key={s.label} className="bg-surface-1 px-6 py-5 text-center">
              <div className="text-2xl font-display font-bold text-white">{s.n}</div>
              <div className="text-xs text-gray-600 mt-0.5 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Modules ── */}
      <section className="py-8 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="mb-10">
          <Badge variant="blue" className="mb-3">Curriculum</Badge>
          <h2 className="text-3xl font-display font-bold text-white">4 Core Modules</h2>
          <p className="text-gray-400 mt-2">Progress from images to full brand systems to video.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {modules.map((mod) => (
            <Card key={mod.title} className={`glass border card-hover p-6 ${mod.bg}`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-xl bg-white/10 ${mod.color}`}>
                  <mod.icon className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default" size="sm">{mod.level}</Badge>
                  <Badge variant="success" size="sm">Free</Badge>
                </div>
              </div>

              <h3 className="font-semibold text-white text-lg mb-2">{mod.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{mod.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {mod.tools.map((tool) => (
                  <span key={tool} className={`text-xs px-2 py-0.5 rounded-md bg-white/5 border border-white/10 ${mod.color}`}>
                    {tool}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Play className="h-3 w-3" /> {mod.lessons} lessons
                </span>
                <Link href="/signup">
                  <Button size="sm" variant="secondary" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                    Start module
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ── What you'll learn ── */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="purple" className="mb-4">Skills you'll master</Badge>
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              From zero to professional designer — with AI
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Every skill is taught with hands-on projects and real-world examples. You won't just watch — you'll create.
            </p>
            <Link href="/signup">
              <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Start for free
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {skills.map((skill, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-surface-1 border border-white/[0.06]">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto pb-24">
        <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">What students say</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="p-6 rounded-2xl bg-surface-1 border border-white/[0.06]">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">"{t.quote}"</p>
              <div>
                <div className="text-white text-sm font-medium">{t.name}</div>
                <div className="text-gray-600 text-xs">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
