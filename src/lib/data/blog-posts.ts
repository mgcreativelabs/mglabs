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
  {
    id: "6",
    slug: "build-ai-chatbot-without-coding",
    title: "How to Build an AI Chatbot Without Coding (2025 Guide)",
    excerpt:
      "You don't need to write code to build a working AI chatbot. Here's the exact process — from idea to a live, usable chatbot — using free tools.",
    category: "tutorials",
    tags: ["Chatbot", "No-Code", "Groq", "Beginners"],
    reading_time: 10,
    is_featured: true,
    published_at: "2025-06-15",
    author: { full_name: "MG Labs", avatar_url: null },
  },
  {
    id: "7",
    slug: "best-free-ai-apis-beginners-2025",
    title: "Best Free AI APIs for Beginners in 2025",
    excerpt:
      "Groq, Gemini, Hugging Face, and more. A practical breakdown of which free AI APIs are actually worth using — and what each one is best for.",
    category: "ai-tools",
    tags: ["API", "Groq", "Gemini", "Free Tools"],
    reading_time: 8,
    is_featured: false,
    published_at: "2025-06-20",
    author: { full_name: "MG Labs", avatar_url: null },
  },
  {
    id: "8",
    slug: "what-is-prompt-engineering",
    title: "What Is Prompt Engineering? A Beginner's Complete Guide",
    excerpt:
      "Prompt engineering is the most valuable AI skill most people ignore. Here's what it is, why it matters, and how to start getting dramatically better results.",
    category: "prompt-engineering",
    tags: ["Prompt Engineering", "Beginners", "ChatGPT"],
    reading_time: 7,
    is_featured: false,
    published_at: "2025-06-25",
    author: { full_name: "MG Labs", avatar_url: null },
  },
  {
    id: "9",
    slug: "how-to-make-money-with-ai-tools-2025",
    title: "How to Make Money With AI Tools in 2025 (Real Methods)",
    excerpt:
      "Not theory. These are the AI-powered income streams that are actually working for real people right now — with honest estimates of what each requires.",
    category: "tutorials",
    tags: ["Make Money", "AI Business", "Freelance", "Side Hustle"],
    reading_time: 9,
    is_featured: true,
    published_at: "2025-07-01",
    author: { full_name: "MG Labs", avatar_url: null },
  },
  {
    id: "10",
    slug: "ai-project-ideas-for-beginners",
    title: "10 AI Project Ideas for Beginners (That You Can Actually Build)",
    excerpt:
      "Not 'build a self-driving car'. These are real AI projects a beginner can complete in a weekend — and some you can turn into income.",
    category: "tutorials",
    tags: ["Project Ideas", "Beginners", "Build AI", "Side Projects"],
    reading_time: 8,
    is_featured: false,
    published_at: "2025-07-05",
    author: { full_name: "MG Labs", avatar_url: null },
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

  "build-ai-chatbot-without-coding": `
## What you're actually building

A chatbot is software that takes a text input, sends it to an AI model, and returns a text response. The "coding" part that scares people is mostly just the plumbing — connecting the pieces. And in 2025, you can do that without writing a single line of code.

This guide shows you the exact process using free tools available right now.

## What you need (all free)

- A Groq account — free tier is generous enough to run a real chatbot
- MG Labs access — our AI Builder lets you test chatbot behavior instantly
- A deployment method — Vercel (free), or even a Notion page embed

## Step 1: Define what your chatbot does

Before anything technical, write one sentence: "This chatbot helps [specific person] do [specific thing]."

Bad: "This chatbot answers questions."
Good: "This chatbot helps coffee shop owners respond to customer complaints professionally and quickly."

The specificity of that sentence determines the quality of everything that comes after.

## Step 2: Write the system prompt

The system prompt is the instruction set that turns a generic AI into your specific chatbot. It has four parts:

**Role:** Who is this AI? ("You are a customer support specialist for Brew & Co coffee shop.")

**Context:** What does it need to know? (Opening hours, menu, policies.)

**Rules:** What should and shouldn't it do? ("Never make up information. Always offer to escalate complaints.")

**Format:** How should it respond? ("Keep replies under 3 sentences. Be warm but professional.")

Write this in plain English. No code needed.

## Step 3: Test it in MG Labs

Go to MG Labs → Start Building → AI Chatbot. Paste your system prompt into the behavior field and test it with 10 different messages — including edge cases. Refine based on what breaks.

## Step 4: Deploy it

If you want a shareable link: the easiest path is Vercel's v0.dev, which lets you describe what you want and generates the interface. For a real production deployment, the MG Labs Launch Program handles this step with you.

## What most guides skip

Building the chatbot logic is 20% of the work. The other 80% is: hosting it somewhere stable, handling errors gracefully, managing API costs, and making it feel good to use. These aren't hard, but they require decisions. That's where most beginners get stuck — not at the "build" step but at the "finish and ship" step.

## The honest bottom line

You can have a working chatbot prototype in under an hour using the steps above. Turning that into a real product someone else can use is a separate challenge — one worth solving, because a well-built chatbot for a specific niche is genuinely sellable.
  `.trim(),

  "best-free-ai-apis-beginners-2025": `
## Why the API matters

When you build an AI product, you're not running the AI yourself. You're making API calls to a service that does. Which API you choose determines: speed, cost, model quality, and how many requests you get for free.

Here are the best free options available right now, ranked by what they're actually good for.

## 1. Groq — Best for speed

Groq's free tier gives you access to Llama 3.3 70B and other models running on their custom LPU chips. The result is inference speeds that feel instant — most responses arrive in under a second. For anything user-facing where latency matters, Groq is the right default.

Free tier: 14,400 requests per day (rate limited). More than enough for a prototype or small product.

Best for: Chatbots, real-time applications, anything where speed is felt by the user.

## 2. Google Gemini API — Best for multimodal tasks

Google's Gemini API via AI Studio has a generous free tier and access to Gemini 1.5 Flash, which has an enormous context window (1 million tokens). This matters when you need to process long documents or maintain long conversations.

Free tier: 15 requests per minute, 1 million tokens per minute, 1,500 requests per day.

Best for: Document analysis, long-context tasks, multimodal inputs (text + images).

## 3. Hugging Face Inference API — Best for variety

Hugging Face hosts thousands of open-source models. The free tier gives you access to many of them. Quality varies significantly by model, but for specific tasks (text classification, summarization, embeddings) you'll find specialized models that outperform general-purpose LLMs.

Free tier: Rate-limited access to the Inference API.

Best for: Specialized tasks, embeddings, experimenting with different model architectures.

## 4. OpenRouter — Best for flexibility

OpenRouter is a single API that routes to dozens of different models — including free ones. You write one API call and can switch between Claude, GPT, Llama, Mistral, and others by changing one parameter. Some models on OpenRouter are completely free.

Free tier: Several models available at zero cost with a standard account.

Best for: Builders who want to test multiple models without managing multiple API keys.

## 5. Mistral API — Best for European users

Mistral offers strong models (Mixtral) with a free trial tier. The models are competitive with larger alternatives and particularly good at coding and reasoning tasks.

Free tier: Trial credits on signup.

Best for: Coding assistance, structured reasoning tasks.

## The right setup for a beginner

Start with Groq. Get comfortable making API calls, handling responses, and building around a single model. Once your product is working, explore other providers if you have a specific need they address better.

Don't try to integrate five APIs at once. One well-used API beats five half-understood ones.
  `.trim(),

  "what-is-prompt-engineering": `
## The short answer

Prompt engineering is the practice of writing inputs to AI systems — called prompts — to reliably get the outputs you want. It's the difference between getting a mediocre response and a precise, useful one from the same AI model.

The model doesn't change. The prompt changes. The results change dramatically.

## Why it matters more than people think

Most people use AI like a search engine: type a vague question, get a vague answer, move on. Prompt engineers use AI like a precise instrument: give structured instructions, get structured results, iterate until it's right.

The gap in output quality between these two approaches is enormous. And prompt engineering is a learnable skill — not a talent, not a technical background, just a set of patterns worth understanding.

## The core concept: instruction clarity

AI models generate text based on what text logically follows from the input. A vague input produces vague output because there are thousands of valid "next sentences" that could follow. A precise input narrows the possibilities.

Compare:
- Vague: "Write me something about marketing."
- Precise: "Write a 3-sentence LinkedIn post for a freelance graphic designer targeting small restaurant owners. Tone: confident, friendly. No jargon. End with a question."

Same model. Completely different result.

## The three most important techniques

**1. Role assignment**

Tell the AI who it is. "You are a [specific expert] who [does specific thing]." This frames every response through that lens.

**2. Output format specification**

Tell the AI exactly how to structure the response. "Respond with exactly 3 bullet points, each under 20 words." Vague format instructions produce inconsistent results.

**3. Constraint setting**

Define what the AI should not do. "Do not give generic advice. Do not use filler phrases like 'certainly' or 'of course'. Never start a response with 'I'."

## System prompts vs user prompts

Most AI products use two types of prompts. The system prompt sets the AI's behavior, role, and rules — and users never see it. The user prompt is what the person types. Understanding this separation is foundational to building AI products.

If you've ever noticed that a company's chatbot always responds in a specific style — that's a system prompt doing its job.

## How to get better at it

There's no shortcut: practice and iteration. Write a prompt, test it with 10 inputs, find where it breaks, rewrite it. Each failure teaches you something. After 20-30 hours of deliberate practice, the patterns become intuitive.

The MG Labs Foundation Path covers prompt engineering in Lessons 3 and 4 if you want a structured approach.
  `.trim(),

  "how-to-make-money-with-ai-tools-2025": `
## The honest framing

Most "make money with AI" content is either vague ("use AI for productivity!") or misleading ("make $10,000 a month with one prompt!"). This post covers real methods that real people are using, with honest assessments of what each requires in time, skill, and capital.

## Method 1: AI-assisted freelancing (lowest barrier, fastest income)

The fastest path to AI income is using AI to do your existing skills faster and better — then keeping the time savings as profit or taking on more clients.

If you're a writer: AI drafts, you edit and refine. You can do 3x the work in the same time.
If you're a designer: AI generates variations, you select and refine. Same multiplication.
If you're a developer: AI writes boilerplate, you architect and review. More hours per project without more hours worked.

Realistic income: Depends entirely on your existing skill set. The AI doesn't create the skill — it multiplies it.

## Method 2: Building and selling AI tools for specific niches ($500–$5,000 per tool)

A chatbot built for a specific industry (real estate, legal, medical admin, restaurants) is worth real money to that industry. You're not selling "an AI chatbot" — you're selling "a tool that answers customer questions for Italian restaurants so the owner doesn't have to stay late answering DMs."

Niche specificity is where the pricing power comes from. Generic AI tools are free. Specific ones command fees.

Timeline to first sale: 4–12 weeks depending on the niche and your starting point.

## Method 3: AI-powered content and digital products ($9–$199 per product)

Prompt packs, templates, guides, and workflows that help people use AI better. Low production cost, zero delivery cost, unlimited upside from a single well-positioned product.

The key: specificity again. "AI prompts for social media" is too broad. "50 AI prompts for boutique hotel owners to write compelling room descriptions" is something a specific person will pay for without hesitation.

## Method 4: Consulting and education ($100–$500/hour)

Teaching others how to use AI tools for their business. This requires credibility (which you build by doing the above first), but the ceiling is high.

At the top of this market: companies paying $5,000–$20,000 for AI integration audits and strategy sessions. At the entry point: freelancers charging $150/hour to help small businesses set up their first AI workflows.

## Method 5: Building an AI product business (hardest, highest ceiling)

A subscription SaaS product powered by AI. This requires the most upfront work but has the best long-term economics. Monthly recurring revenue, low marginal cost, scalable.

The barrier: you need a real problem, a real audience, and the ability to build or hire someone to build it.

## The honest timeline

People who make real money with AI in year one almost always started in Method 1 or 2. The knowledge and client relationships from there fund Method 3 and 4. Method 5 is the long game.

The tools are ready. The question is whether you have a specific problem worth solving and the consistency to see it through.
  `.trim(),

  "ai-project-ideas-for-beginners": `
## How to use this list

These aren't "someday" ideas. Each one is achievable by a beginner with free tools in a weekend. Some are portfolio projects. Some are genuinely sellable. All of them will teach you more than any tutorial.

## 1. A chatbot for a local business

Pick any local business — a coffee shop, a gym, a hair salon — and build a chatbot that answers the top 10 questions their customers ask. Train it on their menu, hours, and policies.

Why it's great: Immediately useful. You can show the business owner a live demo. Real potential to get paid for it.

Build time: One weekend. Cost: Free.

## 2. A personal writing assistant

Build a chatbot with a system prompt trained on your own writing style. Feed it your best emails, posts, or essays as examples. Now it drafts things that sound like you.

Why it's great: Immediately personal and useful. You learn a lot about system prompts through the iteration.

## 3. An AI study flashcard generator

Input any topic or text. Get back 10 flashcard-style question/answer pairs. Simple, genuinely useful for students.

Why it's great: The idea is simple enough that you'll finish it. And there's a market — students and educators are underserved by AI tools built for them specifically.

## 4. A prompt optimizer tool

Users paste any prompt. The AI rewrites it to be clearer, more specific, and more effective. Then explains what changed and why.

Why it's great: Meta-useful (the tool teaches prompt engineering by example). Highly shareable. Strong CTA to your services if you build it well.

## 5. A customer FAQ bot for your own business or project

If you have a side project, build a chatbot that knows everything about it. Answers questions, explains the product, handles objections.

Why it's great: You're solving your own problem. Personal projects with a real use case get finished; abstract exercises don't.

## 6. An AI business name generator

Users input what their business does, their target audience, and desired vibe. Output: 10 business name ideas with explanations.

Why it's great: High shareability. Easy to build. People actually use these.

## 7. A daily email summarizer

Connect to a news API or RSS feed for a specific niche. Every day, generate a 5-bullet summary of the top stories. Send it via email.

Why it's great: Teaches you about API integrations, not just prompts. Genuinely useful output. Potential for a newsletter product.

## 8. An AI recipe generator from ingredients

Users enter what's in their fridge. AI outputs 3 recipes they can make right now. With instructions.

Why it's great: Fun to build, fun to use, easy to share. Good first project for the "finish and ship" discipline.

## 9. A job application cover letter writer

User inputs the job posting and their resume. AI generates a tailored cover letter. User edits and sends.

Why it's great: High personal value, immediate practical use, teaches you about long-form structured output.

## 10. A niche knowledge base chatbot

Pick a topic you know well. Build a chatbot that knows everything about it — your own version of an expert assistant. It can become a product over time.

Why it's great: The domain knowledge is already in your head. The technical work is just the wrapper.

## The rule for picking one

Don't optimize for impressiveness. Optimize for completion. A finished simple project teaches you 10x more than an unfinished ambitious one. Pick the idea on this list that you could see yourself actually using, and build that one first.
  `.trim(),
};

export function getBlogPost(slug: string): (BlogPost & { content: string }) | null {
  const meta = BLOG_POSTS.find((p) => p.slug === slug);
  const content = BLOG_CONTENT[slug];
  if (!meta || !content) return null;
  return { ...meta, content };
}
