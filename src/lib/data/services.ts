// =============================================
// SERVICES DATA — src/lib/data/services.ts
// Single source of truth for MG Labs' service offerings.
// Used by /services and /pricing so copy stays in sync.
// =============================================
import { Video, Briefcase, Package, type LucideIcon } from "lucide-react";

export type Service = {
  id: string;
  name: string;
  Icon: LucideIcon;
  price: string | null;
  featured: boolean;
  description: string;
  includes: readonly string[];
  cta: { label: string; href: string };
};

export const SERVICES: readonly Service[] = [
  {
    id: "content-video",
    name: "AI Content & Short-Form Video Agency",
    Icon: Video,
    price: "Starting at $300",
    featured: true,
    description:
      "We create high-converting AI-assisted short-form content for brands and businesses.",
    includes: [
      "TikTok Videos",
      "Instagram Reels",
      "YouTube Shorts",
      "AI Generated Ads",
    ],
    cta: { label: "Get a quote", href: "/contact?service=content-video" },
  },
  {
    id: "freelance",
    name: "Freelance Services",
    Icon: Briefcase,
    price: "Price upon consultation",
    featured: false,
    description: "Custom freelance services tailored to your business needs.",
    includes: [
      "Video Editing",
      "Copywriting",
      "Website Building",
      "Graphic Design",
      "Virtual Assistance",
    ],
    cta: { label: "Talk to us", href: "/contact?service=freelance" },
  },
  {
    id: "digital-products",
    name: "Digital Products",
    Icon: Package,
    price: null,
    featured: false,
    description:
      "Ready-to-use digital assets to improve productivity and accelerate business growth.",
    includes: [
      "AI Prompts",
      "Templates",
      "Notion Workspaces",
      "Canva Templates",
      "E-books",
    ],
    cta: { label: "Browse products", href: "/products" },
  },
] as const;
