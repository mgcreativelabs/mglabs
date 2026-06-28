// =============================================
// SITEMAP — src/app/sitemap.ts
// =============================================
import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/data/blog-posts";
import { lessons } from "@/lib/data/lessons";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mglabs.vexr.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                          lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/start`,               lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/start/build`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/learn`,               lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/prompt-library`,      lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE_URL}/mg-ai`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blog`,               lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
    { url: `${BASE_URL}/pricing`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/community`,          lastModified: new Date(), changeFrequency: "daily",   priority: 0.7 },
    { url: `${BASE_URL}/about`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/about-owner`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy`,            lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE_URL}/terms`,              lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.published_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const lessonPages: MetadataRoute.Sitemap = lessons
    .filter((l) => !l.wall)
    .map((lesson) => ({
      url: `${BASE_URL}/learn/${lesson.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticPages, ...blogPages, ...lessonPages];
}