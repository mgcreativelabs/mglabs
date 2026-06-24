// =============================================
// AI CODING ACADEMY — src/app/ai-coding-academy/page.tsx
//
// Architecture notes:
//  - Courses imported from the central data catalog.
//  - Cards link to /courses/[slug] — never to /signup directly.
//  - The "coding" category currently has 8 courses totalling 300+ lessons.
// =============================================
import type { Metadata } from "next";
import Link from "next/link";
import {
  Code, Terminal, Cpu, Layers, GitBranch, Database,
  ArrowRight, Clock, Star, Users, Play, CheckCircle2,
  BookOpen, Rocket,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getCoursesByCategory, type Course } from "@/lib/data/courses";

export const metadata: Metadata = {
  title: "AI Coding Academy — MG Creative Labs",
  description:
    "Learn HTML, CSS, JavaScript, Python, React, APIs, SQL, Git, and Full-Stack development with AI assistance.",
  openGraph: {
    title: "AI Coding Academy — MG Creative Labs",
    description:
      "Build real apps with AI. Ship production code faster than you thought possible.",
    type: "website",
  },
};

// ─── Icon map ────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  code:        Code,
  terminal:    Terminal,
  cpu:         Cpu,
  layers:      Layers,
  "git-branch": GitBranch,
  database:    Database,
};

function CourseIcon({ iconKey, className }: { iconKey: string; className?: string }) {
  const Icon = ICON_MAP[iconKey] ?? Code;
  return <Icon className={className} />;
}

function LevelBadge({ level }: { level: Course["level"] }) {
  const variant =
    level === "Beginner" ? "blue" : level === "Advanced" ? "purple" : "default";
  return <Badge variant={variant} size="sm">{level}</Badge>;
}

// ─── What you'll build — pulled from real capstone lessons ───────────────────
const PROJECTS = [
  "A responsive landing page from an empty HTML file",
  "Interactive to-do app with Vanilla JS & DOM manipulation",
  "Python CLI AI assistant calling OpenAI or Groq APIs",
  "Full-featured multi-page React application",
  "Slack bot wired to a public REST API with webhooks",
  "Complete SaaS product deployed live on Vercel with Supabase auth",
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AICodingAcademyPage() {
  const courses = getCoursesByCategory("coding");

  const totalLessons = courses.reduce(
    (acc, c) => acc + c.modules.reduce((a, m) => a + m.lessons.length, 0),
    0
  );

  return (
    <div className="min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        <Badge variant="blue" className="mb-5">
          <Code className="h-3 w-3" /> Build with AI
        </Badge>
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-5 leading-tight">
          AI Coding{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Academy
          </span>
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed mb-8">
          Ship real products. From your first HTML tag to a production-deployed
          SaaS — with AI accelerating every step.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup">
            <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Start building free
            </Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="secondary">
              See Pro plan
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Quick stats ──────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
        <div className="grid grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.06]">
          {[
            { n: courses.length.toString(), label: "Courses" },
            { n: `${totalLessons}+`,        label: "Lessons" },
            { n: "Free",                    label: "To start" },
          ].map((s) => (
            <div key={s.label} className="bg-black/20 px-6 py-5 text-center">
              <div className="text-2xl font-bold text-white">{s.n}</div>
              <div className="text-xs text-gray-600 mt-0.5 uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Courses grid ─────────────────────────────────────────────────── */}
      <section className="py-8 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">All Courses</h2>
            <p className="text-gray-500 text-sm mt-1">
              Start from zero or jump to the level you need.
            </p>
          </div>
          <Badge variant="default">{courses.length} courses</Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {courses.map((course) => (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="group block"
            >
              <Card className="border border-white/10 bg-white/5 p-6 rounded-2xl flex flex-col h-full hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-white/10 group-hover:bg-cyan-500/20 transition-colors">
                    <CourseIcon iconKey={course.iconKey} className="h-5 w-5 text-cyan-400" />
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

                <h3 className="font-semibold text-white text-lg mb-2 group-hover:text-cyan-300 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 flex-1 leading-relaxed">
                  {course.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {course.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-cyan-400/80 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-400 border-t border-white/10 pt-4 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />{course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Play className="h-3 w-3" />
                    {course.modules.reduce((a, m) => a + m.lessons.length, 0)} lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-400" />{course.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />{course.students.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-cyan-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    {course.isFree ? "Start free" : "View course"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ── What you'll build ────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="purple" className="mb-4">Project-based learning</Badge>
            <h2 className="text-3xl font-bold text-white mb-4">
              Build{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {PROJECTS.length} real projects
              </span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Every course ends with a deployable capstone project.
              No toy examples — real apps with real architecture that you can
              put in a portfolio and grow into a business.
            </p>
            <div className="flex gap-3">
              <Link href="/signup">
                <Button
                  size="lg"
                  variant="primary"
                  rightIcon={<Rocket className="h-4 w-4" />}
                >
                  Start building today
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="secondary">
                  See plans
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            {PROJECTS.map((project, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-500/30 transition-colors"
              >
                <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{project}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Learning path note ───────────────────────────────────────────── */}
      <section className="py-8 px-4 sm:px-6 max-w-6xl mx-auto pb-24">
        <div className="rounded-2xl bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 p-8">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 flex-shrink-0">
              <BookOpen className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-bold text-white mb-1.5">Recommended learning path</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                New to coding? Follow the path in order:&nbsp;
                <strong className="text-white">HTML &amp; CSS</strong> →{" "}
                <strong className="text-white">JavaScript</strong> →{" "}
                <strong className="text-white">APIs</strong> →{" "}
                <strong className="text-white">Python for AI</strong> →{" "}
                <strong className="text-white">React</strong> →{" "}
                <strong className="text-white">Git</strong> →{" "}
                <strong className="text-white">Databases</strong> →{" "}
                <strong className="text-white">Full-Stack with AI</strong>.
                Already have experience? Jump to any course directly.
              </p>
              <Link href="/ai-learning-hub">
                <Button variant="secondary" size="sm">
                  Explore AI courses too →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
