"use client";
import React, { useState } from "react";
import { Search, Copy, Bookmark, Star } from "lucide-react";

const PROMPTS = [
  { id: "1", title: "Expert Blog Post Writer", desc: "Write SEO-optimized, engaging blog posts that rank and convert.", content: "You are an expert content strategist with 10 years of experience. Write a comprehensive, SEO-optimized blog post about [TOPIC]. The post should be [LENGTH] words, target the keyword [KEYWORD], include [NUMBER] subheadings, use a [TONE] tone, and end with a clear call-to-action.", category: "Writing", difficulty: "Beginner", likes: 2847, model: "GPT-4", featured: true },
  { id: "2", title: "Senior Code Reviewer", desc: "Get expert-level code review with security and performance feedback.", content: "Act as a senior software engineer. Review the following code and provide: 1) Security vulnerabilities, 2) Performance bottlenecks, 3) Code quality issues, 4) Missing edge cases, 5) A refactored version of critical sections.\n\n[PASTE CODE HERE]", category: "Coding", difficulty: "Advanced", likes: 1923, model: "Claude", featured: true },
  { id: "3", title: "Brand Identity Creator", desc: "Generate a complete brand identity including voice, values and visual direction.", content: "You are a world-class brand strategist. Create a complete brand identity for [COMPANY NAME] — a [BUSINESS TYPE] targeting [AUDIENCE]. Include: 1) Brand tagline options, 2) Brand personality, 3) Voice guidelines with examples, 4) Core values, 5) Visual direction, 6) Brand story.", category: "Business", difficulty: "Intermediate", likes: 1542, model: "GPT-4", featured: false },
  { id: "4", title: "Midjourney Prompt Master", desc: "Generate stunning, detailed Midjourney prompts for any visual style.", content: "Generate a detailed Midjourney prompt for: [DESCRIPTION]. Include subject details, artistic style references, lighting, color palette, camera perspective, quality modifiers. Format: [subject], [style], [lighting], [colors], [perspective], --ar 16:9 --v 6 --q 2", category: "Design", difficulty: "Beginner", likes: 3210, model: "Midjourney", featured: true },
  { id: "5", title: "Email Campaign Strategist", desc: "Write high-converting email sequences that open, engage and convert.", content: "You are a conversion copywriter with proven 40%+ open rates. Write a [NUMBER]-email sequence for [PRODUCT] targeting [AUDIENCE]. Each email needs: subject line + preview text, personalized opening, value-driven body, clear CTA, P.S. line.", category: "Marketing", difficulty: "Intermediate", likes: 1876, model: "Claude", featured: false },
  { id: "6", title: "Python Automation Builder", desc: "Build production-ready Python scripts to automate repetitive tasks.", content: "You are a Python automation expert. Create a production-ready script that [TASK]. Requirements: Python 3.10+ syntax, error handling and logging, type hints, configurable via environment variables, requirements.txt, docstrings, README with usage instructions.", category: "Coding", difficulty: "Intermediate", likes: 1654, model: "GPT-4", featured: false },
];

const CATEGORIES = ["All", "Writing", "Coding", "Design", "Business", "Marketing"];

function PromptCard({ prompt }: { prompt: typeof PROMPTS[0] }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex flex-col rounded-2xl bg-surface-1 border border-white/[0.06] hover:border-brand-blue/30 transition-all overflow-hidden">
      <div className="p-5 flex-1">
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className="text-xs px-2 py-1 rounded-full bg-brand-blue/10 text-brand-blue border border-brand-blue/20 font-medium">{prompt.category}</span>
          <span className={`text-xs px-2 py-1 rounded-full border font-medium ${prompt.difficulty === "Beginner" ? "bg-green-500/10 text-green-400 border-green-500/20" : prompt.difficulty === "Advanced" ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}>
            {prompt.difficulty}
          </span>
          {prompt.featured && (
            <span className="text-xs px-2 py-1 rounded-full bg-gradient-brand text-white font-medium flex items-center gap-1">
              <Star className="h-2.5 w-2.5" /> Featured
            </span>
          )}
          <span className="text-xs text-gray-600 font-mono ml-auto">{prompt.model}</span>
        </div>
        <h3 className="font-semibold text-white mb-2">{prompt.title}</h3>
        <p className="text-gray-500 text-sm mb-4">{prompt.desc}</p>
        <div className="bg-surface-2 rounded-xl p-3 border border-white/[0.04]">
          <p className="text-xs text-gray-500 font-mono line-clamp-3">{prompt.content}</p>
        </div>
      </div>
      <div className="border-t border-white/[0.04] p-4 flex items-center justify-between">
        <span className="text-xs text-gray-600">❤️ {prompt.likes.toLocaleString()}</span>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-surface-3 transition-colors">
            <Bookmark className="h-4 w-4" />
          </button>
          <button
            onClick={() => { navigator.clipboard.writeText(prompt.content); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${copied ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-gradient-brand text-white hover:scale-[1.02]"}`}>
            <Copy className="h-3.5 w-3.5" />{copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PromptLibraryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = PROMPTS.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="pt-16 min-h-screen">
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center mesh-bg">
        <span className="inline-block px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-sm font-medium mb-4">Free to use</span>
        <h1 className="text-5xl font-bold text-white mb-4">Prompt <span className="text-gradient">Library</span></h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">1,200+ hand-crafted prompts for every use case. Copy and get results in seconds.</p>
      </section>

      <div className="sticky top-16 z-40 bg-surface/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            <input placeholder="Search prompts..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 rounded-xl bg-surface-2 border border-white/10 text-gray-100 placeholder:text-gray-600 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-blue/60 focus:ring-2 focus:ring-brand-blue/20" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCategory(c)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${category === c ? "bg-brand-blue text-white" : "text-gray-500 hover:text-gray-300 hover:bg-surface-3"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 pb-20">
        <p className="text-sm text-gray-600 mb-6">Showing <span className="text-gray-300 font-medium">{filtered.length}</span> prompts</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((prompt) => <PromptCard key={prompt.id} prompt={prompt} />)}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No prompts found.</p>
            <button onClick={() => { setSearch(""); setCategory("All"); }} className="mt-4 text-brand-blue hover:underline text-sm">Clear filters</button>
          </div>
        )}
      </div>
    </div>
  );
}