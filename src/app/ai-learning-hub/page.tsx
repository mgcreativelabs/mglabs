import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Clock, Star, Users, ArrowRight, Brain, Zap, Bot } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Learning Hub",
  description: "Free structured AI courses for beginners and professionals.",
};

const courses = [
  { title: "AI Foundations: How LLMs Actually Work", desc: "Understand transformers, training, and why GPT-4 does what it does.", duration: "3h 20m", lessons: 12, level: "Beginner", rating: 4.9, students: 12840, free: true, icon: Brain },
  { title: "Prompt Engineering Masterclass", desc: "Write prompts that get 10x better results. Chain-of-thought, few-shot, system prompting.", duration: "5h 45m", lessons: 22, level: "Intermediate", rating: 4.9, students: 21300, free: true, icon: Zap },
  { title: "AI Automation with n8n & Make", desc: "Build automated workflows that save hours every week.", duration: "4h 15m", lessons: 16, level: "Intermediate", rating: 4.8, students: 8920, free: true, icon: Bot },
  { title: "Introduction to AI Agents", desc: "Build autonomous AI agents that complete multi-step tasks without supervision.", duration: "6h 30m", lessons: 24, level: "Advanced", rating: 4.8, students: 6430, free: false, icon: Brain },
];

const tools = [
  { name: "ChatGPT", category: "Text Generation", pricing: "freemium", desc: "OpenAI's flagship model. Best for writing, analysis, and coding." },
  { name: "Claude", category: "Text Generation", pricing: "freemium", desc: "Anthropic's model. Exceptional for long documents and nuanced reasoning." },
  { name: "Midjourney", category: "Image Generation", pricing: "paid", desc: "The gold standard for AI art. Photorealistic and artistic styles." },
  { name: "Cursor", category: "Code Generation", pricing: "freemium", desc: "AI-native code editor. The best way to code with AI assistance." },
  { name: "Runway", category: "Video Generation", pricing: "freemium", desc: "Professional AI video generation and editing platform." },
  { name: "Perplexity", category: "Search", pricing: "freemium", desc: "AI-powered search engine with real-time web access." },
];

export default function AILearningHubPage() {
  return (
    <div className="pt-16 min-h-screen">
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center mesh-bg">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-medium mb-5">
          <BookOpen className="h-3.5 w-3.5" /> Free courses
        </span>
        <h1 className="text-5xl font-bold text-white mb-5">AI Learning <span className="text-gradient">Hub</span></h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">Structured courses that take you from AI curious to AI capable. Every course is free and built for 2025.</p>
      </section>

      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Featured Courses</h2>
        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {courses.map((c) => (
            <div key={c.title} className="rounded-2xl bg-surface-1 border border-white/[0.06] p-6 hover:border-brand-blue/30 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-surface-3"><c.icon className="h-5 w-5 text-brand-blue" /></div>
                <div className="flex gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium border ${c.free ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-brand-purple/10 text-brand-purple border-brand-purple/20"}`}>
                    {c.free ? "Free" : "Pro"}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-surface-3 text-gray-400 border border-white/10">{c.level}</span>
                </div>
              </div>
              <h3 className="font-semibold text-white text-lg mb-2">{c.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{c.desc}</p>
              <div className="flex items-center gap-4 text-xs text-gray-600 mb-4 border-t border-white/[0.04] pt-4">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{c.duration}</span>
                <span>{c.lessons} lessons</span>
                <span className="flex items-center gap-1"><Star className="h-3 w-3 text-yellow-400" />{c.rating}</span>
                <span className="flex items-center gap-1"><Users className="h-3 w-3" />{c.students.toLocaleString()}</span>
              </div>
              <Link href="/signup" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-brand text-white text-sm font-semibold hover:scale-[1.02] transition-all">
                {c.free ? "Start free" : "Unlock with Pro"} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-white mb-6" id="tools">AI Tools Directory</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <div key={tool.name} className="glass glass-hover rounded-2xl p-5 border border-white/[0.06]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-white">{tool.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${tool.pricing === "free" ? "text-green-400 bg-green-500/10 border-green-500/20" : tool.pricing === "freemium" ? "text-brand-blue bg-brand-blue/10 border-brand-blue/20" : "text-brand-purple bg-brand-purple/10 border-brand-purple/20"}`}>
                  {tool.pricing}
                </span>
              </div>
              <span className="text-xs text-gray-600 bg-surface-3 px-2 py-0.5 rounded-md inline-block mb-2">{tool.category}</span>
              <p className="text-gray-500 text-sm leading-relaxed">{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}