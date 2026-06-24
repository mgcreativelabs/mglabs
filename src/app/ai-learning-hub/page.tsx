// =============================================
// AI LEARNING HUB — src/app/ai-learning-hub/page.tsx
//
// Architecture notes:
//  - Courses are imported from the central data file. Adding or editing a
//    course in src/lib/data/courses.ts is reflected here automatically.
//  - Course cards link to /courses/[slug] (the detail page) — NOT to /signup.
//    Free-vs-paid logic is handled inside the detail page itself.
//  - This page is fully static (no data fetching needed at runtime).
// =============================================
import type { Metadata } from "next";
import Link from "next/link";
import {
  Brain, Zap, Bot, Image, Workflow, Building2,
  ArrowRight, Clock, Star, Users, BookOpen, Play,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getCoursesByCategory, type Course } from "@/lib/data/courses";

// ─── SEO metadata ────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "AI Learning Hub — MG Creative Labs",
  description:
    "Master AI fundamentals, LLMs, prompt engineering, automation, and more. Free structured courses for all levels.",
  openGraph: {
    title: "AI Learning Hub — MG Creative Labs",
    description:
      "Structured courses that take you from AI curious to AI capable. Free to start.",
    type: "website",
  },
};

// ─── Icon map: keeps the data file free of React imports ─────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  brain:    Brain,
  zap:      Zap,
  bot:      Bot,
  image:    Image,
  workflow: Workflow,
  building: Building2,
};

function CourseIcon({ iconKey, className }: { iconKey: string; className?: string }) {
  const Icon = ICON_MAP[iconKey] ?? Brain;
  return <Icon className={className} />;
}

// ─── Level badge helper ───────────────────────────────────────────────────────
function LevelBadge({ level }: { level: Course["level"] }) {
  const variant =
    level === "Beginner" ? "blue" : level === "Advanced" ? "purple" : "default";
  return <Badge variant={variant} size="sm">{level}</Badge>;
}

// ─── AI Tools Directory data ──────────────────────────────────────────────────
const AI_TOOLS = [
  { name: "ChatGPT",    category: "Text Generation",  pricing: "freemium", description: "OpenAI's flagship conversational model. The go-to for everyday AI tasks." },
  { name: "Claude",     category: "Text Generation",  pricing: "freemium", description: "Anthropic's model. Excels at long-form writing, analysis, and coding." },
  { name: "Gemini",     category: "Text Generation",  pricing: "freemium", description: "Google's multimodal AI with a 1 M token context window." },
  { name: "Midjourney", category: "Image Generation", pricing: "paid",     description: "The gold standard for AI art and photorealistic visual creation." },
  { name: "Cursor",     category: "Code Generation",  pricing: "freemium", description: "AI-native code editor that understands your entire codebase." },
  { name: "Runway",     category: "Video Generation", pricing: "freemium", description: "Professional-grade AI video generation and editing in the browser." },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AILearningHubPage() {
  const courses = getCoursesByCategory("learning");

  return (
    <div className="min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        <Badge variant="blue" className="mb-5">
          <BookOpen className="h-3 w-3" /> Free courses
        </Badge>
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-5 leading-tight">
          AI Learning{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Hub
          </span>
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed mb-8">
          Structured courses that take you from AI curious to AI capable.
          Free to start — no account required.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup">
            <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Start learning free
            </Button>
          </Link>
          <Link href="/mg-ai">
            <Button size="lg" variant="secondary">
              Try MG Labs AI
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Courses grid ─────────────────────────────────────────────────── */}
      <section className="py-8 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">All Courses</h2>
          <Badge variant="default">{courses.length} available</Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {courses.map((course) => (
            /* 
              KEY FIX: The entire card is a link to /courses/[slug].
              Previously all cards linked to /signup regardless of content.
            */
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="group block"
            >
              <Card className="border border-white/10 bg-white/5 p-6 rounded-2xl flex flex-col h-full hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200">
                {/* Card header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-white/10 group-hover:bg-blue-500/20 transition-colors">
                    <CourseIcon iconKey={course.iconKey} className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    {course.isFree ? (
                      <Badge variant="success">Free</Badge>
                    ) : (
                      <Badge variant="purple">Pro</Badge>
                    )}
                    <LevelBadge level={course.level} />
                  </div>
                </div>

                {/* Title + description */}
                <h3 className="font-semibold text-white text-lg mb-2 group-hover:text-blue-300 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 flex-1 leading-relaxed">
                  {course.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {course.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-gray-400 bg-white/5 px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-4 text-xs text-gray-400 border-t border-white/10 pt-4 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Play className="h-3 w-3" />
                    {course.modules.reduce((a, m) => a + m.lessons.length, 0)} lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-400" />
                    {course.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {course.students.toLocaleString()}
                  </span>
                </div>

                {/* Inline CTA (not a nested link — card itself is the link) */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    {course.isFree ? "Start free course" : "View course"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Pricing nudge ────────────────────────────────────────────────── */}
      <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="rounded-2xl bg-gradient-to-br from-blue-900/30 to-purple-900/20 border border-blue-500/20 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              Need personalised AI guidance?
            </h3>
            <p className="text-gray-400 text-sm max-w-md">
              Unlock one-on-one strategic support with our Premium AI Guidance plan —
              advanced implementation help across tools, workflows, and AI projects.
            </p>
          </div>
          <Link href="/pricing#premium" className="flex-shrink-0">
            <Button variant="primary" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
              See Premium plan
            </Button>
          </Link>
        </div>
      </section>

      {/* ── AI Tools Directory ───────────────────────────────────────────── */}
      <section
        id="tools"
        className="py-16 px-4 sm:px-6 max-w-6xl mx-auto pb-24 scroll-mt-20"
      >
        <div className="mb-8">
          <Badge variant="purple" className="mb-3">Curated directory</Badge>
          <h2 className="text-3xl font-bold text-white">AI Tools Directory</h2>
          <p className="text-gray-400 mt-2">
            The best AI tools, ranked and explained so you know what to reach for.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {AI_TOOLS.map((tool) => (
            <div
              key={tool.name}
              className="rounded-2xl p-5 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-white">{tool.name}</h3>
                <Badge
                  variant={
                    tool.pricing === "free"
                      ? "success"
                      : tool.pricing === "freemium"
                      ? "blue"
                      : "purple"
                  }
                  size="sm"
                >
                  {tool.pricing}
                </Badge>
              </div>
              <Badge variant="default" size="sm" className="mb-3">
                {tool.category}
              </Badge>
              <p className="text-gray-400 text-sm leading-relaxed">
                {tool.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
