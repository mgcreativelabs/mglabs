import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils/format";
import { getBlogPost, BLOG_POSTS } from "@/lib/data/blog-posts";

// ─────────────────────────────────────────────────────────────
// Both the list and the detail page now read from the same
// shared data module (src/lib/data/blog-posts.ts) so edits
// to a post's metadata automatically appear in both places.
// ─────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} — MG Creative Labs Blog`,
    description: post.excerpt,
  };
}

// ── Tiny inline markdown renderer ─────────────────────────────
function renderMarkdown(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (const line of lines) {
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="text-2xl font-bold text-white mt-10 mb-4">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("# ")) {
      elements.push(
        <h1 key={key++} className="text-3xl font-bold text-white mt-8 mb-4">
          {line.slice(2)}
        </h1>
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      elements.push(
        <li key={key++} className="text-gray-400 ml-6 mb-1 list-disc">
          {renderInline(line.slice(2))}
        </li>
      );
    } else if (/^\d+\./.test(line)) {
      elements.push(
        <li key={key++} className="text-gray-400 ml-6 mb-1 list-decimal">
          {renderInline(line.replace(/^\d+\.\s*/, ""))}
        </li>
      );
    } else if (line.startsWith("---")) {
      elements.push(<hr key={key++} className="border-white/10 my-8" />);
    } else if (line.trim() === "") {
      elements.push(<div key={key++} className="h-2" />);
    } else {
      elements.push(
        <p key={key++} className="text-gray-400 leading-relaxed mb-2">
          {renderInline(line)}
        </p>
      );
    }
  }
  return elements;
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-white font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="text-gray-300 italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen">
      {/* Back */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10">
        <Link href="/blog">
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Back to blog
          </Button>
        </Link>
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-6 flex flex-wrap gap-2">
          <Badge variant="blue">{post.category}</Badge>
          {post.tags.map((tag) => (
            <Badge key={tag} variant="default" size="sm">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight mb-6">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-8 border-b border-white/[0.06] mb-10">
          <span className="font-medium text-gray-400">{post.author.full_name}</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(post.published_at)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {post.reading_time} min read
          </span>
        </div>

        <div className="space-y-1">{renderMarkdown(post.content)}</div>

        {/* CTA footer */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 border border-white/[0.06] text-center">
          <h3 className="text-xl font-bold text-white mb-2">Want to master these skills?</h3>
          <p className="text-gray-400 mb-6">
            Join the MG Creative Labs community — free to start, no credit card needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup">
              <Button variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Start learning free
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="secondary">Read more articles</Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
