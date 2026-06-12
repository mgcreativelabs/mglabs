"use client";
import React, { useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  BookOpen, Sparkles, Code, Palette, ArrowRight,
  Bookmark, Settings, Bell, TrendingUp, Award, Zap
} from "lucide-react";

interface DashboardClientProps {
  user: User;
  profile: Record<string, unknown> | null;
  savedPrompts: Record<string, unknown>[];
}

const quickLinks = [
  { icon: BookOpen, label: "AI Learning Hub", href: "/ai-learning-hub", color: "text-brand-blue" },
  { icon: Sparkles, label: "Prompt Library", href: "/prompt-library", color: "text-brand-purple" },
  { icon: Code, label: "Coding Academy", href: "/ai-coding-academy", color: "text-cyan-400" },
  { icon: Palette, label: "Design Academy", href: "/ai-design-academy", color: "text-pink-400" },
];

const recentActivity = [
  { action: "Saved prompt", item: "Expert Blog Post Writer", time: "2h ago", icon: Bookmark },
  { action: "Completed lesson", item: "Prompt Engineering Masterclass — Ch. 3", time: "1d ago", icon: BookOpen },
  { action: "Joined discussion", item: "Best Midjourney prompts for product photography", time: "2d ago", icon: Zap },
];

export function DashboardClient({ user, profile, savedPrompts }: DashboardClientProps) {
  const displayName = (profile?.full_name as string) || user.email?.split("@")[0] || "Creator";
  const tier = (profile?.subscription_tier as string) || "free";

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <Avatar fallback={displayName} size="lg" />
            <div>
              <h1 className="text-2xl font-display font-bold text-white">
                Welcome back, {displayName.split(" ")[0]} 👋
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-500">{user.email}</span>
                <Badge variant={tier === "pro" ? "gradient" : "default"} size="sm">
                  {tier === "pro" ? "Pro" : "Free plan"}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/settings">
              <Button variant="secondary" size="sm" leftIcon={<Settings className="h-4 w-4" />}>Settings</Button>
            </Link>
            {tier === "free" && (
              <Button variant="primary" size="sm" leftIcon={<Zap className="h-4 w-4" />}>
                Upgrade to Pro
              </Button>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Prompts saved", value: savedPrompts.length, icon: Bookmark, color: "text-brand-blue" },
            { label: "Courses started", value: "2", icon: BookOpen, color: "text-brand-purple" },
            { label: "Community posts", value: "5", icon: Zap, color: "text-cyan-400" },
            { label: "Learning streak", value: "7 days", icon: TrendingUp, color: "text-green-400" },
          ].map((stat) => (
            <Card key={stat.label} className="glass border border-white/[0.06]" padding="md">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-display font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-600 mt-0.5">{stat.label}</div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick links */}
            <Card className="border border-white/[0.06]" padding="lg">
              <CardTitle className="mb-4">Continue learning</CardTitle>
              <div className="grid grid-cols-2 gap-3">
                {quickLinks.map(({ icon: Icon, label, href, color }) => (
                  <Link key={href} href={href}>
                    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-2 border border-white/[0.04] hover:border-brand-blue/30 hover:bg-surface-3 transition-all group">
                      <Icon className={`h-5 w-5 ${color}`} />
                      <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{label}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-gray-600 group-hover:text-brand-blue ml-auto transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </Card>

            {/* Saved prompts */}
            <Card className="border border-white/[0.06]" padding="lg">
              <div className="flex items-center justify-between mb-4">
                <CardTitle>Saved prompts</CardTitle>
                <Link href="/prompt-library">
                  <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                    Browse all
                  </Button>
                </Link>
              </div>
              {savedPrompts.length === 0 ? (
                <div className="text-center py-8">
                  <Bookmark className="h-8 w-8 text-gray-700 mx-auto mb-3" />
                  <p className="text-gray-600 text-sm">No saved prompts yet.</p>
                  <Link href="/prompt-library">
                    <Button variant="secondary" size="sm" className="mt-3">Browse prompts</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {savedPrompts.slice(0, 4).map((sp: Record<string, unknown>, i) => {
                    const prompt = sp.prompt as Record<string, unknown> | null;
                    return (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-surface-2 border border-white/[0.04]">
                        <Sparkles className="h-4 w-4 text-brand-purple flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-300 truncate">{(prompt?.title as string) || "Untitled prompt"}</p>
                          <p className="text-xs text-gray-600">{(prompt?.category as string) || ""}</p>
                        </div>
                        <Badge variant="default" size="sm">{(prompt?.difficulty as string) || "beginner"}</Badge>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Achievement */}
            <Card className="bg-gradient-brand-subtle border border-brand-blue/20" padding="md">
              <div className="flex items-center gap-3 mb-3">
                <Award className="h-5 w-5 text-brand-blue" />
                <span className="text-sm font-semibold text-white">This week</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                You&apos;ve been on a <strong className="text-white">7-day learning streak</strong>! Keep it going.
              </p>
              <div className="flex gap-1 mt-3">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className={`h-2 flex-1 rounded-full ${i < 7 ? "bg-brand-blue" : "bg-surface-3"}`} />
                ))}
              </div>
            </Card>

            {/* Recent activity */}
            <Card className="border border-white/[0.06]" padding="md">
              <CardTitle className="mb-4">Recent activity</CardTitle>
              <div className="space-y-3">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-7 w-7 rounded-lg bg-surface-3 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-3.5 w-3.5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{item.action}</p>
                      <p className="text-xs text-gray-600 line-clamp-1">{item.item}</p>
                      <p className="text-[10px] text-gray-700 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Upgrade CTA if free */}
            {tier === "free" && (
              <Card className="border border-brand-purple/20 bg-brand-purple/5" padding="md">
                <h3 className="text-sm font-semibold text-white mb-2">Unlock Pro</h3>
                <ul className="text-xs text-gray-500 space-y-1.5 mb-4">
                  <li>✅ All premium courses</li>
                  <li>✅ Unlimited saved prompts</li>
                  <li>✅ Priority community access</li>
                  <li>✅ Early feature access</li>
                </ul>
                <Button variant="primary" size="sm" className="w-full">
                  Upgrade — $9/mo
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
