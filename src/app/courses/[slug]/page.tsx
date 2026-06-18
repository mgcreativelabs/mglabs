import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, Play, Clock, BookOpen, Star, Users, Lock,
  CheckCircle2, ChevronRight, Award,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

// ---------------------------------------------------------------------------
// Course data — in production: supabase.from("courses").select("*, lessons(*)").eq("slug", slug).single()
// ---------------------------------------------------------------------------
const COURSES = [
  {
    slug: "ai-foundations",
    title: "AI Foundations: How LLMs Actually Work",
    description: "Go beyond the hype. Understand transformers, training data, and why GPT-4 does what it does. No PhD required.",
    longDescription: "Most AI courses skip the why and jump straight to the how. This course is different. We start from first principles — what is a neural network, how does attention work, what happens during training — then build up to a practical understanding of how modern LLMs like GPT-4, Claude, and Gemini are designed and what that means for how you use them.",
    level: "Beginner",
    duration: "3h 20m",
    lessons: 12,
    rating: 4.9,
    students: 12840,
    isFree: true,
    category: "learning",
    tags: ["LLMs", "GPT-4", "Claude", "Transformers"],
    instructor: "MG Creative Labs",
    updatedAt: "2025-05-01",
    modules: [
      {
        title: "What is an LLM?",
        lessons: [
          { id: 1, title: "The history of language models", duration: "12:30", isFree: true, completed: false },
          { id: 2, title: "Tokens, embeddings, and vectors", duration: "18:45", isFree: true, completed: false },
          { id: 3, title: "How transformers work (plain English)", duration: "22:10", isFree: false, completed: false },
        ],
      },
      {
        title: "Training and alignment",
        lessons: [
          { id: 4, title: "Pre-training: what the model learns", duration: "16:00", isFree: false, completed: false },
          { id: 5, title: "RLHF: how models learn to be helpful", duration: "14:20", isFree: false, completed: false },
          { id: 6, title: "Why models hallucinate (and how to reduce it)", duration: "19:55", isFree: false, completed: false },
        ],
      },
      {
        title: "Practical model knowledge",
        lessons: [
          { id: 7, title: "GPT-4 vs Claude vs Gemini: real differences", duration: "24:10", isFree: false, completed: false },
          { id: 8, title: "Context windows and memory", duration: "11:30", isFree: false, completed: false },
          { id: 9, title: "Temperature, top-p, and sampling", duration: "15:00", isFree: false, completed: false },
          { id: 10, title: "Fine-tuning vs RAG vs prompting", duration: "20:40", isFree: false, completed: false },
          { id: 11, title: "The future: multimodal and agents", duration: "18:20", isFree: false, completed: false },
          { id: 12, title: "Final project: build your AI knowledge base", duration: "35:00", isFree: false, completed: false },
        ],
      },
    ],
    whatYoullLearn: [
      "Understand how transformer architecture enables modern AI",
      "Know the real differences between leading AI models",
      "Debug AI failures with a mental model of how LLMs work",
      "Make informed decisions about which model to use for which task",
      "Understand training, alignment, and why models behave as they do",
      "Explain LLMs clearly to non-technical colleagues",
    ],
  },
  {
    slug: "prompt-engineering-masterclass",
    title: "Prompt Engineering Masterclass",
    description: "The complete guide to writing prompts that get 10x better results. Chain-of-thought, system prompts, few-shot, and more.",
    longDescription: "Prompting is a skill. And like any skill, there's a gap between people who've systematically studied it and those who wing it. This course closes that gap. You'll learn every major prompting technique, when to use it, and how to build a personal prompt library that compounds over time.",
    level: "Intermediate",
    duration: "5h 45m",
    lessons: 22,
    rating: 4.9,
    students: 21300,
    isFree: true,
    category: "learning",
    tags: ["Prompts", "ChatGPT", "Chain-of-thought"],
    instructor: "MG Creative Labs",
    updatedAt: "2025-05-15",
    modules: [
      {
        title: "Foundations",
        lessons: [
          { id: 1, title: "Why most prompts fail", duration: "10:00", isFree: true, completed: false },
          { id: 2, title: "The anatomy of a great prompt", duration: "15:30", isFree: true, completed: false },
          { id: 3, title: "Role prompting and system prompts", duration: "20:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Core techniques",
        lessons: [
          { id: 4, title: "Chain-of-thought prompting", duration: "18:00", isFree: false, completed: false },
          { id: 5, title: "Few-shot examples", duration: "16:20", isFree: false, completed: false },
          { id: 6, title: "Output formatting and constraints", duration: "14:10", isFree: false, completed: false },
          { id: 7, title: "Tree-of-thought and self-consistency", duration: "22:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Advanced patterns",
        lessons: [
          { id: 8, title: "Meta-prompting", duration: "19:30", isFree: false, completed: false },
          { id: 9, title: "Prompt chaining for complex tasks", duration: "25:00", isFree: false, completed: false },
          { id: 10, title: "Building a prompt library", duration: "30:00", isFree: false, completed: false },
        ],
      },
    ],
    whatYoullLearn: [
      "Master chain-of-thought, few-shot, and role prompting",
      "Build reusable prompt templates for your workflows",
      "Get consistent, reliable outputs from any AI model",
      "Debug prompts that aren't working the way you expect",
      "Create a personal prompt library that compounds over time",
      "Apply advanced patterns like meta-prompting and prompt chaining",
    ],
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = COURSES.find((c) => c.slug === slug);
  if (!course) return { title: "Course not found" };
  return {
    title: course.title,
    description: course.description,
    openGraph: { title: course.title, description: course.description, type: "website" },
  };
}

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export default async function CourseSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = COURSES.find((c) => c.slug === slug);
  if (!course) notFound();

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const freeLessons = course.modules.flatMap((m) => m.lessons).filter((l) => l.isFree);

  return (
    <div className="pt-16 min-h-screen">
      {/* Header / Hero */}
      <header className="py-14 px-4 sm:px-6 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/ai-learning-hub"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to courses
          </Link>

          <div className="grid lg:grid-cols-[1fr_360px] gap-12 items-start">
            {/* Left: course info */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="blue">{course.level}</Badge>
                {course.isFree && <Badge variant="success">Free</Badge>}
                <Badge variant="default">{course.category}</Badge>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
                {course.title}
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                {course.longDescription}
              </p>

              <div className="flex flex-wrap items-center gap-5 text-sm text-gray-400 mb-6">
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <strong className="text-white">{course.rating}</strong> rating
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-blue-400" />
                  {course.students.toLocaleString()} students
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />{course.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4" />{totalLessons} lessons
                </span>
              </div>

              <p className="text-gray-500 text-sm">
                Created by <span className="text-white">{course.instructor}</span> ·
                Last updated {new Date(course.updatedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </p>
            </div>

            {/* Right: enroll card */}
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] p-6">
                <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-blue-900/40 to-purple-900/40 flex items-center justify-center mb-5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                  <div className="relative w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <Play className="h-6 w-6 text-white ml-1" />
                  </div>
                  <span className="absolute bottom-3 right-3 text-xs text-gray-400 bg-black/40 px-2 py-1 rounded-md">
                    Preview available
                  </span>
                </div>

                <div className="text-3xl font-bold text-white mb-1">
                  {course.isFree ? "Free" : "$29"}
                </div>
                {!course.isFree && (
                  <p className="text-gray-500 text-sm mb-4 line-through">$79</p>
                )}

                <Link href={course.isFree ? `/ai-learning-hub` : `/signup?plan=pro`} className="block mb-3">
                  <Button variant="primary" size="lg" className="w-full justify-center">
                    {course.isFree ? "Start learning free" : "Enroll — $29"}
                    <ChevronRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </Link>

                {!course.isFree && (
                  <Link href="/pricing" className="block mb-4">
                    <Button variant="secondary" size="sm" className="w-full justify-center">
                      Or get Pro — all courses for $9/mo
                    </Button>
                  </Link>
                )}

                <p className="text-center text-gray-600 text-xs mb-5">
                  {course.isFree ? "No credit card needed" : "30-day money-back guarantee"}
                </p>

                <ul className="space-y-2.5 text-sm text-gray-400">
                  {[
                    `${totalLessons} lessons · ${course.duration} total`,
                    "Lifetime access",
                    "Certificate of completion",
                    "Mobile & desktop",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Course content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid lg:grid-cols-[1fr_360px] gap-12">
        
        {/* Left column */}
        <div className="space-y-10">
          
          {/* What you'll learn */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-5">What you&apos;ll learn</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {course.whatYoullLearn.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Curriculum */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold text-white">Curriculum</h2>
              <span className="text-gray-500 text-sm">{totalLessons} lessons · {course.duration}</span>
            </div>

            <div className="space-y-3">
              {course.modules.map((module, mIdx) => (
                <div key={mIdx} className="rounded-xl border border-white/[0.07] overflow-hidden">
                  <div className="px-5 py-4 bg-white/[0.03] flex items-center justify-between">
                    <h3 className="font-semibold text-white text-sm">{module.title}</h3>
                    <span className="text-xs text-gray-500">{module.lessons.length} lessons</span>
                  </div>
                  <ul className="divide-y divide-white/[0.04]">
                    {module.lessons.map((lesson) => (
                      <li key={lesson.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                        <div className="flex-shrink-0">
                          {lesson.isFree ? (
                            <Play className="h-3.5 w-3.5 text-blue-400" />
                          ) : (
                            <Lock className="h-3.5 w-3.5 text-gray-600" />
                          )}
                        </div>
                        <span className={`text-sm flex-1 ${lesson.isFree ? "text-gray-300" : "text-gray-500"}`}>
                          {lesson.title}
                        </span>
                        <div className="flex items-center gap-2.5">
                          {lesson.isFree && (
                            <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">Preview</span>
                          )}
                          <span className="text-xs text-gray-600">{lesson.duration}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-500 mt-4">
              {freeLessons.length} lessons available free · Enroll to unlock the rest
            </p>
          </section>
        </div>

        {/* Right column: tags + related */}
        <aside className="space-y-6 lg:sticky lg:top-24 h-fit">
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.07] p-5">
            <h3 className="font-semibold text-white text-sm mb-3">Topics covered</h3>
            <div className="flex flex-wrap gap-2">
              {course.tags.map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-gray-400 border border-white/[0.08]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-blue-900/30 to-purple-900/20 border border-blue-500/20 p-5">
            <Award className="h-6 w-6 text-yellow-400 mb-3" />
            <h3 className="font-semibold text-white text-sm mb-1.5">Certificate of completion</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Finish all lessons and pass the quiz to earn your MG Creative Labs certificate. Share it on LinkedIn to stand out.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
