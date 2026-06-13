import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { MessageSquare, ThumbsUp, Eye, Pin, ArrowRight, Users, Flame, HelpCircle, Briefcase, Star } from "lucide-react";
import { formatRelativeDate } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Community",
  description: "Join 50,000+ AI creators. Share projects, get help, find collaborators, and grow together.",
};

const CATEGORIES = [
  { value: "general", label: "General", icon: MessageSquare, color: "blue" },
  { value: "showcase", label: "Showcase", icon: Star, color: "purple" },
  { value: "help", label: "Get Help", icon: HelpCircle, color: "success" },
  { value: "resources", label: "Resources", icon: Flame, color: "warning" },
  { value: "jobs", label: "Jobs & Collab", icon: Briefcase, color: "blue" },
];

const POSTS = [
  {
    id: "1",
    title: "I built a full SaaS in 3 days using v0 + Cursor + Supabase. Here's my workflow.",
    category: "showcase",
    tags: ["v0", "Cursor", "SaaS"],
    author: { full_name: "Alex Kim", avatar_url: null },
    likes_count: 342,
    replies_count: 87,
    views_count: 4820,
    is_pinned: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
  {
    id: "2",
    title: "Best Midjourney prompts for product photography? Share your templates!",
    category: "resources",
    tags: ["Midjourney", "Photography"],
    author: { full_name: "Priya S.", avatar_url: null },
    likes_count: 198,
    replies_count: 64,
    views_count: 3100,
    is_pinned: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString(),
  },
  {
    id: "3",
    title: "How do I stop ChatGPT from giving generic answers? Tried everything.",
    category: "help",
    tags: ["ChatGPT", "Prompts"],
    author: { full_name: "Tom R.", avatar_url: null },
    likes_count: 76,
    replies_count: 41,
    views_count: 1890,
    is_pinned: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
  },
  {
    id: "4",
    title: "Looking for a developer to co-build an AI writing tool (rev-share deal)",
    category: "jobs",
    tags: ["Collaboration", "Startup"],
    author: { full_name: "Maya T.", avatar_url: null },
    likes_count: 54,
    replies_count: 23,
    views_count: 2300,
    is_pinned: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
  },
  {
    id: "5",
    title: "Weekly thread: What AI tool changed your workflow most this month?",
    category: "general",
    tags: ["Discussion", "Tools"],
    author: { full_name: "MG Team", avatar_url: null },
    likes_count: 287,
    replies_count: 156,
    views_count: 6700,
    is_pinned: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
];

const categoryColorMap: Record<string, "blue" | "purple" | "success" | "warning" | "default"> = {
  general: "default",
  showcase: "purple",
  help: "success",
  resources: "warning",
  jobs: "blue",
};

export default function CommunityPage() {
  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center mesh-bg">
        <Badge variant="blue" className="mb-5">
          <Users className="h-3 w-3" /> 50K+ members
        </Badge>
        <h1 className="text-5xl font-display font-bold text-white mb-5 leading-tight">
          The <span className="text-gradient">Community</span>
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-8">
          Share what you&apos;re building, ask questions, find collaborators, and grow with the best AI creator community online.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup">
            <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>Join the community</Button>
          </Link>
          <Button size="lg" variant="secondary">Browse discussions</Button>
        </div>
      </section>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { n: "50K+", label: "Members" },
            { n: "12K+", label: "Discussions" },
            { n: "98K+", label: "Replies" },
            { n: "Daily", label: "Active" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5 text-center border border-white/[0.06]">
              <div className="text-2xl font-display font-bold text-white">{s.n}</div>
              <div className="text-xs text-gray-600 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-4">
          <Card p-4 className="border border-white/[0.06]">
            <h3 className="text-sm font-semibold text-white mb-3">Categories</h3>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-surface-3 transition-colors text-left"
                >
                  <cat.icon className="h-4 w-4" />
                  {cat.label}
                </button>
              ))}
            </div>
          </Card>

          <Card p-4 className="border border-white/[0.06]">
            <h3 className="text-sm font-semibold text-white mb-3">Community rules</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>✅ Be respectful and helpful</li>
              <li>✅ Share knowledge freely</li>
              <li>✅ Celebrate others&apos; wins</li>
              <li>❌ No spam or self-promotion</li>
              <li>❌ No hateful content</li>
            </ul>
          </Card>
        </aside>

        {/* Posts */}
        <main className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Latest Discussions</h2>
            <Link href="/signup">
              <Button size="sm" variant="primary">New post</Button>
            </Link>
          </div>

          {POSTS.map((post) => (
            <Card key={post.id} className="glass glass-hover border border-white/[0.06]" padding="none">
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <Avatar fallback={post.author.full_name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      {post.is_pinned && (
                        <span className="flex items-center gap-1 text-xs text-brand-blue">
                          <Pin className="h-3 w-3" /> Pinned
                        </span>
                      )}
                      <Badge variant={categoryColorMap[post.category]} size="sm">
                        {CATEGORIES.find((c) => c.value === post.category)?.label}
                      </Badge>
                    </div>

                    <h3 className="font-medium text-white text-sm leading-tight mb-2 hover:text-brand-blue cursor-pointer transition-colors">
                      {post.title}
                    </h3>

                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span className="font-medium text-gray-500">{post.author.full_name}</span>
                      <span>{formatRelativeDate(post.created_at)}</span>
                      <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" />{post.likes_count}</span>
                      <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" />{post.replies_count}</span>
                      <span className="flex items-center gap-1 ml-auto"><Eye className="h-3 w-3" />{post.views_count.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          <div className="text-center pt-4">
            <Button variant="secondary" size="lg">Load more discussions</Button>
          </div>
        </main>
      </div>
    </div>
  );
}
