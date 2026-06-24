// =============================================
// COURSE DETAIL PAGE — src/app/courses/[slug]/page.tsx
// Reads from the central course catalog in src/lib/data/courses.ts
// =============================================
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, Play, Clock, BookOpen, Star, Users, Lock,
  CheckCircle2, ChevronRight, Award,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ALL_COURSES,
  getCourseBySlug,
  CATEGORY_HREF,
  CATEGORY_LABEL,
} from "@/lib/data/courses";

export function generateStaticParams() {
  return ALL_COURSES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return { title: "Course not found" };
  return {
    title: `${course.title} — MG Creative Labs`,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      type: "website",
    },
  };
}

function levelVariant(level: string): "blue" | "purple" | "default" {
  if (level === "Beginner") return "blue";
  if (level === "Advanced") return "purple";
  return "default";
}

export default async function CourseSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const freeLessons  = course.modules.flatMap((m) => m.lessons).filter((l) => l.isFree);
  const backHref     = CATEGORY_HREF[course.category];
  const backLabel    = CATEGORY_LABEL[course.category];

  return (
    <div className="min-h-screen">
      <header className="py-14 px-4 sm:px-6 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {backLabel}
          </Link>

          <div className="grid lg:grid-cols-[1fr_360px] gap-12 items-start">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant={levelVariant(course.level)}>{course.level}</Badge>
                {course.isFree && <Badge variant="success">Free</Badge>}
                <Badge variant="default">{backLabel}</Badge>
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
                  <strong className="text-white">{course.rating}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-blue-400" />
                  {course.students.toLocaleString()} enrolled
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4" />
                  {totalLessons} lessons
                </span>
              </div>

              <p className="text-gray-500 text-sm">
                By <span className="text-white font-medium">{course.instructor}</span>
                {" · "}Updated{" "}
                {new Date(course.updatedAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] p-6">
                <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-blue-900/40 to-purple-900/40 flex items-center justify-center mb-5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                  <div className="relative w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <Play className="h-6 w-6 text-white ml-1" />
                  </div>
                  {freeLessons.length > 0 && (
                    <span className="absolute bottom-3 right-3 text-xs text-gray-300 bg-black/40 px-2 py-1 rounded-md">
                      {freeLessons.length} free preview{freeLessons.length !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>

                <div className="text-3xl font-bold text-white mb-1">
                  {course.isFree ? "Free" : "Pro plan"}
                </div>
                {!course.isFree && (
                  <p className="text-gray-400 text-sm mb-1">
                    Included with{" "}
                    <Link href="/pricing" className="text-blue-400 hover:underline">
                      MG Creative Labs Pro
                    </Link>
                  </p>
                )}

                <Link
                  href={course.isFree ? "/signup" : "/pricing"}
                  className="block mt-4 mb-3"
                >
                  <Button variant="primary" size="lg" className="w-full justify-center">
                    {course.isFree ? "Start learning free" : "Unlock with Pro"}
                    <ChevronRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </Link>

                {course.isFree && (
                  <p className="text-center text-gray-600 text-xs mb-3">
                    No credit card required
                  </p>
                )}

                <ul className="space-y-2.5 text-sm text-gray-400 mt-4">
                  {[
                    `${totalLessons} lessons · ${course.duration} total`,
                    "Lifetime access",
                    "Certificate of completion",
                    "Mobile & desktop",
                    "Progress tracking",
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid lg:grid-cols-[1fr_360px] gap-12">
        <div className="space-y-10">
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

          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold text-white">Curriculum</h2>
              <span className="text-gray-500 text-sm">
                {totalLessons} lessons · {course.duration}
              </span>
            </div>

            <div className="space-y-3">
              {course.modules.map((module, mIdx) => (
                <div key={mIdx} className="rounded-xl border border-white/[0.07] overflow-hidden">
                  <div className="px-5 py-4 bg-white/[0.03] flex items-center justify-between">
                    <h3 className="font-semibold text-white text-sm">{module.title}</h3>
                    <span className="text-xs text-gray-500">
                      {module.lessons.length} lesson{module.lessons.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <ul className="divide-y divide-white/[0.04]">
                    {module.lessons.map((lesson) => (
                      <li
                        key={lesson.id}
                        className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.02] transition-colors"
                      >
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
                            <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                              Preview
                            </span>
                          )}
                          <span className="text-xs text-gray-600">{lesson.duration}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {freeLessons.length > 0 && (
              <p className="text-sm text-gray-500 mt-4">
                {freeLessons.length} lesson{freeLessons.length !== 1 ? "s" : ""} available free · Enroll to unlock the rest
              </p>
            )}
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 h-fit">
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.07] p-5">
            <h3 className="font-semibold text-white text-sm mb-3">Topics covered</h3>
            <div className="flex flex-wrap gap-2">
              {course.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-gray-400 border border-white/[0.08]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-blue-900/30 to-purple-900/20 border border-blue-500/20 p-5">
            <Award className="h-6 w-6 text-yellow-400 mb-3" />
            <h3 className="font-semibold text-white text-sm mb-1.5">Certificate of completion</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Finish all lessons to earn your MG Creative Labs certificate. Share it on LinkedIn to stand out.
            </p>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-purple-900/30 to-blue-900/20 border border-purple-500/20 p-5">
            <h3 className="font-semibold text-white text-sm mb-2">Need personalised guidance?</h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-3">
              Get one-on-one AI mentorship and strategic support with our Premium AI Guidance plan.
            </p>
            <Link href="/pricing#premium">
              <Button variant="secondary" size="sm" className="w-full justify-center text-xs">
                See Premium guidance
              </Button>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
