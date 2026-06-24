// =============================================
// AI DESIGN & AUTOMATION ACADEMY — src/app/ai-design-academy/page.tsx
//
// Architecture notes:
//  - Courses imported from the central data catalog (category: "design").
//  - Fake testimonials removed. Social proof should only come from
//    real, verifiable sources (e.g., connected via Supabase reviews table).
//  - Cards link to /courses/[slug] — never directly to /signup.
// =============================================
import type { Metadata } from "next";
import Link from "next/link";
import {
  Palette, Image, Layers, Wand2, Sparkles, Zap, Brain,
  Building2, ArrowRight, Clock, Star, Users, Play, CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getCoursesByCategory, type Course } from "@/lib/data/courses";

export const metadata: Metadata = {
  title: "AI Design & Automation Academy — MG Creative Labs",
  description:
    "Master UI/UX, Figma, design systems, branding, and workflow automation with structured courses and real projects.",
  openGraph: {
    title: "AI Design & Automation Academy — MG Creative Labs",
    description:
      "No design degree needed. Create stunning visuals, brands, and automated workflows with AI.",
    type: "website",
  },
};

// ─── Icon map ────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  palette:    Palette,
  image:      Image,
  layers:     Layers,
  "pen-tool": Wand2,
  sparkles:   Sparkles,
  zap:        Zap,
  workflow:   Zap,
  brain:      Brain,
  building:   Building2,
};

function CourseIcon({ iconKey, className }: { iconKey: string; className?: string }) {
  const Icon = ICON_MAP[iconKey] ?? Palette;
  return <Icon className={className} />;
}

function LevelBadge({ level }: { level: Course["level"] }) {
  const variant =
    level === "Beginner" ? "blue" : level === "Advanced" ? "purple" : "default";
  return <Badge variant={variant} size="sm">{level}</Badge>;
}

// ─── Skills list — drawn from actual course objectives ────────────────────────
const SKILLS = [
  "Design high-converting UI layouts from first principles",
  "Build interactive Figma prototypes with variants and auto layout",
  "Create scalable design systems used by product teams",
  "Build a complete brand identity including logo, palette, and type",
  "Automate repetitive work with no-code tools (Zapier, Make, n8n)",
  "Map and systematically eliminate operational bottlenecks",
  "Integrate AI into your productivity and creative workflows",
  "Design and present professional deliverables for clients",
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AIDesignAcademyPage() {
  const courses = getCoursesByCategory("design");

  const totalLessons = courses.reduce(
    (acc, c) => acc + c.modules.reduce((a, m) => a + m.lessons.length, 0),
    0
  );

  return (
    <div className="min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        <Badge variant="purple" className="mb-5">
          <Palette className="h-3 w-3" /> Creative &amp; Automation
        </Badge>
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-5 leading-tight">
          Design &amp; Automation{" "}
          <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
            Academy
          </span>
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed mb-8">
          No design degree needed. Create stunning visuals, brand identities,
          and powerful automations — then get paid for them.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup">
            <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Start creating free
            </Button>
          </Link>
          <Link href="/prompt-library">
            <Button size="lg" variant="secondary">
              Browse design prompts
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
        <div className="mb-8">
          <Badge variant="blue" className="mb-3">Curriculum</Badge>
          <h2 className="text-2xl font-bold text-white">All Courses</h2>
          <p className="text-gray-500 text-sm mt-1">
            Design. Brand. Automate. Each course is standalone — start anywhere.
          </p>
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
                  <div className="p-2.5 rounded-xl bg-white/10 group-hover:bg-pink-500/20 transition-colors">
                    <CourseIcon iconKey={course.iconKey} className="h-5 w-5 text-pink-400" />
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

                <h3 className="font-semibold text-white text-lg mb-2 group-hover:text-pink-300 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 flex-1 leading-relaxed">
                  {course.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {course.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-pink-400/80 bg-pink-500/10 px-2 py-0.5 rounded-md border border-pink-500/20"
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

                <span className="text-sm text-pink-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  {course.isFree ? "Start free course" : "View course"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Skills overview ──────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="purple" className="mb-4">Skills you will master</Badge>
            <h2 className="text-3xl font-bold text-white mb-4">
              From zero to{" "}
              <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                professional designer
              </span>
              {" "}— with AI
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Every skill is taught with hands-on projects and real-world
              examples. You will not just watch — you will create and ship.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/signup">
                <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Start for free
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="secondary">
                  View plans
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            {SKILLS.map((skill, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-pink-500/30 transition-colors"
              >
                <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Premium nudge ────────────────────────────────────────────────── */}
      <section className="py-8 px-4 sm:px-6 max-w-6xl mx-auto pb-24">
        <div className="rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/20 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              Want hands-on guidance with your AI projects?
            </h3>
            <p className="text-gray-400 text-sm max-w-md">
              Our Premium AI Guidance plan provides one-on-one strategic support
              for your design, automation, and AI implementation projects.
            </p>
          </div>
          <Link href="/pricing#premium" className="flex-shrink-0">
            <Button variant="primary" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
              See Premium plan
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
