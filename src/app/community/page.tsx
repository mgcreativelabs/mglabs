import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare, ThumbsUp, Eye, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Community",
  description: "Join 50,000+ AI creators. Share projects, get help and grow together.",
};

const posts = [
  { id: "1", title: "I built a full SaaS in 3 days using v0 + Cursor + Supabase. Here's my workflow.", category: "Showcase", author: "Alex Kim", likes: 342, replies: 87, views: 4820, time: "6h ago", pinned: true },
  { id: "2", title: "Best Midjourney prompts for product photography? Share your templates!", category: "Resources", author: "Priya S.", likes: 198, replies: 64, views: 3100, time: "14h ago", pinned: false },
  { id: "3", title: "How do I stop ChatGPT from giving generic answers?", category: "Help", author: "Tom R.", likes: 76, replies: 41, views: 1890, time: "20h ago", pinned: false },
  { id: "4", title: "Looking for a developer to co-build an AI writing tool (rev-share)", category: "Jobs", author: "Maya T.", likes: 54, replies: 23, views: 2300, time: "1d ago", pinned: false },
  { id: "5", title: "Weekly thread: What AI tool changed your workflow most this month?", category: "General", author: "MG Team", likes: 287, replies: 156, views: 6700, time: "2d ago", pinned: true },
];

const catColors: Record<string, string> = {
  Showcase: "text-brand-purple bg-brand-purple/10 border-brand-purple/20",
  Resources: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Help: "text-green-400 bg-green-400/10 border-green-400/20",
  Jobs: "text-brand-blue bg-brand-blue/10 border-brand-blue/20",
  General: "text-gray-400 bg-surface-3 border-white/10",
};

export default function CommunityPage() {
  return (
    <div className="pt-16 min-h-screen">
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center mesh-bg">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-medium mb-5">
          <Users className="h-3.5 w-3.5" /> 50K+ members
        </span>
        <h1 className="text-5xl font-bold text-white mb-5">The <span className="text-gradient">Community</span></h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-8">
          Share what you&apos;re building, ask questions, find collaborators, and grow with the best AI creator community online.
        </p>
        <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-brand text-white font-semibold shadow-lg shadow-brand-blue/20 hover:scale-[1.02] transition-all">
          Join the community <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto px-4 sm:px-6 mb-10">
        {[{ n: "50K+", l: "Members" }, { n: "12K+", l: "Discussions" }, { n: "98K+", l: "Replies" }, { n: "Daily", l: "Active" }].map((s) => (
          <div key={s.l} className="glass rounded-2xl p-5 text-center border border-white/[0.06]">
            <div className="text-2xl font-bold text-white">{s.n}</div>
            <div className="text-xs text-gray-600 mt-0.5">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 space-y-3">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Latest Discussions</h2>
          <Link href="/signup" className="px-4 py-2 rounded-xl bg-gradient-brand text-white text-sm font-semibold hover:scale-[1.02] transition-all">
            New post
          </Link>
        </div>
        {posts.map((post) => (
          <div key={post.id} className="glass glass-hover rounded-2xl p-5 border border-white/[0.06]">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-brand flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {post.author[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  {post.pinned && <span className="text-xs text-brand-blue font-medium">📌 Pinned</span>}
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${catColors[post.category]}`}>{post.category}</span>
                </div>
                <h3 className="font-medium text-white text-sm leading-tight mb-2">{post.title}</h3>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span className="font-medium text-gray-500">{post.author}</span>
                  <span>{post.time}</span>
                  <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" />{post.likes}</span>
                  <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" />{post.replies}</span>
                  <span className="flex items-center gap-1 ml-auto"><Eye className="h-3 w-3" />{post.views.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}