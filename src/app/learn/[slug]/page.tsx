import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, Clock, CheckCircle2, BookOpen, Code } from "lucide-react";
import { lessons, getLessonBySlug, getNextLesson } from "@/lib/data/lessons";
import { Badge } from "@/components/ui/Badge";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return lessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) return { title: "Lesson not found" };
  return {
    title: `Lesson ${lesson.number}: ${lesson.title} | MG Labs`,
    description: lesson.tagline,
  };
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) notFound();

  const nextLesson = getNextLesson(slug);
  const currentIndex = lessons.findIndex((l) => l.slug === slug);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : undefined;

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-20">

        {/* ── Breadcrumb ── */}
        <div className="flex items-center gap-2 text-sm text-ink-muted mb-10">
          <Link href="/learn" className="hover:text-ink-2 transition-colors flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            Foundation Path
          </Link>
          <span>/</span>
          <span className="text-ink-muted">Lesson {lesson.number}</span>
        </div>

        {/* ── Header ── */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="blue" size="sm">Lesson {lesson.number} of {lessons.length}</Badge>
            <Badge variant={lesson.difficulty === "Beginner" ? "success" : "warning"} size="sm">
              {lesson.difficulty}
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-ink mb-4 leading-tight">
            {lesson.title}
          </h1>
          <p className="text-ink-2 text-xl leading-relaxed mb-5">{lesson.tagline}</p>

          <div className="flex items-center gap-2 text-sm text-ink-muted">
            <Clock className="w-4 h-4" />
            {lesson.duration}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-surface-2 mb-12" />

        {/* ── Content ── */}
        <div className="space-y-10">
          {lesson.sections.map((section, i) => {
            // Plain text section
            if (section.type === "text") {
              return (
                <div key={i}>
                  {section.heading && (
                    <h2 className="text-2xl font-bold text-ink mb-4">{section.heading}</h2>
                  )}
                  {section.body && (
                    <p className="text-ink-2 leading-relaxed text-lg">{section.body}</p>
                  )}
                </div>
              );
            }

            // Highlighted callout
            if (section.type === "highlight") {
              return (
                <div key={i} className="pl-5 border-l-4 border-brand-blue py-1">
                  <p className="text-ink font-medium text-lg leading-relaxed">{section.body}</p>
                </div>
              );
            }

            // Bullet list
            if (section.type === "list") {
              return (
                <div key={i}>
                  {section.heading && (
                    <h3 className="text-lg font-semibold text-ink mb-4">{section.heading}</h3>
                  )}
                  <ul className="space-y-3">
                    {section.items?.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-ink-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-1" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }

            // Code block
            if (section.type === "code") {
              return (
                <div key={i}>
                  {section.heading && (
                    <h3 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
                      <Code className="w-4 h-4 text-brand-blue" />
                      {section.heading}
                    </h3>
                  )}
                  <div className="rounded-xl bg-surface-1 border border-border overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                      <div className="w-3 h-3 rounded-full bg-red-500/60" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                      <div className="w-3 h-3 rounded-full bg-green-500/60" />
                    </div>
                    <pre className="p-5 overflow-x-auto text-sm text-ink-2 leading-relaxed">
                      <code>{section.code}</code>
                    </pre>
                  </div>
                </div>
              );
            }

            // Exercise
            if (section.type === "exercise") {
              return (
                <div key={i} className="p-6 rounded-2xl bg-brand-blue/5 border border-brand-blue/20">
                  <div className="flex items-center gap-2 text-brand-blue font-bold text-sm uppercase tracking-wider mb-3">
                    <span>✏️</span>
                    {section.heading ?? "Exercise"}
                  </div>
                  <p className="text-ink-2 leading-relaxed">{section.body}</p>
                </div>
              );
            }

            return null;
          })}
        </div>

        {/* ── Wall CTA (lesson 5 only) ── */}
        {lesson.wall && (
          <div className="mt-16 rounded-2xl bg-brand-blue/5 border-2 border-brand-blue/30 p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-brand-blue/30" />
            <div className="text-4xl mb-4">🚀</div>
            <h2 className="text-2xl font-bold text-ink mb-3">
              Ready to turn this into a real product?
            </h2>
            <p className="text-ink-2 max-w-md mx-auto mb-6 text-sm leading-relaxed">
              The Launch Program takes you from what you&apos;ve learned here to a deployed AI
              product — with your idea, your design, your URL. In 4 weeks with expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/pricing#launch"
                className="px-6 py-3 rounded-xl font-semibold text-sm bg-brand-blue text-white hover:bg-brand-blue-hover hover:scale-[1.02] transition-all flex items-center gap-2 justify-center"
              >
                Apply for Launch Program — $500
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl font-medium text-sm text-ink-2 border border-border hover:border-border-strong hover:text-ink transition-all text-center"
              >
                Ask a question first
              </Link>
            </div>
          </div>
        )}

        {/* ── Navigation ── */}
        <div className="flex items-center justify-between mt-16 pt-8 border-t border-border">
          {prevLesson ? (
            <Link
              href={`/learn/${prevLesson.slug}`}
              className="flex items-center gap-2 text-ink-2 hover:text-ink transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <div className="text-left">
                <div className="text-xs text-ink-muted">Previous</div>
                <div className="text-sm font-medium">{prevLesson.title}</div>
              </div>
            </Link>
          ) : (
            <Link href="/learn" className="flex items-center gap-2 text-ink-muted hover:text-ink-2 text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" />
              All lessons
            </Link>
          )}

          {nextLesson && !lesson.wall ? (
            <Link
              href={`/learn/${nextLesson.slug}`}
              className="flex items-center gap-2 text-brand-blue hover:text-ink transition-colors group"
            >
              <div className="text-right">
                <div className="text-xs text-ink-muted">Next lesson</div>
                <div className="text-sm font-medium">{nextLesson.title}</div>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : !lesson.wall && (
            <Link
              href="/learn"
              className="text-sm text-ink-muted hover:text-ink-2 transition-colors"
            >
              Back to all lessons
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
