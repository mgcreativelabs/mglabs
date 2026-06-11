import type { Metadata } from "next";
import Link from "next/link";
import { Code, CheckCircle, ArrowRight, Terminal, Cpu, GitBranch } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Coding Academy",
  description: "Build real apps with AI. Master Cursor, v0, Bolt and AI-powered development.",
};

const tracks = [
  { title: "AI-Assisted Development", description: "Use Cursor, Copilot and Codeium to code 3–10x faster.", tools: ["Cursor", "GitHub Copilot", "Codeium"], level: "Beginner", icon: Code },
  { title: "Build Full-Stack Apps with AI", description: "Go from idea to deployed app using v0, Bolt, and Next.js.", tools: ["v0", "Bolt", "Next.js", "Vercel"], level: "Intermediate", icon: Terminal },
  { title: "LLM API Integration", description: "Build AI-powered features using OpenAI, Anthropic and Groq APIs.", tools: ["OpenAI API", "Anthropic API", "Vercel AI SDK"], level: "Intermediate", icon: Cpu },
  { title: "Advanced AI Engineering", description: "RAG systems, vector databases, fine-tuning, production AI.", tools: ["Pinecone", "Supabase", "LlamaIndex"], level: "Advanced", icon: GitBranch },
];

export default function AICodingAcademyPage() {
  return (
    <div className="pt-16 min-h-screen">
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center mesh-bg">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-medium mb-5">
          <Code className="h-3.5 w-3.5" /> Build with AI
        </span>
        <h1 className="text-5xl font-bold text-white mb-5">AI Coding <span className="text-gradient">Academy</span></h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">Ship real products with AI assistance. From your first line of code to a production-deployed SaaS.</p>
      </section>

      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {tracks.map((track) => (
            <div key={track.title} className="rounded-2xl bg-surface-1 border border-white/[0.06] p-6 hover:border-brand-blue/30 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-surface-3"><track.icon className="h-5 w-5 text-brand-blue" /></div>
                <span className="text-xs px-2 py-1 rounded-full bg-surface-3 text-gray-400 border border-white/10">{track.level}</span>
              </div>
              <h3 className="font-semibold text-white text-lg mb-2">{track.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{track.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {track.tools.map((tool) => (
                  <span key={tool} className="text-xs text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded-md border border-brand-blue/20">{tool}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Build 6 real projects</h2>
            <p className="text-gray-500 mb-8">Every track ends with a deployable project for your portfolio.</p>
            <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-brand text-white font-semibold hover:scale-[1.02] transition-all">
              Start building today <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {["AI-powered SaaS landing page (v0 + Next.js)", "Chatbot with memory using Supabase + OpenAI", "Code review tool using Claude API", "Resume analyzer with GPT-4 Vision", "YouTube summarizer with Whisper + GPT-4", "RAG system for your own documents"].map((p, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-surface-1 border border-white/[0.06]">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}