// =============================================
// AI LEARNING HUB — src/app/ai-learning-hub/page.tsx
// =============================================
import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { ArrowRight, Play, Clock, Star, Users, BookOpen, Brain, Zap, Bot } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Learning Hub",
  description: "Master AI fundamentals, LLMs, and prompt engineering with free structured courses. Perfect for beginners and professionals.",
};

const courses = [
  {
    id: "1",
    title: "AI Foundations: How LLMs Actually Work",
    description: "Go beyond the hype. Understand transformers, training, and why GPT-4 does what it does — explained visually.",
    duration: "3h 20m",
    lessons: 12,
    level: "Beginner",
    rating: 4.9,
    students: 12840,
    isFree: true,
    tags: ["LLMs", "GPT-4", "Claude", "Transformers"],
    icon: Brain,
  },
  {
    id: "2",
    title: "Prompt Engineering Masterclass",
    description: "The complete guide to writing prompts that get 10x better results. Chain-of-thought, few-shot, and system prompting.",
    duration: "5h 45m",
    lessons: 22,
    level: "Intermediate",
    rating: 4.9,
    students: 21300,
    isFree: true,
    tags: ["Prompts", "ChatGPT", "Chain-of-thought"],
    icon: Zap,
  },
  {
    id: "3",
    title: "AI Automation with n8n & Make",
    description: "Build automated workflows that save hours every week. Connect AI to your email, calendar, CRM, and more.",
    duration: "4h 15m",
    lessons: 16,
    level: "Intermediate",
    rating: 4.8,
    students: 8920,
    isFree: true,
    tags: ["n8n", "Automation", "No-code", "Make"],
    icon: Bot,
  },
  {
    id: "4",
    title: "Introduction to AI Agents",
    description: "Build autonomous AI agents that can browse the web, write code, and complete multi-step tasks without your supervision.",
    duration: "6h 30m",
    lessons: 24,
    level: "Advanced",
    rating: 4.8,
    students: 6430,
    isFree: false,
    tags: ["Agents", "AutoGPT", "LangChain"],
    icon: Brain,
  },
];

const tools = [
  { name: "ChatGPT", category: "Text Generation", pricing: "freemium", description: "OpenAI's flagship model. Best for writing, analysis, and coding." },
  { name: "Claude", category: "Text Generation", pricing: "freemium", description: "Anthropic's model. Exceptional for long documents and nuanced reasoning." },
  { name: "Gemini", category: "Text Generation", pricing: "freemium", description: "Google's multimodal AI. Strong at research and real-time web access." },
  { name: "Midjourney", category: "Image Generation", pricing: "paid", description: "The gold standard for AI art. Photorealistic and artistic styles." },
  { name: "Cursor", category: "Code Generation", pricing: "freemium", description: "AI-native code editor. The best way to code with AI assistance." },
  { name: "Runway", category: "Video Generation", pricing: "freemium", description: "Professional AI video generation and editing platform." },
];

export default function AILearningHubPage() {
  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center mesh-bg">
        <Badge variant="blue" className="mb-5">
          <BookOpen className="h-3 w-3" /> Free courses
        </Badge>
        <h1 className="text-5xl sm:text-6xl font-display font-bold text-white mb-5 leading-tight">
          AI Learning <span className="text-gradient">Hub</span>
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
          Structured courses that take you from AI curious to AI capable. Every course is free, project-based, and built for 2025.
        </p>
      </section>

      {/* Courses */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-display font-bold text-white">Featured Courses</h2>
          <Badge variant="default">{courses.length} available</Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {courses.map((course) => (
            <Card key={course.id} className="card-hover border border-white/[0.06] p-6">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-surface-3">
                    <course.icon className="h-5 w-5 text-brand-blue" />
                    </Card>
                  </div>
                  <div className="flex items-center gap-2">
                    {course.isFree ? (
                      <Badge variant="success">Free</Badge>
                    ) : (
                      <Badge variant="purple">Pro</Badge>
                    )}
                    <Badge variant="default" size="sm">{course.level}</Badge>
                  </div>
                </div>

                <h3 className="font-semibold text-white text-lg mb-2 leading-tight">{course.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{course.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {course.tags.map((tag) => (
                    <span key={tag} className="text-xs text-gray-600 bg-surface-3 px-2 py-0.5 rounded-md">{tag}</span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-600 border-t border-white/[0.04] pt-4">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{course.duration}</span>
                  <span className="flex items-center gap-1"><Play className="h-3 w-3" />{course.lessons} lessons</span>
                  <span className="flex items-center gap-1"><Star className="h-3 w-3 text-yellow-400" />{course.rating}</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" />{course.students.toLocaleString()}</span>
                </div>
              </div>
              <div className="px-6 pb-5">
                <Button variant="primary" className="w-full" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                  {course.isFree ? "Start free" : "Unlock with Pro"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* AI Tools Directory */}
      <section id="tools" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <Badge variant="purple" className="mb-3">Curated directory</Badge>
          <h2 className="text-3xl font-display font-bold text-white">AI Tools Directory</h2>
          <p className="text-gray-500 mt-2">The best AI tools, ranked and explained.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <div key={tool.name} className="glass glass-hover rounded-2xl p-5 border border-white/[0.06]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-white">{tool.name}</h3>
                <Badge
                  variant={tool.pricing === "free" ? "success" : tool.pricing === "freemium" ? "blue" : "purple"}
                  size="sm"
                >
                  {tool.pricing}
                </Badge>
              </div>
              <Badge variant="default" size="sm" className="mb-3">{tool.category}</Badge>
              <p className="text-gray-500 text-sm leading-relaxed">{tool.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
