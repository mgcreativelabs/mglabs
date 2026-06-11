"use client";
import React from "react";
import Link from "next/link";
import { BookOpen, Sparkles, Code, Palette, ArrowRight, Bookmark, Zap, TrendingUp, Award } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";

const quickLinks = [
  { icon: BookOpen, label: "AI Learning Hub", href: "/ai-learning-hub", color: "text-brand-blue" },
  { icon: Sparkles, label: "Prompt Library", href: "/prompt-library", color: "text-brand-purple" },
  { icon: Code, label: "Coding Academy", href: "/ai-coding-academy", color: "text-cyan-400" },
  { icon: Palette, label: "Design Academy", href: "/ai-design-academy", color: "text-pink-400" },
];

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-8 w-8 rounded-full border-2 border-brand-blue border-t-transparent animate-spin" />
    </div>
  );

  if (!user) {
    if (typeof window !== "undefined") window.location.href = "/login";
    return null;
  }

  const displayName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Creator";

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome back, {displayName.split(" ")[0]} 👋</h1>
            <p className="text-gray-500 text-sm mt-1">{user.email}</p>
          </div>
          <button onClick={() => signOut()} className="px-4 py-2 rounded-xl bg-surface-2 border border-white/10 text-gray-400 text-sm font-medium hover:text-white transition-colors">Sign out</button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Courses started", value: "2", icon: BookOpen, color: "text-brand-blue" },
            { label: "Prompts saved", value: "0", icon: Bookmark, color: "text-brand-purple" },
            { label: "Learning streak", value: "1 day", icon: TrendingUp, color: "text-green-400" },
            { label: "Community posts", value: "0", icon: Zap, color: "text-cyan-400" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-surface-1 border border-white/[0.06] p-5">
              <s.icon className={`h-5 w-5 ${s.color} mb-3`} />
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-gray-600 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <div className="rounded-2xl bg-surface-1 border border-white/[0.06] p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Continue learning</h2>
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
            </div>

            <div className="rounded-2xl bg-surface-1 border border-white/[0.06] p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Saved prompts</h2>
              <div className="text-center py-8">
                <Bookmark className="h-8 w-8 text-gray-700 mx-auto mb-3" />
                <p className="text-gray-600 text-sm">No saved prompts yet.</p>
                <Link href="/prompt-library" className="inline-block mt-3 px-4 py-2 rounded-xl bg-surface-2 border border-white/10 text-gray-300 text-sm hover:border-brand-blue/30 transition-all">Browse prompts</Link>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl bg-gradient-brand-subtle border border-brand-blue/20 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Award className="h-5 w-5 text-brand-blue" />
                <span className="text-sm font-semibold text-white">Getting started</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">Complete your first lesson to start your learning streak!</p>
              <Link href="/ai-learning-hub" className="inline-flex items-center gap-1.5 mt-4 text-sm text-brand-blue hover:underline font-medium">
                Start learning <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-surface-1 border border-brand-purple/20 p-5">
              <h3 className="text-sm font-semibold text-white mb-2">Upgrade to Pro</h3>
              <ul className="text-xs text-gray-500 space-y-1.5 mb-4">
                {["All premium courses", "Unlimited saved prompts", "Priority community access", "Early feature access"].map((p) => (
                  <li key={p}>✅ {p}</li>
                ))}
              </ul>
              <button className="w-full py-2.5 rounded-xl bg-gradient-brand text-white text-sm font-semibold hover:scale-[1.02] transition-all">
                Upgrade — $9/mo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}