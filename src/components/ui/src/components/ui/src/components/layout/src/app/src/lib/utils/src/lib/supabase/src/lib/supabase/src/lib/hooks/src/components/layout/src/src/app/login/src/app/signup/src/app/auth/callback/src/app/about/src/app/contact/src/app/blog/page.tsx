import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Eye, Calendar, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "AI tutorials, prompt engineering guides, tool reviews and news.",
};

const posts = [
  { slug: "prompt-engineering-complete-guide", title: "The Complete Guide to Prompt Engineering in 2025", excerpt: "Everything you need to write prompts that get 10x better results.", category: "Prompt Engineering", reading_time: 12, views_count: 48200, published_at: "2025-05-10", featured: true },
  { slug: "cursor-vs-copilot-2025", title: "Cursor vs GitHub Copilot: Which AI Code Editor Wins?", excerpt: "We tested both on 50 real coding tasks. Here's the honest breakdown.", category: "Coding", reading_time: 8, views_count: 31500, published_at: "2025-05-22", featured: true },
  { slug: "midjourney-v6-tips", title: "10 Midjourney v6 Tricks Most People Don't Know", excerpt: "Advanced techniques for better composition and style consistency.", category: "Design", reading_time: 7, views_count: 27800, published_at: "2025-06-01", featured: false },
  { slug: "build-saas-ai-tools", title: "How to Build a SaaS Using Only AI Tools (No Coding)", excerpt: "Step-by-step: v0 + Bolt + Supabase + Vercel = real product.", category: "Tutorials", reading_time: 15, views_count: 19600, published_at: "2025-06-05", featured: false },
  { slug: "ai-automation-freelancers", title: "The Freelancer's Guide to AI Automation: Save 15h/Week", excerpt: "The exact n8n and Zapier workflows I use to automate everything.", category: "Automation", reading_time: 10, views_count: 14300, published_at: "2025-06-08", featured: false },
  { slug: "top-ai-tools-2025", title: "The 20 Best AI Tools of 2025 (Ranked by Usefulness)", excerpt: "We tested 100+ AI tools. Here are the 20 that actually deliver.", category: "AI Tools", reading_time: 11, views_count: 52100, published_at: "2025-04-20", featured: true },
];

export default function BlogPage() {
  return (
    <div className="pt-16 min-h-screen">
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center mesh-bg">
        <h1 className="text-5xl font-bold text-white mb-4">The AI Creator <span className="text-gradient">Blog</span></h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">Tutorials, tool reviews, prompt guides, and insights for the modern AI creator.</p>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <div className="h-full rounded-2xl bg-surface-1 border border-white/[0.06] overflow-hidden hover:border-brand-blue/30 hover:scale-[1.01] transition-all">
                <div className="h-36 bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 relative flex items-end p-4">
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-1/80 to-transparent" />
                  <div className="relative z-10 flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-brand-blue/20 text-brand-blue border border-brand-blue/30 font-medium">{post.category}</span>
                    {post.featured && <span className="text-xs px-2 py-1 rounded-full bg-gradient-brand text-white font-medium flex items-center gap-1"><Star className="h-2.5 w-2.5" />Featured</span>}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-white mb-2 leading-tight text-sm group-hover:text-brand-blue transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.published_at}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.reading_time}m</span>
                    <span className="flex items-center gap-1 ml-auto"><Eye className="h-3 w-3" />{(post.views_count / 1000).toFixed(1)}K</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}