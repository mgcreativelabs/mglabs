// =============================================
// BLOG DATA — src/lib/data/blog-posts.ts
//
// Single source of truth for blog posts.
// Previously the list page (blog/page.tsx) and the
// detail page (blog/[slug]/page.tsx) each had their
// OWN independent BLOG_POSTS array — meaning edits to
// one didn't propagate to the other (the root cause of
// data inconsistencies between list excerpts and detail
// page content). Both pages now import from here.
//
// view_count is removed from static data — it was
// fabricated (48,200 views etc.). Once the blog_posts
// table is populated in Supabase, read real counts from
// there and pass them down. For now we track without it.
// =============================================

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  reading_time: number;
  is_featured: boolean;
  published_at: string;
  author: { full_name: string; avatar_url: string | null };
  // Full article content — only populated in the detail view
  content?: string;
}

// ─────────────────────────────────────────────
// List metadata (both pages use this)
// ─────────────────────────────────────────────
export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "prompt-engineering-complete-guide",
    title: "The Complete Guide to Prompt Engineering in 2025",
    excerpt:
      "Everything you need to know to write prompts that get 10x better results. Chain-of-thought, system prompts, few-shot learning, and more.",
    category: "prompt-engineering",
    tags: ["Prompts", "ChatGPT", "Claude"],
    reading_time: 12,
    is_featured: true,
    published_at: "2025-05-10",
    author: { full_name: "MG Creative Labs", avatar_url: null },
  },
  {
    id: "2",
    slug: "cursor-vs-copilot-2025",
    title: "Cursor vs GitHub Copilot: Which AI Code Editor Wins in 2025?",
    excerpt:
      "We tested both tools on real coding tasks. Here's the honest breakdown — performance, price, and which one you should use.",
    category: "coding",
    tags: ["Cursor", "Copilot", "AI Coding"],
    reading_time: 8,
    is_featured: true,
    published_at: "2025-05-22",
    author: { full_name: "MG Creative Labs", avatar_url: null },
  },
  {
    id: "3",
    slug: "midjourney-v6-tips",
    title: "10 Midjourney v6 Tricks That Most People Don't Know",
    excerpt:
      "Advanced techniques for better composition, lighting, and style consistency in Midjourney v6. With prompt examples.",
    category: "design",
    tags: ["Midjourney", "AI Art", "Design"],
    reading_time: 7,
    is_featured: false,
    published_at: "2025-06-01",
    author: { full_name: "MG Creative Labs", avatar_url: null },
  },
  {
    id: "4",
    slug: "build-saas-ai-tools",
    title: "How to Build a SaaS Product Using Only AI Tools",
    excerpt:
      "A step-by-step walkthrough of building and deploying a real SaaS product using v0, Bolt, Supabase, and Vercel — zero prior coding needed.",
    category: "tutorials",
    tags: ["v0", "Bolt", "No-code", "SaaS"],
    reading_time: 15,
    is_featured: true,
    published_at: "2025-06-05",
    author: { full_name: "MG Creative Labs", avatar_url: null },
  },
  {
    id: "5",
    slug: "ai-automation-freelancers",
    title: "The Freelancer's Guide to AI Automation: Save 15 Hours Per Week",
    excerpt:
      "The exact n8n and Zapier workflows I use to automate client onboarding, invoicing, content scheduling, and more.",
    category: "automation",
    tags: ["n8n", "Automation", "Freelance"],
    reading_time: 10,
    is_featured: false,
    published_at: "2025-06-08",
    author: { full_name: "MG Creative Labs", avatar_url: null },
  },
  {
    id: "6",
    slug: "top-ai-tools-2025",
    title: "The Best AI Tools of 2025 (Ranked by Actual Usefulness)",
    excerpt:
      "We tested dozens of AI tools so you don't have to. Here are the ones that actually deliver on their promises.",
    category: "ai-tools",
    tags: ["AI Tools", "Reviews", "2025"],
    reading_time: 11,
    is_featured: true,
    published_at: "2025-04-20",
    author: { full_name: "MG Creative Labs", avatar_url: null },
  },
];

