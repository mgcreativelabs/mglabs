"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { X } from "lucide-react";

const CATEGORIES = [
  { value: "general", label: "General" },
  { value: "showcase", label: "Showcase" },
  { value: "help", label: "Get Help" },
  { value: "resources", label: "Resources" },
  { value: "jobs", label: "Jobs & Collab" },
];

export function NewPostForm() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("general");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/community/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, category }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setTitle("");
      setContent("");
      setCategory("general");
      setOpen(false);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button size="sm" variant="primary" onClick={() => setOpen(true)}>
        New post
      </Button>
    );
  }

  if (authLoading) {
    return <Button size="sm" variant="primary" disabled>New post</Button>;
  }

  if (!isAuthenticated) {
    return (
      <Card className="border border-border p-5 mb-4">
        <p className="text-sm text-ink-2 mb-3">
          Sign in to start a discussion with the community.
        </p>
        <div className="flex gap-2">
          <Link href="/login?next=/community">
            <Button size="sm" variant="primary">Sign in</Button>
          </Link>
          <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border border-border p-5 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-ink">Start a discussion</h3>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-ink-muted hover:text-ink transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's your post about?"
          maxLength={150}
          required
        />

        <div>
          <label className="block text-sm font-medium text-ink-2 mb-1.5">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl bg-surface-2 border border-border text-ink px-4 py-3 text-sm focus:outline-none focus:border-brand-blue/60 focus:ring-2 focus:ring-brand-blue/20"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        <Textarea
          label="Post"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share details, ask your question, or show off what you built..."
          rows={5}
          maxLength={5000}
          required
        />

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex gap-2 justify-end">
          <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" loading={submitting}>
            Post
          </Button>
        </div>
      </form>
    </Card>
  );
}
