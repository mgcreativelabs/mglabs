import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ArrowRight, Code, Terminal, GitBranch, Cpu, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Coding Academy",
  description: "Learn to build real apps with AI. Master Cursor, GitHub Copilot, v0, Bolt, and AI-powered development workflows.",
};

const tracks = [
  {
    title: "AI-Assisted Development",
    description: "Use Cursor, Copilot, and Codeium to code 3-10x faster without sacrificing quality.",
    tools: ["Cursor", "GitHub Copilot", "Codeium", "Tabnine"],
    lessons: 15,
    level: "Beginner",
    icon: Code,
  },
  {
    title: "Build Full-Stack Apps with AI",
    description: "Go from idea to deployed app using v0, Bolt, Lovable, and Next.js. No prior experience needed.",
    tools: ["v0", "Bolt", "Next.js", "Vercel"],
    lessons: 20,
    level: "Intermediate",
    icon: Terminal,
  },
  {
    title: "LLM API Integration",
    description: "Build AI-powered features into real applications using OpenAI, Anthropic, and Groq APIs.",
    tools: ["OpenAI API", "Anthropic API", "LangChain", "Vercel AI SDK"],
    lessons: 18,
    level: "Intermediate",
    icon: Cpu,
  },
  {
    title: "Advanced AI Engineering",
    description: "RAG systems, vector databases, fine-tuning, and deploying production AI systems.",
    tools: ["Pinecone", "Supabase pgvector", "LlamaIndex", "HuggingFace"],
    lessons: 24,
    level: "Advanced",
    icon: GitBranch,
  },
];

const projects = [
  "AI-powered SaaS landing page (v0 + Next.js)",
  "Chatbot with memory using Supabase + OpenAI",
  "Code review tool using Claude API",
  "Resume analyzer with GPT-4 Vision",
  "YouTube summarizer with Whisper + GPT-4",
  "RAG system for your own documents",
];

export default function AICodingAcademyPage() {
  return (
    <div className="pt-16 min-h-screen">
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center mesh-bg">
        <Badge variant="blue" className="mb-5"><Code className="h-3 w-3" /> Build with AI</Badge>
        <h1 className="text-5xl sm:text-6xl font-display font-bold text-white mb-5 leading-tight">
          AI Coding <span className="text-gradient">Academy</span>
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
          Ship real products with AI assistance. From your first line of code to a production-deployed SaaS.
        </p>
      </section>

      {/* Tracks */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-display font-bold text-white mb-8">Learning Tracks</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {tracks.map((track) => (
            <Card key={track.title} className="glass border border-white/[0.06] card-hover p-6">
  <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-surface-3">
                  <track.icon className="h-5 w-5 text-brand-blue" />
                </div>
                <Badge variant="default" size="sm">{track.level}</Badge>
              </div>
              <h3 className="font-semibold text-white text-lg mb-2">{track.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{track.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {track.tools.map((tool) => (
                  <span key={tool} className="text-xs text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded-md border border-brand-blue/20">{tool}</span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">{track.lessons} lessons</span>
                <Button size="sm" variant="secondary" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>Start track</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="purple" className="mb-4">Project-based</Badge>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Build 6 real projects</h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Every track ends with a deployable project you can add to your portfolio. No toy examples — real apps that solve real problems.
            </p>
            <Link href="/signup">
              <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>Start building today</Button>
            </Link>
          </div>
          <div className="space-y-3">
            {projects.map((project, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-surface-1 border border-white/[0.06]">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{project}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