// ─────────────────────────────────────────────
// Full content (detail page only)
// ─────────────────────────────────────────────
export const BLOG_CONTENT: Record<string, string> = {
  "prompt-engineering-complete-guide": `
## What is prompt engineering?

Prompt engineering is the practice of crafting inputs to AI language models to reliably get the outputs you want. As AI tools become central to how we work, writing better prompts is one of the highest-leverage skills you can develop.

## 1. Be specific about format

Instead of "Write a summary," say "Write a 3-bullet summary under 50 words each." Specificity eliminates ambiguity and reduces the need for follow-up corrections.

## 2. Use chain-of-thought

Adding "Think step by step before answering" consistently improves accuracy on complex tasks. The model reasons through the problem rather than pattern-matching to a fast answer.

## 3. Role prompting

"You are a senior software engineer reviewing this code for security vulnerabilities" gets different results than "Review this code." Roles activate relevant knowledge and set the right level of depth.

## 4. Few-shot examples

Showing the model 2-3 examples of exactly what you want is often more effective than describing it in words. Input-output pairs are clearer than instructions.

## 5. Constrain the output

"Respond only in JSON with keys: title, summary, tags" eliminates the need to parse freeform text. For programmatic use, always specify output format.

## Putting it together

A complete prompt has: a role, a task description, constraints, examples (if needed), and a format instruction. That structure alone will put your prompts in the top 10%.
  `.trim(),

  "cursor-vs-copilot-2025": `
## The short answer

Cursor wins for serious software development. Copilot is more accessible and integrates everywhere. Which you should use depends on your workflow.

## What Cursor does better

Cursor's codebase awareness is genuinely different. Ask it to "add error handling consistent with how we handle errors elsewhere in this project" and it reads your patterns instead of generating boilerplate. For complex refactors and multi-file changes, it's faster.

## What Copilot does better

Copilot meets you where you are. It works inside VS Code, JetBrains, Neovim, and dozens of other editors. If you don't want to change your editor, Copilot is the right call.

## Price

Cursor Pro is $20/month. Copilot is $10/month (or free for students and open source contributors).

## Our verdict

Use Cursor if you're building production software and want the most capable AI coding experience available today. Use Copilot if you need cross-editor support or want the lower price.
  `.trim(),

  "midjourney-v6-tips": `
## 1. Cinematic lighting phrases

Add "shot on ARRI ALEXA, anamorphic lens, golden hour" to any portrait for instant cinematic quality. The camera and lighting descriptors carry more weight than you'd expect.

## 2. Style reference with --sref

Use --sref [url] to pull a specific visual style from a reference image. This gives you consistent aesthetics across a series without trying to describe the style in words.

## 3. Character reference with --cref

--cref locks a character's face and general appearance across images. Essential for creating consistent characters in comics, storyboards, or social content.

## 4. Negative prompting with --no

--no background clutter, --no text, --no watermark. The --no flag is surprisingly powerful for removing common unwanted elements.

## 5. Tile mode for seamless textures

Add --tile to any texture or pattern prompt to generate seamlessly repeating images. Perfect for backgrounds, fabrics, and surface materials.

## 6. Aspect ratios that help

--ar 2:3 for portrait photography, --ar 16:9 for landscapes and video thumbnails, --ar 1:1 for social profiles. Aspect ratio affects composition more than most people realize.
  `.trim(),

  "build-saas-ai-tools": `
## The stack

We're using v0 for UI, Bolt for logic, Supabase for database and auth, and Vercel for deployment. Total cost to get started: $0.

## Step 1: Design the UI in v0

Describe your UI in natural language at v0.dev. "A SaaS dashboard with a sidebar, metric cards, and a data table with user rows." Export the React components.

## Step 2: Add logic in Bolt

Paste your components into bolt.new and describe the business logic. "When a user clicks the table row, show a detail panel with their subscription info." Bolt wires it up.

## Step 3: Connect Supabase

Create a Supabase project, copy the URL and anon key into your environment variables, and let Claude or Cursor write the database queries. Supabase's auto-generated API means you barely need to write SQL.

## Step 4: Deploy to Vercel

Connect your GitHub repo to Vercel. Push to main and it deploys automatically. Your SaaS is live.

## What this proves

The barrier to shipping software is no longer code. It's judgment: knowing what to build, who it's for, and how to iterate based on feedback.
  `.trim(),

  "ai-automation-freelancers": `
## The five workflows that save the most time

These are the automations I recommend to every freelancer I coach. Implement these five and you'll reclaim meaningful hours every week.

## 1. Client onboarding (n8n)

Trigger: New client pays invoice. Actions: Create project folder in Google Drive, send welcome email with Calendly link, create tasks in Notion, send Slack message to yourself. Setup time: ~2 hours. Time saved per client: ~45 minutes.

## 2. Weekly reporting (Zapier)

Trigger: Every Monday at 8am. Actions: Pull time tracking data from Toggl, generate summary with OpenAI, send email to each client. Setup time: ~1 hour. Time saved per week: ~1.5 hours.

## 3. Content scheduling (Make)

Trigger: New blog post published. Actions: Generate Twitter thread with Claude API, schedule LinkedIn post, create email newsletter draft. Setup time: ~3 hours. Time saved per piece: ~40 minutes.

## 4. Invoice follow-up (n8n)

Trigger: Invoice unpaid after 7 days. Actions: Send polite follow-up email, add note to CRM, escalate after 14 days. Setup time: ~1 hour. Awkward conversations avoided: countless.

## 5. Testimonial collection (Zapier)

Trigger: Project marked complete. Actions: Wait 3 days, send testimonial request email with form link, add response to portfolio site database. Setup time: ~1 hour. Testimonials collected automatically: yes.
  `.trim(),

  "top-ai-tools-2025": `
## The criteria

We evaluated each tool on output quality, reliability, speed, price, and learning curve. Popularity didn't factor in — only what we'd actually recommend to someone building with AI today.

## Writing & content

**Claude** (Anthropic) — Best for long documents, analysis, and nuanced writing tasks. The context window is large and it follows complex instructions reliably.

**ChatGPT** (OpenAI) — Most versatile. Enormous plugin ecosystem and best for people who need one tool that does everything adequately.

## Coding

**Cursor** — The best AI code editor for serious development. Full codebase awareness changes what's possible.

**GitHub Copilot** — Best for teams already in VS Code who want lower friction. Good autocomplete.

## Image generation

**Midjourney v6** — Best image quality for artistic and commercial work. The style consistency improvements in v6 are significant.

**FLUX** — Best open-source option. Runs locally, no usage limits, excellent for product photography styles.

## Automation

**n8n** — Most powerful self-hosted automation. Steep learning curve but unlimited flexibility.

**Make** — Better UX than Zapier at a lower price. The right choice for most freelancers and small teams.

## The honest take

Most people only need 2-3 tools. Pick one for writing, one for coding, and one for automation. Mastering fewer tools deeply beats dabbling in many.
  `.trim(),
};

export function getBlogPost(slug: string): (BlogPost & { content: string }) | null {
  const meta = BLOG_POSTS.find((p) => p.slug === slug);
  const content = BLOG_CONTENT[slug];
  if (!meta || !content) return null;
  return { ...meta, content };
}
