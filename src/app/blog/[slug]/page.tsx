import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Clock, Calendar, Eye, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils/format";

// ─────────────────────────────────────────────────────────────
// All backtick-heavy content uses regular strings with \n.
// No template literals inside content values — avoids build errors.
// ─────────────────────────────────────────────────────────────

const BLOG_POSTS: Record<string, {
  title: string; category: string; tags: string[];
  reading_time: number; views_count: number; published_at: string;
  author: string; excerpt: string; content: string;
}> = {
  "prompt-engineering-complete-guide": {
    title: "The Complete Guide to Prompt Engineering in 2025",
    category: "Prompt Engineering",
    tags: ["Prompts", "ChatGPT", "Claude"],
    reading_time: 12,
    views_count: 48200,
    published_at: "2025-05-10",
    author: "MG Creative Labs",
    excerpt: "Everything you need to know to write prompts that get 10x better results.",
    content:
      "## What is Prompt Engineering?\n\n" +
      "Prompt engineering is the practice of crafting inputs to AI language models in a way that produces the best possible output. It's equal parts science and art — and in 2025, it's one of the most valuable skills you can have.\n\n" +
      "---\n\n" +
      "## The 5 Core Principles\n\n" +
      "### 1. Be Specific, Not Vague\n\n" +
      "**Bad:** Write me a blog post.\n\n" +
      "**Good:** Write a 1,200-word blog post targeting beginner freelancers. The topic is 'How to Find Your First Client Using LinkedIn.' Use a conversational tone, include 3 actionable tips, and end with a clear CTA.\n\n" +
      "---\n\n" +
      "### 2. Assign a Role (System Prompting)\n\n" +
      "Tell the AI *who* it should be before asking your question.\n\n" +
      "Example: \"You are a senior software engineer with 10 years of experience in Python. Answer the following as if you're teaching a junior developer.\"\n\n" +
      "This single technique dramatically improves the quality and relevance of responses.\n\n" +
      "---\n\n" +
      "### 3. Use Chain-of-Thought (CoT)\n\n" +
      "Add \"Think step by step\" or \"Let's work through this carefully\" to your prompt. This forces the AI to reason before answering — which significantly reduces errors on complex tasks.\n\n" +
      "> \"Before giving your final answer, think through each step of the problem carefully and show your reasoning.\"\n\n" +
      "---\n\n" +
      "### 4. Few-Shot Examples\n\n" +
      "Show the AI what you want by providing examples inside the prompt. Give 1-2 input/output pairs before asking for the real one.\n\n" +
      "---\n\n" +
      "### 5. Iterate and Refine\n\n" +
      "Never treat the first response as final. Follow up with:\n" +
      "- Make this more concise.\n" +
      "- Rewrite the introduction to be more engaging.\n" +
      "- Give me 3 alternative versions of the headline.\n\n" +
      "---\n\n" +
      "## The Prompt Formula\n\n" +
      "For most tasks, this structure works incredibly well:\n\n" +
      "> **[Role] + [Context] + [Task] + [Format] + [Constraints]**\n\n" +
      "Example: *\"You are an expert email copywriter (Role). I'm a SaaS founder (Context). Write a cold outreach email to startup CTOs (Task) in 3 paragraphs (Format). Keep it under 150 words and avoid salesy language (Constraints).\"*\n\n" +
      "---\n\n" +
      "## Prompt Templates to Steal\n\n" +
      "**Content writing:** Write a [format] about [topic] for [audience]. Tone: [tone]. Length: [length]. Include: [specific requirements].\n\n" +
      "**Code generation:** Write a [language] function that [description]. It should handle [edge cases]. Include comments explaining each section.\n\n" +
      "**Analysis:** Analyze the following [content]. Identify the top 3 [insights/issues/opportunities] and explain each in 2-3 sentences.\n\n" +
      "---\n\n" +
      "## Conclusion\n\n" +
      "Start with the basics, apply the formula, and within a week you'll be getting dramatically better results from every AI tool you use.",
  },

  "cursor-vs-copilot-2025": {
    title: "Cursor vs GitHub Copilot: Which AI Code Editor Wins in 2025?",
    category: "Coding",
    tags: ["Cursor", "Copilot", "AI Coding"],
    reading_time: 8,
    views_count: 31500,
    published_at: "2025-05-22",
    author: "MG Creative Labs",
    excerpt: "We tested both tools on 50 real coding tasks. Here's the honest breakdown.",
    content:
      "## The Battle of AI Code Editors\n\n" +
      "In 2025, every developer is using AI assistance — the question is *which* tool. We spent 30 days testing both Cursor and GitHub Copilot on 50 real-world coding tasks.\n\n" +
      "---\n\n" +
      "## GitHub Copilot: The OG\n\n" +
      "GitHub Copilot has been the industry standard since 2021. It integrates directly into VS Code, JetBrains IDEs, and more.\n\n" +
      "**Strengths:**\n" +
      "- Seamless VS Code integration\n" +
      "- Great for single-line and short block completions\n" +
      "- Strong language support (Python, JS, TypeScript, Go, Rust)\n" +
      "- GitHub integration for PR suggestions\n\n" +
      "**Weaknesses:**\n" +
      "- Struggles with large, complex refactors\n" +
      "- Less context-aware across multiple files\n\n" +
      "**Pricing:** $10/month individual, $19/month business\n\n" +
      "---\n\n" +
      "## Cursor: The New Challenger\n\n" +
      "Cursor is a fork of VS Code with AI baked into its DNA. It can edit entire files, explain codebases, and run shell commands.\n\n" +
      "**Strengths:**\n" +
      "- Multi-file edits (Composer mode) is genuinely magical\n" +
      "- Deep codebase awareness — understands your entire project\n" +
      "- Built-in chat that can reference files with @mentions\n" +
      "- Faster for large refactors and debugging\n" +
      "- Feels like pair-programming with a senior dev\n\n" +
      "**Weaknesses:**\n" +
      "- Steeper learning curve for VS Code power users\n" +
      "- Privacy concerns (code is sent to Cursor's servers by default)\n\n" +
      "**Pricing:** Free tier available, $20/month Pro\n\n" +
      "---\n\n" +
      "## Head-to-Head Results\n\n" +
      "Autocomplete single lines: Copilot ⭐⭐⭐⭐⭐ vs Cursor ⭐⭐⭐⭐\n\n" +
      "Multi-file refactoring: Copilot ⭐⭐ vs Cursor ⭐⭐⭐⭐⭐\n\n" +
      "Debugging with context: Copilot ⭐⭐⭐ vs Cursor ⭐⭐⭐⭐⭐\n\n" +
      "Explaining unfamiliar code: Copilot ⭐⭐⭐ vs Cursor ⭐⭐⭐⭐⭐\n\n" +
      "Writing tests: Copilot ⭐⭐⭐⭐ vs Cursor ⭐⭐⭐⭐\n\n" +
      "---\n\n" +
      "## Our Verdict\n\n" +
      "**Use Copilot if:** You live in JetBrains, or you primarily want line-by-line completion.\n\n" +
      "**Use Cursor if:** You're building full projects, want to move fast, and want an AI that understands your whole codebase.\n\n" +
      "For 2025, we recommend **Cursor for most developers**. The Composer feature alone makes it worth switching — being able to say \"refactor this entire authentication module to use Supabase\" and have it work across 8 files is a game-changer.",
  },

  "build-saas-ai-tools": {
    title: "How to Build a SaaS Product Using Only AI Tools (No Prior Coding)",
    category: "Tutorials",
    tags: ["v0", "Bolt", "No-code", "SaaS"],
    reading_time: 15,
    views_count: 19600,
    published_at: "2025-06-05",
    author: "MG Creative Labs",
    excerpt: "A step-by-step walkthrough of building and deploying a real SaaS product using v0, Bolt, Supabase, and Vercel.",
    content:
      "## You Don't Need to Know How to Code Anymore\n\n" +
      "Six months ago, I had an idea for a SaaS tool. I had zero coding experience. Today, that tool has 200 paying customers. This is exactly how I did it.\n\n" +
      "---\n\n" +
      "## The Stack\n\n" +
      "- **v0 by Vercel** — for generating UI components from text descriptions\n" +
      "- **Bolt.new** — for generating full-stack apps from scratch\n" +
      "- **Supabase** — for database, authentication, and backend\n" +
      "- **Vercel** — for deployment\n" +
      "- **Stripe** — for payments\n\n" +
      "Total cost to build: $0 (all free tiers)\n\n" +
      "---\n\n" +
      "## Step 1: Define Your Idea (1 hour)\n\n" +
      "Before writing a single prompt, answer these questions:\n" +
      "1. What problem does it solve?\n" +
      "2. Who is the target user?\n" +
      "3. What is the core feature (the ONE thing it must do)?\n" +
      "4. How will you charge for it?\n\n" +
      "My idea: A tool that generates cold email sequences for freelancers. Charge $19/month for unlimited sequences.\n\n" +
      "---\n\n" +
      "## Step 2: Generate the UI with v0 (2-3 hours)\n\n" +
      "Go to **v0.dev** and describe your interface in plain English. v0 will generate production-ready React + Tailwind code. Click 'Open in Vercel' to deploy instantly.\n\n" +
      "---\n\n" +
      "## Step 3: Add a Database with Supabase (1-2 hours)\n\n" +
      "1. Create a free Supabase account at supabase.com\n" +
      "2. Create a new project\n" +
      "3. Tell an AI assistant: \"I need a table called sequences that stores: user_id, niche (text), target_client (text), generated_sequences (json), created_at (timestamp). Write the SQL.\"\n" +
      "4. Paste the SQL into Supabase's SQL editor and run it\n" +
      "5. Copy your Supabase URL and anon key\n\n" +
      "---\n\n" +
      "## Step 4: Add Authentication (30 minutes)\n\n" +
      "Supabase has built-in auth. Ask Claude or ChatGPT: \"Write the code to add Google OAuth login to my Next.js + Supabase project. Include the callback route and a protected dashboard page.\"\n\n" +
      "Add the generated code. Done.\n\n" +
      "---\n\n" +
      "## Step 5: Connect the AI API (1-2 hours)\n\n" +
      "Get a free API key from OpenAI or Anthropic. Then ask an AI: \"Write a Next.js API route at /api/generate that takes user input, sends it to the OpenAI API to generate a cold email sequence, and returns the result as JSON.\"\n\n" +
      "---\n\n" +
      "## Step 6: Add Stripe Payments (2 hours)\n\n" +
      "1. Create a Stripe account and get your API keys\n" +
      "2. Ask Claude: \"Set up a Stripe subscription checkout with Next.js for a $19/month plan. Include a webhook to update subscription status in Supabase.\"\n" +
      "3. Follow the generated code step by step\n\n" +
      "---\n\n" +
      "## Step 7: Deploy (15 minutes)\n\n" +
      "Push to GitHub, connect to Vercel, add your environment variables, and deploy. Your SaaS is live.\n\n" +
      "---\n\n" +
      "## What I Learned\n\n" +
      "The hardest part wasn't the coding — it was validation. Build fast, charge early, and don't wait for perfection. Your v1 will be ugly. That's fine. Ship it anyway.",
  },

  "top-ai-tools-2025": {
    title: "The 20 Best AI Tools of 2025 (Ranked by Actual Usefulness)",
    category: "AI Tools",
    tags: ["AI Tools", "Reviews", "2025"],
    reading_time: 11,
    views_count: 52100,
    published_at: "2025-04-20",
    author: "MG Creative Labs",
    excerpt: "We tested over 100 AI tools so you don't have to.",
    content:
      "## How We Ranked These Tools\n\n" +
      "We evaluated over 100 AI tools across five criteria: output quality, ease of use, speed, pricing, and real-world usefulness. Only tools that genuinely save time or money made the list.\n\n" +
      "---\n\n" +
      "## Top 5 Text & Writing AI\n\n" +
      "**1. Claude 3.5 Sonnet (Anthropic)** — Best for long-form writing, coding assistance, and nuanced reasoning. Handles a 200K context window. Our go-to for complex tasks.\n\n" +
      "**2. ChatGPT-4o (OpenAI)** — Best all-rounder. Excels at creative tasks, coding, and has the broadest plugin ecosystem.\n\n" +
      "**3. Gemini 1.5 Pro (Google)** — Best for research. 1M token context window means you can upload entire codebases or books.\n\n" +
      "**4. Perplexity AI** — Best for real-time research. Combines LLM reasoning with live web search. Replaces Google for many tasks.\n\n" +
      "**5. Notion AI** — Best for knowledge workers already in Notion. Summarize, draft, and edit without leaving your workspace.\n\n" +
      "---\n\n" +
      "## Top 5 Image Generation\n\n" +
      "**6. Midjourney v6** — Still the king for artistic images. Unparalleled aesthetic quality.\n\n" +
      "**7. DALL-E 3 (via ChatGPT)** — Best for precise, instruction-following image generation.\n\n" +
      "**8. Adobe Firefly** — Best for professional/commercial use. Trained on licensed images, so output is commercially safe.\n\n" +
      "**9. Stable Diffusion (SDXL)** — Best for power users who want control. Free, open-source, infinitely customizable.\n\n" +
      "**10. Canva AI** — Best for non-designers. Drag-and-drop simplicity with AI magic.\n\n" +
      "---\n\n" +
      "## Top 5 Coding Tools\n\n" +
      "**11. Cursor** — Best AI code editor. Understands your entire codebase. Multi-file edits.\n\n" +
      "**12. GitHub Copilot** — Best Copilot for VS Code/JetBrains users. Fast and accurate autocomplete.\n\n" +
      "**13. v0 by Vercel** — Best for generating UI. Describe a component, get production-ready React/Tailwind code.\n\n" +
      "**14. Bolt.new** — Best for full-stack prototyping. Spin up a working Next.js app from a single prompt.\n\n" +
      "**15. Replit AI** — Best for beginners. Cloud IDE + AI assistant. Build and deploy from the browser.\n\n" +
      "---\n\n" +
      "## Top 5 Automation & Productivity\n\n" +
      "**16. n8n** — Best open-source automation. Self-host or use cloud. Far more powerful than Zapier for complex workflows.\n\n" +
      "**17. Make (Integromat)** — Best visual automation builder. 1,500+ app integrations.\n\n" +
      "**18. Zapier AI** — Best for non-technical users. Simple automation with an AI natural language interface.\n\n" +
      "**19. Otter.ai** — Best meeting transcription. Real-time transcription, AI summaries, and action item extraction.\n\n" +
      "**20. Granola** — Best AI meeting notes. Integrates with your calendar and gives you searchable, structured notes.\n\n" +
      "---\n\n" +
      "## Our Top Pick\n\n" +
      "If you could only use ONE AI tool in 2025, make it **Claude**. Its combination of reasoning ability, writing quality, coding help, and long context window makes it the most versatile tool on this list.",
  },

  "midjourney-v6-tips": {
    title: "10 Midjourney v6 Tricks That Most People Don't Know",
    category: "Design",
    tags: ["Midjourney", "AI Art", "Design"],
    reading_time: 7,
    views_count: 27800,
    published_at: "2025-06-01",
    author: "MG Creative Labs",
    excerpt: "Advanced techniques for better composition, lighting, and style consistency.",
    content:
      "## Elevate Your Midjourney Game\n\n" +
      "Most people using Midjourney are still relying on basic text prompts. These 10 techniques will put you in the top 1% of Midjourney users.\n\n" +
      "---\n\n" +
      "**1. Use style references with --sref**\n" +
      "Upload an image as a style reference using --sref [URL]. This makes your new generation match the aesthetic of the reference image without copying the content.\n\n" +
      "**2. Control variation with --chaos**\n" +
      "Add --chaos 0-100 to control how different your 4 grid images are from each other. Low chaos = consistent variations. High chaos = wildly different interpretations.\n\n" +
      "**3. Stylize with --stylize**\n" +
      "--stylize 0 follows your prompt literally. --stylize 1000 gives Midjourney creative freedom. Default is 100. Try 250-500 for a nice balance.\n\n" +
      "**4. Use negative prompts with --no**\n" +
      "Remove unwanted elements: --no text, watermark, blurry, low quality\n\n" +
      "**5. Aspect ratios for social media**\n" +
      "- Instagram square: --ar 1:1\n" +
      "- Instagram story/Reels: --ar 9:16\n" +
      "- YouTube thumbnail: --ar 16:9\n\n" +
      "**6. Lighting descriptors that work**\n" +
      "- golden hour lighting, rim light from behind\n" +
      "- dramatic chiaroscuro lighting\n" +
      "- soft diffused studio lighting, beauty dish\n" +
      "- neon-lit, cyberpunk atmosphere\n\n" +
      "**7. Camera and lens descriptors**\n" +
      "- shot on 85mm f/1.4, shallow depth of field\n" +
      "- aerial drone photography\n" +
      "- macro photography, extreme close-up\n\n" +
      "**8. Artist style references**\n" +
      "Reference an artist's style: \"in the style of Monet's impressionism\" or \"inspired by Bauhaus design principles\"\n\n" +
      "**9. Vary Region for targeted edits**\n" +
      "After generating, click Vary Region to redraw only part of an image. Perfect for fixing faces or backgrounds without regenerating everything.\n\n" +
      "**10. Consistent characters with --cref**\n" +
      "Use --cref [URL] to maintain character consistency across multiple images. Essential for recurring characters or personas.\n\n" +
      "---\n\n" +
      "## The Prompt Formula That Works Every Time\n\n" +
      "> **[Subject] + [Setting] + [Lighting] + [Mood] + [Style] + [Technical specs]**\n\n" +
      "Example: \"Portrait of a young woman entrepreneur, modern Tokyo office, golden hour lighting through glass windows, confident expression, cinematic photography, 85mm lens --ar 4:5 --stylize 300\"\n\n" +
      "Save this formula. Memorize it. Use it every time.",
  },

  "ai-automation-freelancers": {
    title: "The Freelancer's Guide to AI Automation: Save 15 Hours Per Week",
    category: "Automation",
    tags: ["n8n", "Automation", "Freelance"],
    reading_time: 10,
    views_count: 14300,
    published_at: "2025-06-08",
    author: "MG Creative Labs",
    excerpt: "The exact n8n and Zapier workflows I use to automate client onboarding, invoicing, content scheduling, and more.",
    content:
      "## Why Freelancers Waste 40% of Their Time\n\n" +
      "If you're freelancing, you're spending a huge chunk of your week on things that aren't your actual service: chasing invoices, onboarding clients, scheduling posts, answering routine emails.\n\n" +
      "I automated all of it. Here's exactly how.\n\n" +
      "---\n\n" +
      "## Workflow 1: Automated Client Onboarding (saves 3 hrs/week)\n\n" +
      "**The problem:** Every new client needs a welcome email, a contract, an invoice, a Slack channel, and a project folder. Manually, this takes 45+ minutes per client.\n\n" +
      "**The solution (n8n):**\n" +
      "1. Trigger: New form submission (Typeform/Tally)\n" +
      "2. Create folder in Google Drive with client name\n" +
      "3. Copy contract template, fill in details, send via DocuSign\n" +
      "4. Generate invoice in FreshBooks\n" +
      "5. Create Slack channel and invite client\n" +
      "6. Send welcome email with all links\n\n" +
      "Setup time: 2 hours. Time saved: 3+ hours every week forever.\n\n" +
      "---\n\n" +
      "## Workflow 2: Content Scheduling Machine (saves 5 hrs/week)\n\n" +
      "**The problem:** Planning, writing, and scheduling social media content takes forever.\n\n" +
      "**The solution:**\n" +
      "1. Every Monday, paste your weekly content ideas into a Notion database\n" +
      "2. Zapier triggers: for each new row, send the idea to an AI API\n" +
      "3. AI generates 3 variations (LinkedIn, Twitter, short-form)\n" +
      "4. Auto-schedule via Buffer at optimal posting times\n" +
      "5. You review and approve from your phone in 15 minutes\n\n" +
      "---\n\n" +
      "## Workflow 3: Invoice Chase Bot (saves 2 hrs/week)\n\n" +
      "**The problem:** Following up on late invoices is awkward and time-consuming.\n\n" +
      "**The solution (Make/Integromat):**\n" +
      "1. Connect your invoicing tool\n" +
      "2. Every day at 9am, check for invoices overdue more than 7 days\n" +
      "3. If found: send a polite follow-up email automatically\n" +
      "4. After 14 days: send firmer reminder\n" +
      "5. After 21 days: Slack notification to call the client\n\n" +
      "---\n\n" +
      "## Workflow 4: AI Email Triage (saves 4 hrs/week)\n\n" +
      "**The problem:** Sorting and responding to emails takes hours.\n\n" +
      "**The solution:**\n" +
      "1. Connect Gmail to n8n\n" +
      "2. For each new email, send to an AI API: \"Categorize this email as: new lead, existing client, spam, urgent, or newsletter. If it's a new lead, draft a response using my intro template.\"\n" +
      "3. AI categorizes and drafts responses\n" +
      "4. Draft replies appear in your drafts folder\n" +
      "5. You just review and click send\n\n" +
      "---\n\n" +
      "## Getting Started\n\n" +
      "The best place to start is **Make (formerly Integromat)** — it has a generous free tier and is easier to learn than n8n. Once you've built 2-3 workflows, graduate to n8n for more complex automations.\n\n" +
      "Your first workflow should be client onboarding. It delivers the most immediate ROI and is simpler than it sounds.\n\n" +
      "The goal isn't to automate everything — it's to automate the *boring* everything, so you can focus on the work only you can do.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} — MG Creative Labs Blog`,
    description: post.excerpt,
  };
}

