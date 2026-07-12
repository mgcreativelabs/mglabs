"use client";
import React from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import {
  BookOpen, Sparkles, Code, Palette, ArrowRight,
  Bookmark, Settings, TrendingUp, Award, Zap, Play,
} from "lucide-react";

interface Enrollment {
  progress_percent: number;
  last_accessed_at: string;
  course: {
    id: string;
    title: string;
    slug: string;
    level: string;
    lessons_count: number;
  } | null;
}

interface SavedPrompt {
  prompt: {
    title: string;
    category: string;
    difficulty: string;
  } | null;
}

interface DashboardClientProps {
  user: User;
  profile: Record<string, unknown> | null;
  savedPrompts: SavedPrompt[];
  enrollments: Enrollment[];
  savedPromptsCount: number;
}

const quickLinks = [
  { icon: BookOpen, label: "AI Learning Hub", href: "/ai-learning-hub", color: "text-blue-400" },
  { icon: Sparkles, label: "Prompt Library", href: "/prompt-library", color: "text-indigo-500" },
  { icon: Code, label: "Coding Academy", href: "/ai-coding-academy", color: "text-cyan-400" },
  { icon: Palette, label: "Design Academy", href: "/ai-design-academy", color: "text-pink-400" },
];

export function DashboardClient({
  user,
  profile,
  savedPrompts,
  enrollments,
  savedPromptsCount,
}: DashboardClientProps) {
  const displayName = (profile?.full_name as string) || user.email?.split("@")[0] || "Creator";
  const tier = (profile?.subscription_tier as string) || "free";
  const streak = (profile?.streak_count as number) ?? 0;
  const avatarUrl = (profile?.avatar_url as string | null) ?? undefined;

  const stats = [
    { label: "Prompts saved", value: savedPromptsCount, icon: Bookmark, color: "text-blue-400" },
    { label: "Courses enrolled", value: enrollments.length, icon: BookOpen, color: "text-indigo-500" },
    {
      label: "Avg. progress",
      value: enrollments.length
        ? `${Math.round(enrollments.reduce((s, e) => s + e.progress_percent, 0) / enrollments.length)}%`
        : "—",
      icon: Zap,
      color: "text-cyan-400",
    },
    {
      label: "Learning streak",
      value: streak > 0 ? `${streak} day${streak !== 1 ? "s" : ""}` : "Start today",
      icon: TrendingUp,
      color: "text-green-400",
    },
  ];

  const streakDots = Math.min(streak, 7);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <Avatar fallback={displayName} src={avatarUrl} size="lg" />
            <div>
              <h1 className="text-2xl font-bold text-ink">
                Welcome back, {displayName.split(" ")[0]} 👋
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-ink-2">{user.email}</span>
                <Badge variant={tier === "pro" ? "gradient" : "default"} size="sm">
                  {tier === "pro" ? "Pro" : "Free plan"}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard/settings">
              <Button variant="secondary" size="sm">
                <Settings className="h-4 w-4 mr-2" /> Settings
              </Button>
            </Link>
            {tier === "free" && (
              <Link href="/pricing">
                <Button variant="primary" size="sm">
                  <Zap className="h-4 w-4 mr-2" /> Upgrade to Pro
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              <Card className="border border-border bg-surface-2 p-4 hover:bg-surface-2 transition-colors cursor-pointer h-full">
                <link.icon className={`h-6 w-6 ${link.color} mb-2`} />
                <p className="text-sm font-semibold text-ink">{link.label}</p>
              </Card>
            </Link>
          ))}
        </div>

        {/* Real stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="border border-border bg-surface-2 p-4">
              <stat.icon className={`h-5 w-5 ${stat.color} mb-2`} />
              <p className="text-2xl font-bold text-ink">{stat.value}</p>
              <p className="text-xs text-ink-2">{stat.label}</p>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Courses in progress */}
            <Card className="border border-border bg-surface-2 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-ink">Your courses</h3>
                <Link href="/courses">
                  <Button variant="ghost" size="sm">
                    Browse all <ArrowRight className="h-3.5 w-3.5 ml-2" />
                  </Button>
                </Link>
              </div>

              {enrollments.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="h-8 w-8 text-ink-muted mx-auto mb-3" />
                  <p className="text-ink-2 text-sm mb-1">You haven&apos;t enrolled in any courses yet.</p>
                  <Link href="/courses">
                    <Button variant="secondary" size="sm" className="mt-3">Browse courses</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {enrollments.map((enrollment, i) => (
                    enrollment.course && (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-surface-2 border border-border">
                        <div className="h-9 w-9 rounded-lg bg-brand-blue/20 flex items-center justify-center flex-shrink-0">
                          <Play className="h-4 w-4 text-brand-blue" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-ink truncate font-medium">{enrollment.course.title}</p>
                          <div className="mt-1.5 flex items-center gap-2">
                            <div className="flex-1 h-1 rounded-full bg-surface-2">
                              <div
                                className="h-1 rounded-full bg-brand-blue transition-all"
                                style={{ width: `${enrollment.progress_percent}%` }}
                              />
                            </div>
                            <span className="text-xs text-ink-muted flex-shrink-0">
                              {enrollment.progress_percent}%
                            </span>
                          </div>
                        </div>
                        <Link href={`/courses/${enrollment.course.slug}`}>
                          <Button variant="ghost" size="sm">Continue</Button>
                        </Link>
                      </div>
                    )
                  ))}
                </div>
              )}
            </Card>

            {/* Saved Prompts */}
            <Card className="border border-border bg-surface-2 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-ink">Saved prompts</h3>
                <Link href="/prompt-library">
                  <Button variant="ghost" size="sm">
                    Browse all <ArrowRight className="h-3.5 w-3.5 ml-2" />
                  </Button>
                </Link>
              </div>

              {savedPrompts.length === 0 ? (
                <div className="text-center py-8">
                  <Bookmark className="h-8 w-8 text-ink-muted mx-auto mb-3" />
                  <p className="text-ink-2 text-sm">No saved prompts yet.</p>
                  <Link href="/prompt-library">
                    <Button variant="secondary" size="sm" className="mt-3">Browse prompts</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {savedPrompts.slice(0, 4).map((sp, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-surface-2 border border-border">
                      <Sparkles className="h-4 w-4 text-indigo-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-ink truncate">{sp.prompt?.title ?? "Untitled"}</p>
                        <p className="text-xs text-ink-muted">{sp.prompt?.category ?? ""}</p>
                      </div>
                      <Badge variant="default" size="sm">{sp.prompt?.difficulty ?? "beginner"}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Streak widget */}
            <Card className="border border-blue-500/20 bg-blue-500/5 p-4">
              <div className="flex items-center gap-3 mb-3">
                <Award className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-semibold text-ink">Learning streak</span>
              </div>
              {streak > 0 ? (
                <p className="text-ink-2 text-sm">
                  You&apos;re on a <strong className="text-ink">{streak}-day streak</strong> — keep it up!
                </p>
              ) : (
                <p className="text-ink-2 text-sm">
                  Visit the dashboard each day to build your learning streak.
                </p>
              )}
              <div className="flex gap-1 mt-3">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full ${i < streakDots ? "bg-blue-500" : "bg-surface-2"}`}
                  />
                ))}
              </div>
            </Card>

            {/* Upgrade CTA */}
            {tier === "free" && (
              <Card className="border border-indigo-200 bg-indigo-50 p-4">
                <h3 className="text-sm font-semibold text-ink mb-2">Unlock Pro</h3>
                <ul className="text-xs text-ink-2 space-y-1.5 mb-4">
                  <li>✅ All premium courses</li>
                  <li>✅ Unlimited saved prompts</li>
                  <li>✅ Priority community access</li>
                  <li>✅ Early feature access</li>
                </ul>
                <Link href="/pricing">
                  <Button variant="primary" size="sm" className="w-full">
                    View pricing
                  </Button>
                </Link>
              </Card>
            )}

            {/* Quick actions */}
            <Card className="border border-border bg-surface-2 p-4">
              <h3 className="text-sm font-semibold text-ink mb-3">Quick actions</h3>
              <div className="space-y-2">
                <Link href="/dashboard/account" className="flex items-center gap-2 text-sm text-ink-2 hover:text-ink transition-colors py-1">
                  <Settings className="h-4 w-4" /> Edit profile
                </Link>
                <Link href="/community" className="flex items-center gap-2 text-sm text-ink-2 hover:text-ink transition-colors py-1">
                  <Zap className="h-4 w-4" /> Community
                </Link>
                <Link href="/prompt-library" className="flex items-center gap-2 text-sm text-ink-2 hover:text-ink transition-colors py-1">
                  <Sparkles className="h-4 w-4" /> Explore prompts
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
