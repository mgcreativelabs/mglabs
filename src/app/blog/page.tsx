import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Clock, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils/format";
import { BLOG_POSTS, type BlogPost } from "@/lib/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "AI tutorials, prompt engineering guides, tool reviews, and industry insights from MG Creative Labs.",
};

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
  tutorials: "success",
  "ai-tools": "purple",
  coding: "blue",
  design: "purple",
  automation: "warning",
};

function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <Card className="card-hover border border-white/[0.06] p-0 overflow-hidden h-full flex flex-col">
        <div className={`${featured ? "h-48" : "h-32"} bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 relative flex items-end p-4 flex-shrink-0`}>
          <div className="absolute inset-0 bg-gradient-to-t from-surface-1/80 to-transparent" />
          <div className="relative z-10 flex gap-2 flex-wrap">
            <Badge variant={categoryColors[post.category] || "default"} size="sm">
              {CATEGORIES.find((c) => c.value === post.category)?.label || post.category}
            </Badge>
            {post.is_featured && <Badge variant="gradient" size="sm">Featured</Badge>}
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className={`font-semibold text-white mb-2 leading-tight group-hover:text-brand-blue transition-colors flex-1 ${featured ? "text-lg" : "text-sm"}`}>
            {post.title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>

          <div className="flex items-center gap-3 text-xs text-gray-600 mt-auto">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />{formatDate(post.published_at)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />{post.reading_time} min read
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default function BlogPage() {
  const featured = BLOG_POSTS.filter((p) => p.is_featured).slice(0, 2);
  const recent = BLOG_POSTS.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center mesh-bg">
        <Badge variant="blue" className="mb-5">New articles weekly</Badge>
        <h1 className="text-5xl font-display font-bold text-white mb-4">
          The AI Creator <span className="text-gradient">Blog</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Tutorials, tool reviews, prompt guides, and insights for the modern AI creator.
        </p>
      </section>

      {/* Category filter — static for now; searchParams filtering can be added later */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((c) => (
            <span
              key={c.value}
              className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap bg-surface-2 text-gray-400 border border-white/[0.06] cursor-default select-none"
            >
              {c.label}
            </span>
          ))}
        </div>
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-10">
          <h2 className="text-xl font-semibold text-white mb-5">Featured</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {featured.map((post) => <PostCard key={post.id} post={post} featured />)}
          </div>
        </section>
      )}

      {/* All posts */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <h2 className="text-xl font-semibold text-white mb-5">Latest articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recent.map((post) => <PostCard key={post.id} post={post} />)}
        </div>

        <div className="text-center mt-12">
          <Button variant="secondary" size="lg" disabled>
            More articles coming soon
          </Button>
        </div>
      </section>
    </div>
  );
}
