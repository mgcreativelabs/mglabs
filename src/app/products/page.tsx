import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, Star, CheckCircle2, Zap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "AI Digital Products — Prompt Packs & Guides | MG Labs",
  description:
    "Instantly downloadable prompt packs and PDF guides to help you build with AI faster. Starting at $9.",
};

// ─────────────────────────────────────────────────────────────
// Products
// Update gumroadUrl fields with real links after upload to Gumroad
// ─────────────────────────────────────────────────────────────
const products = [
  {
    id: "starter-prompt-pack",
    name: "Starter AI Prompt Pack",
    tagline: "Your first 50 prompts — curated and tested.",
    price: "$9",
    badge: "Best seller",
    badgeVariant: "success" as const,
    featured: false,
    gumroadUrl: "https://mgcreativelabs.gumroad.com/l/starter-prompt-pack",
    description:
      "50 tested, ready-to-use prompts across the most common use cases — writing, summarizing, brainstorming, email drafting, and more. Perfect if you're just getting started with AI tools and want prompts that actually work.",
    includes: [
      "50 tested prompts across 5 categories",
      "Writing & content prompts (10)",
      "Business & email prompts (10)",
      "Summarization & analysis prompts (10)",
      "Brainstorming & ideation prompts (10)",
      "Learning & research prompts (10)",
      "Usage guide + tips for remixing",
    ],
    format: "PDF + Notion template",
  },
  {
    id: "ai-business-prompt-pack",
    name: "AI Business Prompt Pack",
    tagline: "100 prompts for entrepreneurs, freelancers, and operators.",
    price: "$19",
    badge: "Most popular",
    badgeVariant: "blue" as const,
    featured: true,
    gumroadUrl: "https://mgcreativelabs.gumroad.com/l/ai-business-prompt-pack",
    description:
      "100 prompts specifically built for people running a business or freelancing. From writing proposals and client emails to marketing copy and competitive analysis — every prompt is designed to save you time on real business tasks.",
    includes: [
      "100 tested business prompts across 8 categories",
      "Client communication (15 prompts)",
      "Marketing & copywriting (20 prompts)",
      "Sales & proposals (15 prompts)",
      "Operations & planning (10 prompts)",
      "Content & social media (20 prompts)",
      "Research & analysis (10 prompts)",
      "Hiring & team management (10 prompts)",
      "Bonus: 5 AI workflow templates",
    ],
    format: "PDF + Notion template",
  },
  {
    id: "build-ai-tool-guide",
    name: "Build Your First AI Tool — PDF Guide",
    tagline: "Step-by-step from zero to working AI chatbot.",
    price: "$14",
    badge: null,
    badgeVariant: "default" as const,
    featured: false,
    gumroadUrl: "https://mgcreativelabs.gumroad.com/l/build-ai-tool-guide",
    description:
      "A 25-page PDF guide that walks you through building your first AI tool from scratch using free APIs. No coding experience needed. Every step is written for someone who has never built anything technical before.",
    includes: [
      "25-page step-by-step PDF guide",
      "What AI apps actually are (the mental model)",
      "How to choose the right AI API (Groq vs Gemini vs OpenRouter)",
      "Writing your first system prompt",
      "Testing and refining AI behavior",
      "Free deployment options explained",
      "Bonus: 10 system prompt templates",
    ],
    format: "PDF",
  },
  {
    id: "30-day-ai-workbook",
    name: "30-Day AI Skills Workbook",
    tagline: "One skill per day. 30 days to AI confidence.",
    price: "$12",
    badge: "New",
    badgeVariant: "warning" as const,
    featured: false,
    gumroadUrl: "https://mgcreativelabs.gumroad.com/l/30-day-ai-workbook",
    description:
      "A structured 30-day program with one small daily exercise that builds real AI skills. Designed for people who feel overwhelmed by AI and want a consistent, manageable way to get comfortable using and eventually building with it.",
    includes: [
      "30 daily exercises (10-20 min each)",
      "Week 1: Using AI tools effectively",
      "Week 2: Prompt engineering fundamentals",
      "Week 3: Building your first tool logic",
      "Week 4: Mini-project and reflection",
      "Progress tracker",
      "Reflection prompts after each week",
    ],
    format: "PDF workbook",
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-surface">

      {/* ── Header ── */}
      <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        <Badge variant="blue" className="mb-5">Digital Products</Badge>
        <h1 className="text-5xl sm:text-6xl font-bold text-ink mb-5 leading-tight">
          Build faster with the<br />
          <span className="text-gradient">right tools in hand.</span>
        </h1>
        <p className="text-ink-2 text-xl max-w-2xl mx-auto mb-6">
          Instantly downloadable prompt packs and guides. No subscription. No DRM.
          Buy once, use forever.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 text-sm text-ink-muted">
          {["Instant download", "PDF + Notion formats", "No refund policy — quality guaranteed"].map((item, i) => (
            <div key={item} className="flex items-center gap-2">
              {i > 0 && <div className="hidden sm:block w-px h-4 bg-surface-2" />}
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ── Products grid ── */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto pb-24">
        <div className="grid md:grid-cols-2 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className={`relative rounded-2xl border flex flex-col transition-all duration-200 ${
                product.featured
                  ? "bg-brand-blue/5 border-brand-blue/30"
                  : "bg-surface-2 border-border hover:border-border-strong"
              }`}
            >
              {/* Top glow for featured */}
              {product.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-brand-blue/30" />
              )}

              {/* Badge */}
              {product.badge && (
                <div className="absolute -top-3 left-6">
                  <Badge variant={product.badgeVariant} size="sm">{product.badge}</Badge>
                </div>
              )}

              <div className="p-7 flex flex-col flex-1">
                {/* Header */}
                <div className="mb-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-bold text-ink mb-1">{product.name}</h2>
                      <p className={`text-sm font-medium ${product.featured ? "text-brand-blue" : "text-ink-2"}`}>
                        {product.tagline}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-3xl font-black text-ink">{product.price}</div>
                      <div className="text-xs text-ink-muted">one-time</div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-ink-2 text-sm leading-relaxed mb-5">{product.description}</p>

                {/* Includes */}
                <div className="flex-1 mb-6">
                  <p className="text-[10px] text-ink-muted font-bold uppercase tracking-wider mb-3">
                    What&apos;s included
                  </p>
                  <ul className="space-y-2">
                    {product.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${product.featured ? "text-brand-blue" : "text-green-400"}`} />
                        <span className="text-xs text-ink-2 leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Format */}
                <div className="flex items-center gap-1.5 text-xs text-ink-muted mb-5">
                  <Download className="w-3.5 h-3.5" />
                  Format: {product.format}
                </div>

                {/* CTA */}
                <a
                  href={product.gumroadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-3.5 px-5 rounded-xl font-semibold text-sm text-center transition-all duration-200 flex items-center gap-2 justify-center ${
                    product.featured
                      ? "bg-brand-blue text-white hover:bg-brand-blue-hover hover:scale-[1.02]"
                      : "bg-surface-2 text-ink border border-border hover:bg-surface-2 hover:border-border-strong"
                  }`}
                >
                  <Download className="w-4 h-4" />
                  Buy for {product.price} on Gumroad
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ── Upsell to Launch Program ── */}
        <div className="mt-12 rounded-2xl bg-surface-2 border border-border p-10 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-ink font-bold">Want more than a product?</span>
            <Star className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-ink-2 max-w-lg mx-auto mb-6 text-sm leading-relaxed">
            Products teach you. The Launch Program builds with you. If you&apos;re ready to go
            from prompt packs to a real deployed AI product — that&apos;s what the $500 program is for.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/pricing#launch"
              className="px-6 py-3 rounded-xl font-semibold text-sm bg-brand-blue text-white hover:bg-brand-blue-hover hover:scale-[1.02] transition-all flex items-center gap-2 justify-center"
            >
              <Zap className="w-4 h-4" />
              Apply for Launch Program — $500
            </Link>
            <Link
              href="/start"
              className="px-6 py-3 rounded-xl font-medium text-sm text-ink-2 border border-border hover:border-border-strong hover:text-ink transition-all text-center flex items-center gap-2 justify-center"
            >
              Try the free build first <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
