// =============================================
// PROMPT LIBRARY CLIENT — src/app/prompt-library/PromptLibraryClient.tsx
// =============================================
"use client";

import React, { useState } from "react";
import { Search, Copy, Heart, Bookmark, Star } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { capitalizeFirst, formatNumber } from "@/lib/utils/format";
import type { PromptCategory } from "@/types";

const CATEGORIES: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "writing", label: "Writing" },
  { value: "coding", label: "Coding" },
  { value: "design", label: "Design" },
  { value: "business", label: "Business" },
  { value: "education", label: "Education" },
  { value: "marketing", label: "Marketing" },
  { value: "productivity", label: "Productivity" },
  { value: "creativity", label: "Creativity" },
  { value: "research", label: "Research" },
];

const DIFFICULTIES = [
  { value: "all", label: "All levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const MOCK_PROMPTS = [
  {
    id: "1",
    title: "Expert Blog Post Writer",
    description: "Write SEO-optimized, engaging blog posts that rank and convert.",
    content: "You are an expert content strategist and copywriter with 10 years of experience writing viral blog posts. Your task is to write a comprehensive, SEO-optimized blog post about [TOPIC]. The post should be [LENGTH] words, target the keyword [KEYWORD], include [NUMBER] subheadings, use a [TONE] tone, and end with a clear call-to-action. Structure it with an attention-grabbing intro, valuable body content with real examples, and a memorable conclusion.",
    category: "writing" as PromptCategory,
    tags: ["SEO", "content", "blogging"],
    difficulty: "beginner" as const,
    likes_count: 2847,
    saves_count: 1203,
    is_featured: true,
    model: "GPT-4",
  },
  {
    id: "2",
    title: "Senior Code Reviewer",
    description: "Get expert-level code review with security, performance, and maintainability feedback.",
    content: "Act as a senior software engineer with expertise in [LANGUAGE/FRAMEWORK]. Review the following code and provide: 1) Security vulnerabilities and how to fix them, 2) Performance bottlenecks and optimization suggestions, 3) Code quality issues (naming, structure, readability), 4) Missing edge cases and error handling, 5) A refactored version of the most critical sections. Be specific, cite best practices, and explain your reasoning.",
    category: "coding" as PromptCategory,
    tags: ["code review", "security", "performance"],
    difficulty: "advanced" as const,
    likes_count: 1923,
    saves_count: 987,
    is_featured: true,
    model: "Claude",
  },
  {
    id: "3",
    title: "Brand Identity Creator",
    description: "Generate a complete brand identity including voice, values, and visual direction.",
    content: "You are a world-class brand strategist. Create a complete brand identity for [COMPANY NAME] — a [TYPE OF BUSINESS] targeting [TARGET AUDIENCE]. Include: 1) Brand name rationale and tagline options, 2) Brand personality (3-5 adjectives with explanations), 3) Brand voice guidelines with examples, 4) Core values and what they mean in practice, 5) Visual direction (colors, typography style, photography style), 6) Brand story (origin + mission), 7) How to differentiate from [COMPETITORS].",
    category: "business" as PromptCategory,
    tags: ["branding", "identity", "strategy"],
    difficulty: "intermediate" as const,
    likes_count: 1542,
    saves_count: 743,
    is_featured: false,
    model: "GPT-4",
  },
  {
    id: "4",
    title: "Midjourney Prompt Master",
    description: "Generate stunning, detailed Midjourney prompts for any visual style.",
    content: "Generate a detailed Midjourney prompt for: [DESCRIPTION]. The image should be [STYLE], [MOOD], and [SETTING]. Include: subject details, artistic style references (e.g., cinematography, photography style, art movement), lighting (e.g., golden hour, studio lighting, rim lighting), color palette, camera perspective, quality modifiers. Format: [subject], [style], [lighting], [colors], [perspective], [quality tags like --ar 16:9 --v 6 --q 2]",
    category: "design" as PromptCategory,
    tags: ["Midjourney", "image generation", "creative"],
    difficulty: "beginner" as const,
    likes_count: 3210,
    saves_count: 1870,
    is_featured: true,
    model: "Midjourney",
  },
  {
    id: "5",
    title: "Email Campaign Strategist",
    description: "Write high-converting email sequences that open, engage, and convert.",
    content: "You are a conversion copywriter specializing in email marketing with proven 40%+ open rates. Write a [NUMBER]-email sequence for [PRODUCT/SERVICE] targeting [AUDIENCE]. Each email needs: compelling subject line + preview text (A/B variant included), personalized opening that feels human, value-driven body with a single focus, clear CTA with urgency/benefit, P.S. line. The sequence should follow: email 1 (welcome/value), email 2 (education), email 3 (social proof), email 4 (objection handling), email 5 (offer).",
    category: "marketing" as PromptCategory,
    tags: ["email", "copywriting", "conversion"],
    difficulty: "intermediate" as const,
    likes_count: 1876,
    saves_count: 934,
    is_featured: false,
    model: "Claude",
  },
  {
    id: "6",
    title: "Python Automation Builder",
    description: "Build Python scripts to automate repetitive tasks in minutes.",
    content: "You are a Python automation expert. Create a Python script that [TASK DESCRIPTION]. Requirements: use modern Python 3.10+ syntax, include error handling and logging, add type hints throughout, make it configurable via environment variables or a config file, include a requirements.txt, write docstrings for all functions, add a README with usage instructions. Make it production-ready — not a prototype.",
    category: "coding" as PromptCategory,
    tags: ["Python", "automation", "scripting"],
    difficulty: "intermediate" as const,
    likes_count: 1654,
    saves_count: 821,
    is_featured: false,
    model: "GPT-4",
  },
];

function PromptCard({ prompt }: { prompt: typeof MOCK_PROMPTS[0] }) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const difficultyColor = {
    beginner: "success" as const,
    intermediate: "warning" as const,
    advanced: "danger" as const,
  }[prompt.difficulty];

  return (
    <Card className="card-hover border border-white/[0.06] p-6">
      <div className="p-5 flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="blue" size="sm">{capitalizeFirst(prompt.category)}</Badge>
            <Badge variant={difficultyColor} size="sm">{capitalizeFirst(prompt.difficulty)}</Badge>
            {prompt.is_featured && (
              <Badge variant="gradient" size="sm">
                <Star className="h-2.5 w-2.5" /> Featured
              </Badge>
            )}
          </div>
          {prompt.model && (
            <span className="text-xs text-gray-600 font-mono">{prompt.model}</span>
          )}
        </div>

        <h3 className="font-semibold text-white mb-2 leading-tight">{prompt.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">{prompt.description}</p>

        <div className="bg-surface-2 rounded-xl p-3 border border-white/[0.04]">
          <p className="text-xs text-gray-500 leading-relaxed font-mono line-clamp-3">
            {prompt.content}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {prompt.tags.map((tag) => (
            <span key={tag} className="text-xs text-gray-600 bg-surface-3 px-2 py-0.5 rounded-md">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-white/[0.04] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <Heart className="h-3 w-3" /> {formatNumber(prompt.likes_count)}
          </span>
          <span className="flex items-center gap-1">
            <Bookmark className="h-3 w-3" /> {formatNumber(prompt.saves_count)}
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setSaved(!saved)}
            className={saved ? "text-brand-purple" : ""}
            title="Save prompt"
          >
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button
            variant={copied ? "secondary" : "primary"}
            size="sm"
            onClick={handleCopy}
            leftIcon={<Copy className="h-3.5 w-3.5" />}
          >
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function PromptLibraryClient() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const handleSearch = (value: string) => {
    setSearch(value);
    clearTimeout((window as any)._searchTimeout);
    (window as any)._searchTimeout = setTimeout(() => setDebouncedSearch(value), 400);
  };

  const filtered = MOCK_PROMPTS.filter((p) => {
    const matchesCategory = category === "all" || p.category === category;
    const matchesDifficulty = difficulty === "all" || p.difficulty === difficulty;
    const matchesSearch =
      !debouncedSearch ||
      p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      p.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(debouncedSearch.toLowerCase()));
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="py-16 px-4 sm:px-6 text-center max-w-4xl mx-auto mesh-bg">
        <Badge variant="purple" className="mb-4">Free to use</Badge>
        <h1 className="text-5xl font-display font-bold text-white mb-4">
          Prompt <span className="text-gradient">Library</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Hand-crafted prompts for every use case. Copy, customize, and get results in seconds.
        </p>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-40 bg-surface/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          {/* Search + difficulty row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Search prompts..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
              className="flex-1"
            />
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="h-11 px-4 rounded-xl bg-surface-2 border border-white/10 text-gray-300 text-sm focus:outline-none focus:border-brand-blue/60 min-w-[140px]"
            >
              {DIFFICULTIES.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </div>
          {/* Category pill row — single source of truth for category filter */}
          <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  category === c.value
                    ? "bg-brand-blue text-white"
                    : "text-gray-500 hover:text-gray-300 hover:bg-surface-3"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-600">
            Showing <span className="text-gray-300 font-medium">{filtered.length}</span> of{" "}
            <span className="text-gray-300 font-medium">{MOCK_PROMPTS.length}</span> prompts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No prompts found for your search.</p>
            <Button
              variant="ghost"
              className="mt-4"
              onClick={() => { setSearch(""); setCategory("all"); setDifficulty("all"); }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}