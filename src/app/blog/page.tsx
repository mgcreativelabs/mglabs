import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ArrowRight, Clock, Eye, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Blog",
  description: "AI tutorials, prompt engineering guides, tool reviews, and industry news from MG Creative Labs.",
};

const BLOG_POSTS = [
  {
    id: "1",
    slug: "prompt-engineering-complete-guide",
    title: "The Complete Guide to Prompt Engineering in 2025",
    excerpt: "Everything you need to know to write prompts that get 10x better results. Chain-of-thought, system prompts, few-shot learning, and more.",
    cover_image: null,
    category: "prompt-engineering",
    tags: ["Prompts", "ChatGPT", "Claude"],
    reading_time: 12,
    views_count: 48200,
    is_featured: true,
    published_at: "2025-05-10",
    author: { full_name: "MG Creative Labs", avatar_url: null },
  },
  {
    id: "2",
    slug: "cursor-vs-copilot-2025",
    title: "Cursor vs GitHub Copilot: Which AI Code Editor Wins in 2025?",
    excerpt: "We tested both tools on 50 real coding tasks. Here's the honest breakdown — performance, price, and which one you should use.",
    cover_image: null,
    category: "coding",
    tags: ["Cursor", "Copilot", "AI Coding"],
    reading_time: 8,
    views_count: 31500,
    is_featured: true,
    published_at: "2025-05-22",
    author: { full_name: "MG Creative Labs", avatar_url: null },
  },
  {
    id: "3",
    slug: "midjourney-v6-tips",
    title: "10 Midjourney v6 Tricks That Most People Don't Know",
    excerpt: "Advanced techniques for better composition, lighting, and style consistency in Midjourney v6. With prompt examples.",
    cover_image: null,
    category: "design",
    tags: ["Midjourney", "AI Art", "Design"],
    reading_time: 7,
    views_count: 27800,
    is_featured: false,
    published_at: "2025-06-01",
    author: { full_name: "MG Creative Labs", avatar_url: null },
  },
  {
    id: "4",
    slug: "build-saas-ai-tools",
    title: "How to Build a SaaS Product Using Only AI Tools (No Prior Coding)",
    excerpt: "A step-by-step walkthrough of building and deploying a real SaaS product using v0, Bolt, Supabase, and Vercel — zero coding experience needed.",
    cover_image: null,
    category: "tutorials",
    tags: ["v0", "Bolt", "No-code", "SaaS"],
    reading_time: 15,
    views_count: 19600,
    is_featured: true,
    published_at: "2025-06-05",
    author: { full_name: "MG Creative Labs", avatar_url: null },
  },
  {
    id: "5",
    slug: "ai-automation-freelancers",
    title: "The Freelancer's Guide to AI Automation: Save 15 Hours Per Week",
    excerpt: "The exact n8n and Zapier workflows I use to automate client onboarding, invoicing, content scheduling, and more.",
    cover_image: null,
    category: "automation",
    tags: ["n8n", "Automation", "Freelance"],
    reading_time: 10,
    views_count: 14300,
    is_featured: false,
    published_at: "2025-06-08",
    author: { full_name: "MG Creative Labs", avatar_url: null },
  },
  {
    id: "6",
    slug: "top-ai-tools-2025",
    title: "The 20 Best AI Tools of 2025 (Ranked by Actual Usefulness)",
    excerpt: "We tested over 100 AI tools so you don't have to. Here are the 20 that actually deliver on their promises.",
    cover_image: null,
    category: "ai-tools",
    tags: ["AI Tools", "Reviews", "2025"],
    reading_time: 11,
    views_count: 52100,
    is_featured: true,
    published_at: "2025-04-20",
    author: { full_name: "MG Creative Labs", avatar_url: null },
  },
];

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "prompt-engineering", label: "Prompt Engineering" },
  { value: "tutorials", label: "Tutorials" },
  { value: "ai-tools", label: "AI Tools" },
  { value: "coding", label: "Coding" },
  { value: "design", label: "Design" },
  { value: "automation", label: "Automation" },
];

const categoryColors: Record<string, "blue" | "purple" | "success" | "warning"> = {
  "prompt-engineering": "blue",
  "tutorials": "success",
  "ai-tools": "purple",
  "coding": "blue",
  "design": "purple",
  "automation": "warning",
};

function PostCard({ post, featured = false }: { post: typeof BLOG_POSTS[0]; featured?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <Card className="card-hover border border-white/[0.06] p-6">
        {/* Cover placeholder */}
        <div className={`${featured ? "h-52" : "h-36"} bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 relative flex items-end p-4`}>
          <div className="absolute inset-0 bg-gradient-to-t from-surface-1/80 to-transparent" />
          <Badge variant={categoryColors[post.category] || "default"} size="sm" className="relative z-10">
            {CATEGORIES.find((c) => c.value === post.category)?.label || post.category}
          </Badge>
          {post.is_featured && (
            <Badge variant="gradient" size="sm" className="relative z-10 ml-2">Featured</Badge>
          )}
        </div>

        <div className="p-5">
          <h3 className={`font-semibold text-white mb-2 leading-tight group-hover:text-brand-blue transition-colors ${featured ? "text-lg" : "text-sm"}`}>
            {post.title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>

          <div className="flex items-center gap-3 text-xs text-gray-600">
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(post.published_at)}</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.reading_time} min</span>
            <span className="flex items-center gap-1 ml-auto"><Eye className="h-3 w-3" />{post.views_count.toLocaleString()}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default function BlogPage() {
  const featured = BLOG_POSTS.filter((p) => p.is_featured).slice(0, 2);
  const recent = BLOG_POSTS.filter((p) => !p.is_featured || true).slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center mesh-bg">
        <Badge variant="blue" className="mb-5">Fresh weekly</Badge>
        <h1 className="text-5xl font-display font-bold text-white mb-4">
          The AI Creator <span className="text-gradient">Blog</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Tutorials, tool reviews, prompt guides, and insights for the modern AI creator.
        </p>
      </section>

      {/* Category filter */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap bg-surface-2 text-gray-400 hover:text-white hover:bg-surface-3 transition-colors border border-white/[0.06]"
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-10">
        <h2 className="text-xl font-semibold text-white mb-5">Featured</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {featured.map((post) => (
            <PostCard key={post.id} post={post} featured />
          ))}
        </div>
      </section>

      {/* All posts */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <h2 className="text-xl font-semibold text-white mb-5">Latest articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recent.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="secondary" size="lg">Load more articles</Button>
        </div>
      </section>
    </div>
  );
}
