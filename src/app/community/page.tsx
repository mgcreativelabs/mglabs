import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { MessageSquare, ThumbsUp, Eye, Pin, ArrowRight, Users, Flame, HelpCircle, Briefcase, Star } from "lucide-react";
import { formatRelativeDate } from "@/lib/utils/format";
import { createPublicClient } from "@/lib/supabase/public";
import { getPlatformStats, formatStatCountOrNull } from "@/lib/data/platform-stats";
import { NewPostForm } from "./NewPostForm";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Community",
  description: "Join the MG Creative Labs community. Share projects, get help, find collaborators, and grow together.",
};

const CATEGORIES = [
  { value: "general", label: "General", icon: MessageSquare, color: "blue" },
  { value: "showcase", label: "Showcase", icon: Star, color: "purple" },
  { value: "help", label: "Get Help", icon: HelpCircle, color: "success" },
  { value: "resources", label: "Resources", icon: Flame, color: "warning" },
  { value: "jobs", label: "Jobs & Collab", icon: Briefcase, color: "blue" },
];

const categoryColorMap: Record<string, "blue" | "purple" | "success" | "warning" | "default"> = {
  general: "default",
  showcase: "purple",
  help: "success",
  resources: "warning",
  jobs: "blue",
};

const POST_FETCH_LIMIT = 30;

interface CommunityPostRow {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  likes_count: number;
  replies_count: number;
  views_count: number;
  is_pinned: boolean;
  created_at: string;
  profiles: { full_name: string | null; avatar_url: string | null } | null;
}

async function getPosts(): Promise<CommunityPostRow[]> {
  const supabase = createPublicClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("community_posts")
    .select("id, title, content, category, tags, likes_count, replies_count, views_count, is_pinned, created_at, profiles(full_name, avatar_url)")
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(POST_FETCH_LIMIT);

  return (data as unknown as CommunityPostRow[]) ?? [];
}

export default async function CommunityPage() {
  const [posts, stats] = await Promise.all([getPosts(), getPlatformStats()]);

  const membersLabel = formatStatCountOrNull(stats.learners, 10);
  const discussionsLabel = formatStatCountOrNull(stats.communityPosts, 5);

  const communityStats = [
    membersLabel ? { n: membersLabel, label: "Members" } : { n: "Open", label: "Join free" },
    discussionsLabel ? { n: discussionsLabel, label: "Discussions" } : { n: "New", label: "Be the first" },
    { n: "24/7", label: "Always open" },
    { n: "Free", label: "To join" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center mesh-bg">
        <Badge variant="blue" className="mb-5">
          <Users className="h-3 w-3" /> {membersLabel ? `${membersLabel} members` : "Now open"}
        </Badge>
        <h1 className="text-5xl font-display font-bold text-ink mb-5 leading-tight">
          The <span className="text-gradient">Community</span>
        </h1>
        <p className="text-ink-2 text-xl max-w-2xl mx-auto mb-8">
          Share what you&apos;re building, ask questions, find collaborators, and grow with other AI creators.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup">
            <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>Join the community</Button>
          </Link>
          <a href="#discussions">
            <Button size="lg" variant="secondary">Browse discussions</Button>
          </a>
        </div>
      </section>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {communityStats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5 text-center border border-border">
              <div className="text-2xl font-display font-bold text-ink">{s.n}</div>
              <div className="text-xs text-ink-muted mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div id="discussions" className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 grid lg:grid-cols-4 gap-8 scroll-mt-20">
        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-4">
          <Card className="border border-border">
            <h3 className="text-sm font-semibold text-ink mb-3">Categories</h3>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.value}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink-2"
                >
                  <cat.icon className="h-4 w-4" />
                  {cat.label}
                </div>
              ))}
            </div>
          </Card>

          <Card className="border border-border">
            <h3 className="text-sm font-semibold text-ink mb-3">Community rules</h3>
            <ul className="space-y-2 text-xs text-ink-muted">
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
            <h2 className="text-lg font-semibold text-ink">Latest Discussions</h2>
            <NewPostForm />
          </div>

          {posts.length === 0 ? (
            <Card className="border border-border p-10 text-center">
              <MessageSquare className="h-8 w-8 text-ink-muted mx-auto mb-3" />
              <p className="text-ink-2 text-sm mb-1">No discussions yet</p>
              <p className="text-ink-muted text-xs">Be the first to share what you&apos;re building or ask a question.</p>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="card-hover border border-border p-6">
                <div className="flex items-start gap-3">
                  <Avatar fallback={post.profiles?.full_name ?? "?"} src={post.profiles?.avatar_url ?? undefined} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      {post.is_pinned && (
                        <span className="flex items-center gap-1 text-xs text-brand-blue">
                          <Pin className="h-3 w-3" /> Pinned
                        </span>
                      )}
                      <Badge variant={categoryColorMap[post.category] ?? "default"} size="sm">
                        {CATEGORIES.find((c) => c.value === post.category)?.label ?? post.category}
                      </Badge>
                    </div>

                    <h3 className="font-medium text-ink text-sm leading-tight mb-2">
                      {post.title}
                    </h3>

                    <div className="flex items-center gap-4 text-xs text-ink-muted">
                      <span className="font-medium text-ink-muted">{post.profiles?.full_name ?? "Member"}</span>
                      <span>{formatRelativeDate(post.created_at)}</span>
                      <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" />{post.likes_count}</span>
                      <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" />{post.replies_count}</span>
                      <span className="flex items-center gap-1 ml-auto"><Eye className="h-3 w-3" />{post.views_count.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </main>
      </div>
    </div>
  );
}