// ── Tiny inline markdown renderer (no template literals in content) ─────────
function renderMarkdown(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (const line of lines) {
    if (line.startsWith("### ")) {
      elements.push(<h3 key={key++} className="text-lg font-semibold text-white mt-6 mb-3">{line.slice(4)}</h3>);
    } else if (line.startsWith("## ")) {
      elements.push(<h2 key={key++} className="text-2xl font-bold text-white mt-10 mb-4">{line.slice(3)}</h2>);
    } else if (line.startsWith("# ")) {
      elements.push(<h1 key={key++} className="text-3xl font-bold text-white mt-8 mb-4">{line.slice(2)}</h1>);
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      elements.push(<li key={key++} className="text-gray-400 ml-6 mb-1 list-disc">{renderInline(line.slice(2))}</li>);
    } else if (/^\d+\./.test(line)) {
      elements.push(<li key={key++} className="text-gray-400 ml-6 mb-1 list-decimal">{renderInline(line.replace(/^\d+\.\s*/, ""))}</li>);
    } else if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={key++} className="border-l-2 border-brand-blue pl-4 my-4 text-gray-400 italic">
          {renderInline(line.slice(2))}
        </blockquote>
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
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i} className="text-gray-300 italic">{part.slice(1, -1)}</em>;
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
  const post = BLOG_POSTS[slug];
  if (!post) notFound();

  return (
    <div className="pt-16 min-h-screen">
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
            <Badge key={tag} variant="default" size="sm">{tag}</Badge>
          ))}
        </div>

        <h1 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight mb-6">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-8 border-b border-white/[0.06] mb-10">
          <span className="font-medium text-gray-400">{post.author}</span>
          <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{formatDate(post.published_at)}</span>
          <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{post.reading_time} min read</span>
          <span className="flex items-center gap-1.5 ml-auto"><Eye className="h-3.5 w-3.5" />{post.views_count.toLocaleString()} views</span>
        </div>

        <div className="space-y-1">
          {renderMarkdown(post.content)}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 border border-white/[0.06] text-center">
          <h3 className="text-xl font-bold text-white mb-2">Want to master these skills?</h3>
          <p className="text-gray-400 mb-6">Join 50,000+ learners on MG Creative Labs — it&apos;s free to start.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup">
              <Button variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>Start learning free</Button>
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
