// =============================================
// COURSE CATALOG — src/lib/data/courses.ts
// Single source of truth for all course data.
// In production, these records live in the `courses` and `lessons`
// Supabase tables; this file seeds local/static rendering until
// the DB tables are populated.
// =============================================

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  isFree: boolean;
  completed: boolean;
}

export interface CourseModule {
  title: string;
  lessons: Lesson[];
}

export type CourseCategory = "learning" | "coding" | "design";
export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Course {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  level: CourseLevel;
  duration: string;
  rating: number;
  students: number;
  isFree: boolean;
  category: CourseCategory;
  tags: string[];
  instructor: string;
  updatedAt: string;
  modules: CourseModule[];
  whatYoullLearn: string[];
  /** icon key resolved to a Lucide component inside each page */
  iconKey: string;
}

// ─────────────────────────────────────────
// AI LEARNING HUB  (category: "learning")
// ─────────────────────────────────────────

const LEARNING_COURSES: Course[] = [
  {
    slug: "ai-foundations",
    title: "AI Foundations: How LLMs Actually Work",
    description:
      "Go beyond the hype. Understand transformers, training data, and why GPT-4 does what it does. No PhD required.",
    longDescription:
      "Most AI courses skip the why and jump straight to the how. This course is different. We start from first principles — what is a neural network, how does attention work, what happens during training — then build up to a practical understanding of how modern LLMs like GPT-4, Claude, and Gemini are designed and what that means for how you use them.",
    level: "Beginner",
    duration: "3h 20m",
    rating: 4.9,
    students: 12840,
    isFree: true,
    category: "learning",
    tags: ["LLMs", "GPT-4", "Claude", "Transformers"],
    instructor: "MG Creative Labs",
    updatedAt: "2025-05-01",
    iconKey: "brain",
    modules: [
      {
        title: "What is an LLM?",
        lessons: [
          { id: 1, title: "The history of language models", duration: "12:30", isFree: true, completed: false },
          { id: 2, title: "Tokens, embeddings, and vectors", duration: "18:45", isFree: true, completed: false },
          { id: 3, title: "How transformers work (plain English)", duration: "22:10", isFree: false, completed: false },
        ],
      },
      {
        title: "Training and alignment",
        lessons: [
          { id: 4, title: "Pre-training: what the model learns", duration: "16:00", isFree: false, completed: false },
          { id: 5, title: "RLHF: how models learn to be helpful", duration: "14:20", isFree: false, completed: false },
          { id: 6, title: "Why models hallucinate (and how to reduce it)", duration: "19:55", isFree: false, completed: false },
        ],
      },
      {
        title: "Practical model knowledge",
        lessons: [
          { id: 7, title: "GPT-4 vs Claude vs Gemini: real differences", duration: "24:10", isFree: false, completed: false },
          { id: 8, title: "Context windows and memory", duration: "11:30", isFree: false, completed: false },
          { id: 9, title: "Temperature, top-p, and sampling", duration: "15:00", isFree: false, completed: false },
          { id: 10, title: "Fine-tuning vs RAG vs prompting", duration: "20:40", isFree: false, completed: false },
          { id: 11, title: "The future: multimodal and agents", duration: "18:20", isFree: false, completed: false },
          { id: 12, title: "Final project: build your AI knowledge base", duration: "35:00", isFree: false, completed: false },
        ],
      },
    ],
    whatYoullLearn: [
      "Understand how transformer architecture enables modern AI",
      "Know the real differences between leading AI models",
      "Debug AI failures with a mental model of how LLMs work",
      "Make informed decisions about which model to use for which task",
      "Understand training, alignment, and why models behave as they do",
      "Explain LLMs clearly to non-technical colleagues",
    ],
  },
  {
    slug: "prompt-engineering-masterclass",
    title: "Prompt Engineering Masterclass",
    description:
      "The complete guide to writing prompts that get 10x better results. Chain-of-thought, system prompts, few-shot, and more.",
    longDescription:
      "Prompting is a skill. And like any skill, there's a gap between people who've systematically studied it and those who wing it. This course closes that gap. You'll learn every major prompting technique, when to use it, and how to build a personal prompt library that compounds over time.",
    level: "Intermediate",
    duration: "5h 45m",
    rating: 4.9,
    students: 21300,
    isFree: true,
    category: "learning",
    tags: ["Prompts", "ChatGPT", "Chain-of-thought", "Few-shot"],
    instructor: "MG Creative Labs",
    updatedAt: "2025-05-15",
    iconKey: "zap",
    modules: [
      {
        title: "Foundations",
        lessons: [
          { id: 1, title: "Why most prompts fail", duration: "10:00", isFree: true, completed: false },
          { id: 2, title: "The anatomy of a great prompt", duration: "15:30", isFree: true, completed: false },
          { id: 3, title: "Role prompting and system prompts", duration: "20:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Core techniques",
        lessons: [
          { id: 4, title: "Chain-of-thought prompting", duration: "18:00", isFree: false, completed: false },
          { id: 5, title: "Few-shot examples", duration: "16:20", isFree: false, completed: false },
          { id: 6, title: "Output formatting and constraints", duration: "14:10", isFree: false, completed: false },
          { id: 7, title: "Tree-of-thought and self-consistency", duration: "22:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Advanced patterns",
        lessons: [
          { id: 8, title: "Meta-prompting", duration: "19:30", isFree: false, completed: false },
          { id: 9, title: "Prompt chaining for complex tasks", duration: "25:00", isFree: false, completed: false },
          { id: 10, title: "Building a personal prompt library", duration: "30:00", isFree: false, completed: false },
          { id: 11, title: "Prompt evaluation and testing", duration: "17:45", isFree: false, completed: false },
          { id: 12, title: "Real-world project: a complete AI workflow", duration: "38:00", isFree: false, completed: false },
        ],
      },
    ],
    whatYoullLearn: [
      "Master chain-of-thought, few-shot, and role prompting",
      "Build reusable prompt templates for your workflows",
      "Get consistent, reliable outputs from any AI model",
      "Debug prompts that are not working the way you expect",
      "Create a personal prompt library that compounds over time",
      "Apply advanced patterns like meta-prompting and prompt chaining",
    ],
  },
  {
    slug: "ai-agents-fundamentals",
    title: "AI Agents: Build Autonomous Systems",
    description:
      "Build autonomous AI agents that can browse the web, write code, and complete multi-step tasks without hand-holding.",
    longDescription:
      "AI agents are the next frontier. Instead of answering one question at a time, agents can break down a goal, call tools, browse the web, write and execute code, and iterate until the task is done. This course teaches you how they work and how to build them from scratch — no advanced ML knowledge required.",
    level: "Advanced",
    duration: "6h 30m",
    rating: 4.8,
    students: 6430,
    isFree: false,
    category: "learning",
    tags: ["Agents", "AutoGPT", "LangChain", "Tool use"],
    instructor: "MG Creative Labs",
    updatedAt: "2025-06-01",
    iconKey: "bot",
    modules: [
      {
        title: "Agent fundamentals",
        lessons: [
          { id: 1, title: "What makes something an agent?", duration: "14:00", isFree: true, completed: false },
          { id: 2, title: "ReAct: reasoning + acting", duration: "20:30", isFree: true, completed: false },
          { id: 3, title: "Tools, functions, and APIs", duration: "22:00", isFree: false, completed: false },
          { id: 4, title: "Planning and memory in agents", duration: "19:15", isFree: false, completed: false },
        ],
      },
      {
        title: "Building agents",
        lessons: [
          { id: 5, title: "Your first agent with the OpenAI API", duration: "35:00", isFree: false, completed: false },
          { id: 6, title: "Web browsing agents", duration: "28:00", isFree: false, completed: false },
          { id: 7, title: "Code execution agents", duration: "32:00", isFree: false, completed: false },
          { id: 8, title: "Multi-agent systems", duration: "24:30", isFree: false, completed: false },
        ],
      },
      {
        title: "Production agents",
        lessons: [
          { id: 9, title: "Reliability and error handling", duration: "21:00", isFree: false, completed: false },
          { id: 10, title: "Guardrails and safety", duration: "18:45", isFree: false, completed: false },
          { id: 11, title: "Deploying an agent to production", duration: "40:00", isFree: false, completed: false },
        ],
      },
    ],
    whatYoullLearn: [
      "Understand the ReAct pattern that powers most production agents",
      "Build agents that can use tools, browse the web, and run code",
      "Design multi-step task pipelines that operate autonomously",
      "Handle agent failures gracefully with retry and fallback logic",
      "Deploy production-ready agents with guardrails",
      "Build your own custom agent from scratch with the OpenAI API",
    ],
  },
  {
    slug: "generative-ai-deep-dive",
    title: "Generative AI: Images, Video & Audio",
    description:
      "Master text-to-image, text-to-video, and audio generation. Turn creative ideas into stunning outputs with the top AI tools.",
    longDescription:
      "Generative AI has transformed what's possible for solo creators and small teams. This course gives you hands-on proficiency with Midjourney, DALL-E, Stable Diffusion, Runway, Suno, and ElevenLabs — covering technique, workflow, and commercial application.",
    level: "Beginner",
    duration: "4h 10m",
    rating: 4.8,
    students: 9200,
    isFree: true,
    category: "learning",
    tags: ["Midjourney", "DALL-E", "Stable Diffusion", "Runway", "Suno"],
    instructor: "MG Creative Labs",
    updatedAt: "2025-05-20",
    iconKey: "image",
    modules: [
      {
        title: "AI image generation",
        lessons: [
          { id: 1, title: "How diffusion models work", duration: "15:00", isFree: true, completed: false },
          { id: 2, title: "Midjourney: your first great image", duration: "22:30", isFree: true, completed: false },
          { id: 3, title: "DALL-E 3 vs Midjourney vs Stable Diffusion", duration: "18:00", isFree: false, completed: false },
          { id: 4, title: "Advanced Midjourney techniques", duration: "30:00", isFree: false, completed: false },
        ],
      },
      {
        title: "AI video and audio",
        lessons: [
          { id: 5, title: "AI video with Runway Gen-3", duration: "24:00", isFree: false, completed: false },
          { id: 6, title: "Consistent characters across frames", duration: "20:00", isFree: false, completed: false },
          { id: 7, title: "AI music with Suno and Udio", duration: "16:30", isFree: false, completed: false },
          { id: 8, title: "Voice cloning with ElevenLabs", duration: "19:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Commercial applications",
        lessons: [
          { id: 9, title: "Product photography with AI", duration: "28:00", isFree: false, completed: false },
          { id: 10, title: "Social content at scale", duration: "22:00", isFree: false, completed: false },
          { id: 11, title: "Licensing, rights, and ethics", duration: "14:00", isFree: false, completed: false },
        ],
      },
    ],
    whatYoullLearn: [
      "Generate photorealistic and artistic images from text prompts",
      "Master advanced Midjourney parameters for consistent results",
      "Create short AI videos with Runway Gen-3",
      "Produce royalty-free music with Suno",
      "Clone voices and create narrated content with ElevenLabs",
      "Apply AI media to real commercial projects ethically",
    ],
  },
  {
    slug: "ai-automation-workflows",
    title: "AI Automation with n8n and Make",
    description:
      "Build automated workflows that save hours every week. Connect your AI tools, apps, and APIs without writing a line of code.",
    longDescription:
      "Automation is the highest-leverage AI skill for non-developers. With n8n and Make (formerly Integromat), you can wire together 1,000+ apps, embed AI decision-making, and run workflows that used to take hours in seconds — all without code.",
    level: "Intermediate",
    duration: "4h 15m",
    rating: 4.8,
    students: 8920,
    isFree: true,
    category: "learning",
    tags: ["n8n", "Make", "Automation", "No-code", "Zapier"],
    instructor: "MG Creative Labs",
    updatedAt: "2025-05-10",
    iconKey: "workflow",
    modules: [
      {
        title: "Automation basics",
        lessons: [
          { id: 1, title: "Triggers, actions, and workflows", duration: "12:00", isFree: true, completed: false },
          { id: 2, title: "n8n vs Make vs Zapier: which to choose", duration: "10:30", isFree: true, completed: false },
          { id: 3, title: "Your first n8n workflow in 20 minutes", duration: "22:00", isFree: false, completed: false },
        ],
      },
      {
        title: "AI-powered automation",
        lessons: [
          { id: 4, title: "Connecting ChatGPT to your workflows", duration: "25:00", isFree: false, completed: false },
          { id: 5, title: "Email triage and auto-reply with AI", duration: "28:00", isFree: false, completed: false },
          { id: 6, title: "Content generation pipelines", duration: "30:00", isFree: false, completed: false },
          { id: 7, title: "Lead enrichment with AI", duration: "22:30", isFree: false, completed: false },
        ],
      },
      {
        title: "Real business workflows",
        lessons: [
          { id: 8, title: "Social media autopilot", duration: "26:00", isFree: false, completed: false },
          { id: 9, title: "CRM sync and deal automation", duration: "24:00", isFree: false, completed: false },
          { id: 10, title: "Error handling and monitoring", duration: "18:00", isFree: false, completed: false },
        ],
      },
    ],
    whatYoullLearn: [
      "Build multi-step workflows in n8n and Make without code",
      "Embed AI decision-making into any business process",
      "Create email triage, social posting, and CRM workflows",
      "Connect 1,000+ apps with webhooks and APIs",
      "Monitor, debug, and maintain production automations",
      "Productize your automation skills for clients or your own business",
    ],
  },
  {
    slug: "llm-basics-crash-course",
    title: "LLM Basics: A No-Code Crash Course",
    description:
      "A fast, jargon-free introduction to large language models for non-technical people. Understand AI in a weekend.",
    longDescription:
      "Not everyone needs to build an AI system — but everyone benefits from understanding how they work. This crash course distills the essential concepts of LLMs into plain English, using analogies and examples that stick, so you can participate confidently in AI conversations at work and in life.",
    level: "Beginner",
    duration: "2h 00m",
    rating: 4.9,
    students: 18700,
    isFree: true,
    category: "learning",
    tags: ["LLMs", "No-code", "Beginner", "AI basics"],
    instructor: "MG Creative Labs",
    updatedAt: "2025-04-15",
    iconKey: "brain",
    modules: [
      {
        title: "What is an AI and what is it not",
        lessons: [
          { id: 1, title: "AI, ML, and LLMs: cutting through the buzzwords", duration: "14:00", isFree: true, completed: false },
          { id: 2, title: "How ChatGPT actually generates text", duration: "16:00", isFree: true, completed: false },
          { id: 3, title: "What LLMs are good at — and where they fail", duration: "18:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Using AI at work",
        lessons: [
          { id: 4, title: "Practical uses in any job role", duration: "20:00", isFree: false, completed: false },
          { id: 5, title: "Evaluating AI output: fact-checking basics", duration: "15:00", isFree: false, completed: false },
          { id: 6, title: "Privacy and data: what to know before you share", duration: "12:00", isFree: false, completed: false },
        ],
      },
      {
        title: "The AI landscape in 2026",
        lessons: [
          { id: 7, title: "The major AI providers compared", duration: "18:00", isFree: false, completed: false },
          { id: 8, title: "Where AI is heading: what to watch", duration: "15:00", isFree: false, completed: false },
          { id: 9, title: "Your 30-day AI implementation plan", duration: "12:00", isFree: false, completed: false },
        ],
      },
    ],
    whatYoullLearn: [
      "Confidently explain how LLMs work to anyone",
      "Identify the right AI tool for any everyday task",
      "Spot hallucinations and evaluate AI-generated output",
      "Protect your privacy when using AI tools",
      "Understand the competitive landscape of major AI models",
      "Create a personal plan to integrate AI into your workflow",
    ],
  },
  {
    slug: "ai-for-business",
    title: "AI for Business: ROI-Driven Applications",
    description:
      "Apply AI to real business problems. Marketing, operations, customer support, and product — with measurable ROI.",
    longDescription:
      "AI adoption is no longer a competitive advantage — it's a competitive requirement. This course helps business owners, managers, and operators identify the highest-value AI opportunities in their specific context and implement them with minimal friction. No coding skills required.",
    level: "Intermediate",
    duration: "5h 00m",
    rating: 4.8,
    students: 7100,
    isFree: false,
    category: "learning",
    tags: ["Business", "ROI", "Operations", "Marketing", "Strategy"],
    instructor: "MG Creative Labs",
    updatedAt: "2025-06-10",
    iconKey: "building",
    modules: [
      {
        title: "The business case for AI",
        lessons: [
          { id: 1, title: "Where AI creates the most leverage in business", duration: "18:00", isFree: true, completed: false },
          { id: 2, title: "How to measure AI ROI", duration: "15:00", isFree: true, completed: false },
          { id: 3, title: "Building an AI adoption roadmap", duration: "22:00", isFree: false, completed: false },
        ],
      },
      {
        title: "AI across business functions",
        lessons: [
          { id: 4, title: "Marketing: content, targeting, and personalization", duration: "28:00", isFree: false, completed: false },
          { id: 5, title: "Customer support: chatbots and ticket triage", duration: "24:00", isFree: false, completed: false },
          { id: 6, title: "Operations: process automation and reporting", duration: "26:00", isFree: false, completed: false },
          { id: 7, title: "Product: feature generation and user research", duration: "22:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Implementation",
        lessons: [
          { id: 8, title: "Choosing vendors and building vs buying", duration: "20:00", isFree: false, completed: false },
          { id: 9, title: "Change management and team training", duration: "18:00", isFree: false, completed: false },
          { id: 10, title: "Legal, compliance, and ethical considerations", duration: "17:00", isFree: false, completed: false },
          { id: 11, title: "Tracking outcomes and iterating", duration: "15:00", isFree: false, completed: false },
        ],
      },
    ],
    whatYoullLearn: [
      "Identify the highest-ROI AI opportunities in your business",
      "Implement AI in marketing, support, and operations without coding",
      "Build an AI adoption roadmap for your team or company",
      "Measure and communicate the impact of AI initiatives",
      "Navigate legal and compliance considerations for AI use",
      "Lead a culture of AI experimentation in your organization",
    ],
  },
];

// ─────────────────────────────────────────
// CODING ACADEMY  (category: "coding")
// ─────────────────────────────────────────

const CODING_COURSES: Course[] = [
  {
    slug: "html-and-css",
    title: "HTML & CSS for Builders",
    description:
      "Learn to structure and style web pages from scratch. The foundation every developer (and AI builder) needs.",
    longDescription:
      "Before you can build with AI, you need to understand what it's building. This course takes you from zero to confident with HTML and CSS — the two languages that make up every web page you've ever seen. Practical, visual, and project-based from day one.",
    level: "Beginner",
    duration: "3h 30m",
    rating: 4.8,
    students: 14200,
    isFree: true,
    category: "coding",
    tags: ["HTML", "CSS", "Web", "Responsive design"],
    instructor: "MG Creative Labs",
    updatedAt: "2025-04-01",
    iconKey: "code",
    modules: [
      {
        title: "HTML essentials",
        lessons: [
          { id: 1, title: "How browsers read HTML", duration: "12:00", isFree: true, completed: false },
          { id: 2, title: "Tags, elements, and attributes", duration: "18:00", isFree: true, completed: false },
          { id: 3, title: "Semantic HTML and accessibility", duration: "20:00", isFree: false, completed: false },
          { id: 4, title: "Forms and inputs", duration: "16:00", isFree: false, completed: false },
        ],
      },
      {
        title: "CSS styling",
        lessons: [
          { id: 5, title: "Selectors, specificity, and cascade", duration: "22:00", isFree: false, completed: false },
          { id: 6, title: "Box model and layout", duration: "24:00", isFree: false, completed: false },
          { id: 7, title: "Flexbox in depth", duration: "28:00", isFree: false, completed: false },
          { id: 8, title: "CSS Grid for real layouts", duration: "26:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Responsive and modern CSS",
        lessons: [
          { id: 9, title: "Mobile-first responsive design", duration: "22:00", isFree: false, completed: false },
          { id: 10, title: "CSS variables and custom properties", duration: "16:00", isFree: false, completed: false },
          { id: 11, title: "Animations and transitions", duration: "20:00", isFree: false, completed: false },
          { id: 12, title: "Project: build a landing page from scratch", duration: "45:00", isFree: false, completed: false },
        ],
      },
    ],
    whatYoullLearn: [
      "Write clean, semantic HTML that browsers and screen readers understand",
      "Style any web element using CSS selectors and properties",
      "Build responsive layouts with Flexbox and Grid",
      "Create smooth transitions and animations",
      "Debug CSS layout issues confidently",
      "Build a complete landing page from an empty file",
    ],
  },
  {
    slug: "javascript-essentials",
    title: "JavaScript Essentials",
    description:
      "The language of the web. Learn JavaScript through projects and gain the skills to work with any modern framework.",
    longDescription:
      "JavaScript is the only language that runs natively in every browser and on the server with Node.js. This course builds real fluency — not just syntax memorization — through exercises you'll recognize from real codebases.",
    level: "Beginner",
    duration: "5h 45m",
    rating: 4.9,
    students: 11800,
    isFree: true,
    category: "coding",
    tags: ["JavaScript", "ES6+", "DOM", "Async"],
    instructor: "MG Creative Labs",
    updatedAt: "2025-04-15",
    iconKey: "terminal",
    modules: [
      {
        title: "Core JavaScript",
        lessons: [
          { id: 1, title: "Variables, types, and operators", duration: "20:00", isFree: true, completed: false },
          { id: 2, title: "Functions and scope", duration: "24:00", isFree: true, completed: false },
          { id: 3, title: "Arrays and objects", duration: "28:00", isFree: false, completed: false },
          { id: 4, title: "Control flow and error handling", duration: "22:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Modern JavaScript (ES6+)",
        lessons: [
          { id: 5, title: "Arrow functions and destructuring", duration: "20:00", isFree: false, completed: false },
          { id: 6, title: "Modules: import and export", duration: "18:00", isFree: false, completed: false },
          { id: 7, title: "Promises and async/await", duration: "30:00", isFree: false, completed: false },
          { id: 8, title: "The fetch API and HTTP basics", duration: "24:00", isFree: false, completed: false },
        ],
      },
      {
        title: "DOM and real projects",
        lessons: [
          { id: 9, title: "Querying and manipulating the DOM", duration: "26:00", isFree: false, completed: false },
          { id: 10, title: "Events and user interaction", duration: "22:00", isFree: false, completed: false },
          { id: 11, title: "Local storage and state", duration: "18:00", isFree: false, completed: false },
          { id: 12, title: "Project: interactive to-do app", duration: "50:00", isFree: false, completed: false },
        ],
      },
    ],
    whatYoullLearn: [
      "Write modern ES6+ JavaScript with confidence",
      "Work with arrays, objects, and functions fluently",
      "Handle asynchronous code with async/await",
      "Fetch data from APIs and render it on the page",
      "Manipulate the DOM to build interactive interfaces",
      "Debug JavaScript errors using browser developer tools",
    ],
  },
  {
    slug: "python-for-ai",
    title: "Python for AI Workflows",
    description:
      "Learn Python as the AI-native language. Scripts, APIs, data handling, and building AI-powered tools in Python.",
    longDescription:
      "Python is the default language of AI. This course teaches Python in the context where it matters most today — calling LLM APIs, processing data, automating workflows, and building AI-powered scripts and apps. Zero Python experience assumed.",
    level: "Beginner",
    duration: "6h 00m",
    rating: 4.9,
    students: 16500,
    isFree: true,
    category: "coding",
    tags: ["Python", "OpenAI API", "Scripting", "Data"],
    instructor: "MG Creative Labs",
    updatedAt: "2025-05-01",
    iconKey: "cpu",
    modules: [
      {
        title: "Python basics",
        lessons: [
          { id: 1, title: "Python vs JavaScript: what to expect", duration: "10:00", isFree: true, completed: false },
          { id: 2, title: "Variables, strings, and numbers", duration: "18:00", isFree: true, completed: false },
          { id: 3, title: "Lists, dicts, and loops", duration: "26:00", isFree: false, completed: false },
          { id: 4, title: "Functions and modules", duration: "22:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Python for real work",
        lessons: [
          { id: 5, title: "File I/O: reading and writing files", duration: "18:00", isFree: false, completed: false },
          { id: 6, title: "Working with JSON and CSV data", duration: "20:00", isFree: false, completed: false },
          { id: 7, title: "Calling REST APIs with requests", duration: "24:00", isFree: false, completed: false },
          { id: 8, title: "Error handling and logging", duration: "18:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Python + AI",
        lessons: [
          { id: 9, title: "Calling the OpenAI API from Python", duration: "28:00", isFree: false, completed: false },
          { id: 10, title: "Building a CLI AI assistant", duration: "35:00", isFree: false, completed: false },
          { id: 11, title: "Processing large documents with LLMs", duration: "30:00", isFree: false, completed: false },
          { id: 12, title: "Project: automated AI research tool", duration: "50:00", isFree: false, completed: false },
        ],
      },
    ],
    whatYoullLearn: [
      "Write clean, readable Python for automation and scripting",
      "Work with files, JSON, and CSV data",
      "Call any REST API from Python",
      "Integrate OpenAI, Anthropic, and Groq APIs into Python apps",
      "Build a command-line AI assistant from scratch",
      "Process and summarize large documents with LLMs",
    ],
  },
  {
    slug: "react-development",
    title: "React: Build Modern UIs",
    description:
      "The most in-demand frontend framework. Build reactive, component-based interfaces used by millions of apps.",
    longDescription:
      "React powers Facebook, Airbnb, Netflix, and thousands of startups. More importantly, it's the foundation of Next.js — which means React fluency lets you build full-stack AI apps. This course takes you from your first component to a production-grade application.",
    level: "Intermediate",
    duration: "7h 00m",
    rating: 4.9,
    students: 9800,
    isFree: false,
    category: "coding",
    tags: ["React", "Hooks", "State", "Next.js"],
    instructor: "MG Creative Labs",
    updatedAt: "2025-05-20",
    iconKey: "layers",
    modules: [
      {
        title: "React fundamentals",
        lessons: [
          { id: 1, title: "Why React? The component model", duration: "15:00", isFree: true, completed: false },
          { id: 2, title: "JSX and rendering", duration: "20:00", isFree: true, completed: false },
          { id: 3, title: "Props and component composition", duration: "24:00", isFree: false, completed: false },
          { id: 4, title: "useState: managing component state", duration: "28:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Hooks and data",
        lessons: [
          { id: 5, title: "useEffect: side effects and data fetching", duration: "30:00", isFree: false, completed: false },
          { id: 6, title: "useContext and global state", duration: "24:00", isFree: false, completed: false },
          { id: 7, title: "Custom hooks", duration: "26:00", isFree: false, completed: false },
          { id: 8, title: "Forms and controlled inputs", duration: "22:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Real apps",
        lessons: [
          { id: 9, title: "Routing with React Router", duration: "22:00", isFree: false, completed: false },
          { id: 10, title: "API integration and loading states", duration: "28:00", isFree: false, completed: false },
          { id: 11, title: "Performance optimization", duration: "20:00", isFree: false, completed: false },
          { id: 12, title: "Project: full-featured React app", duration: "60:00", isFree: false, completed: false },
        ],
      },
    ],
    whatYoullLearn: [
      "Build component-based UIs that scale",
      "Manage state and side effects with hooks",
      "Fetch and display data from any API",
      "Create reusable custom hooks",
      "Optimize React performance for production",
      "Build a full-featured, multi-page React application",
    ],
  },
  {
    slug: "working-with-apis",
    title: "APIs and Integrations",
    description:
      "Understand how APIs work, how to consume them, and how to connect any two services — with or without code.",
    longDescription:
      "APIs are the glue of the modern web. Every AI tool, every SaaS product, every automation runs on APIs. This course gives you a complete mental model of how APIs work and the practical skills to use them in both code and no-code tools.",
    level: "Beginner",
    duration: "3h 45m",
    rating: 4.8,
    students: 8300,
    isFree: true,
    category: "coding",
    tags: ["REST", "HTTP", "JSON", "Webhooks", "Postman"],
    instructor: "MG Creative Labs",
    updatedAt: "2025-04-20",
    iconKey: "git-branch",
    modules: [
      {
        title: "How APIs work",
        lessons: [
          { id: 1, title: "What is an API and why it matters", duration: "12:00", isFree: true, completed: false },
          { id: 2, title: "HTTP methods: GET, POST, PUT, DELETE", duration: "18:00", isFree: true, completed: false },
          { id: 3, title: "Authentication: API keys, OAuth, JWTs", duration: "22:00", isFree: false, completed: false },
          { id: 4, title: "Reading API documentation", duration: "16:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Consuming APIs",
        lessons: [
          { id: 5, title: "Using Postman to test APIs", duration: "20:00", isFree: false, completed: false },
          { id: 6, title: "Calling APIs from JavaScript", duration: "24:00", isFree: false, completed: false },
          { id: 7, title: "Handling errors and rate limits", duration: "18:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Webhooks and events",
        lessons: [
          { id: 8, title: "Webhooks vs polling: when to use each", duration: "16:00", isFree: false, completed: false },
          { id: 9, title: "Setting up webhook receivers", duration: "22:00", isFree: false, completed: false },
          { id: 10, title: "Project: build a Slack bot with a public API", duration: "35:00", isFree: false, completed: false },
        ],
      },
    ],
    whatYoullLearn: [
      "Understand REST API design and HTTP fundamentals",
      "Authenticate with API keys, OAuth, and JWTs",
      "Read and navigate any API documentation",
      "Use Postman to explore and test APIs",
      "Call APIs from JavaScript and Python",
      "Set up and handle webhooks for real-time events",
    ],
  },
  {
    slug: "databases-and-sql",
    title: "Databases and SQL",
    description:
      "Store, query, and manage data. SQL is the most durable skill in software — and it powers every AI app at scale.",
    longDescription:
      "Data is the fuel of AI. This course teaches relational databases and SQL from first principles, then applies them to the tools developers actually use today: PostgreSQL, Supabase, and AI-assisted query generation. By the end, you'll design schemas and write queries with confidence.",
    level: "Beginner",
    duration: "4h 30m",
    rating: 4.8,
    students: 7600,
    isFree: true,
    category: "coding",
    tags: ["SQL", "PostgreSQL", "Supabase", "Databases"],
    instructor: "MG Creative Labs",
    updatedAt: "2025-05-05",
    iconKey: "database",
    modules: [
      {
        title: "Database fundamentals",
        lessons: [
          { id: 1, title: "Tables, rows, columns, and keys", duration: "15:00", isFree: true, completed: false },
          { id: 2, title: "Relational design and normalization", duration: "22:00", isFree: true, completed: false },
          { id: 3, title: "Primary keys, foreign keys, and indexes", duration: "20:00", isFree: false, completed: false },
        ],
      },
      {
        title: "SQL querying",
        lessons: [
          { id: 4, title: "SELECT, WHERE, and ORDER BY", duration: "20:00", isFree: false, completed: false },
          { id: 5, title: "JOINs in depth", duration: "28:00", isFree: false, completed: false },
          { id: 6, title: "Aggregations: GROUP BY, HAVING, COUNT", duration: "22:00", isFree: false, completed: false },
          { id: 7, title: "Subqueries and CTEs", duration: "24:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Modern databases",
        lessons: [
          { id: 8, title: "PostgreSQL and Supabase setup", duration: "18:00", isFree: false, completed: false },
          { id: 9, title: "Row-level security in Supabase", duration: "20:00", isFree: false, completed: false },
          { id: 10, title: "AI-assisted query generation", duration: "22:00", isFree: false, completed: false },
          { id: 11, title: "Project: design a real app database schema", duration: "40:00", isFree: false, completed: false },
        ],
      },
    ],
    whatYoullLearn: [
      "Design normalized relational database schemas",
      "Write SQL queries from simple SELECT to complex JOINs",
      "Use aggregations, subqueries, and CTEs",
      "Set up and use PostgreSQL with Supabase",
      "Implement row-level security for multi-tenant apps",
      "Generate and optimize queries with AI assistance",
    ],
  },
  {
    slug: "git-and-github",
    title: "Git and GitHub",
    description:
      "Version control is non-negotiable. Learn Git from first commit to pull request — the workflow every developer lives by.",
    longDescription:
      "Git is the version control system used by virtually every software team in the world. This course teaches you the git commands and workflows you'll actually use daily, without drowning you in theory you'll never need.",
    level: "Beginner",
    duration: "2h 30m",
    rating: 4.9,
    students: 19100,
    isFree: true,
    category: "coding",
    tags: ["Git", "GitHub", "Version control", "Collaboration"],
    instructor: "MG Creative Labs",
    updatedAt: "2025-03-15",
    iconKey: "git-branch",
    modules: [
      {
        title: "Git fundamentals",
        lessons: [
          { id: 1, title: "Why version control matters", duration: "8:00", isFree: true, completed: false },
          { id: 2, title: "init, add, commit: your first workflow", duration: "15:00", isFree: true, completed: false },
          { id: 3, title: "Branching and merging", duration: "20:00", isFree: false, completed: false },
          { id: 4, title: "Undoing changes: reset, revert, stash", duration: "18:00", isFree: false, completed: false },
        ],
      },
      {
        title: "GitHub collaboration",
        lessons: [
          { id: 5, title: "Remote repositories and push/pull", duration: "16:00", isFree: false, completed: false },
          { id: 6, title: "Pull requests and code review", duration: "22:00", isFree: false, completed: false },
          { id: 7, title: "Resolving merge conflicts", duration: "18:00", isFree: false, completed: false },
          { id: 8, title: "GitHub Actions: CI/CD basics", duration: "24:00", isFree: false, completed: false },
        ],
      },
    ],
    whatYoullLearn: [
      "Set up and use Git for any project",
      "Branch, merge, and resolve conflicts with confidence",
      "Collaborate on GitHub with pull requests and code review",
      "Roll back mistakes without losing work",
      "Set up basic CI/CD with GitHub Actions",
      "Follow the Git workflows used by professional teams",
    ],
  },
  {
    slug: "full-stack-with-ai",
    title: "Full-Stack Development with AI",
    description:
      "Ship production apps end-to-end. Next.js, TypeScript, Supabase, and AI tooling — the modern full-stack.",
    longDescription:
      "This capstone course pulls everything together. You'll build and ship a real, full-stack application using Next.js, TypeScript, and Supabase — with AI assistance throughout the development process. By the end you'll have a live app and the mental model to build anything.",
    level: "Advanced",
    duration: "10h 00m",
    rating: 4.9,
    students: 4800,
    isFree: false,
    category: "coding",
    tags: ["Next.js", "TypeScript", "Supabase", "Full-stack"],
    instructor: "MG Creative Labs",
    updatedAt: "2025-06-01",
    iconKey: "cpu",
    modules: [
      {
        title: "Architecture and setup",
        lessons: [
          { id: 1, title: "The full-stack mental model", duration: "18:00", isFree: true, completed: false },
          { id: 2, title: "Next.js App Router deep dive", duration: "28:00", isFree: true, completed: false },
          { id: 3, title: "TypeScript essentials for Next.js", duration: "24:00", isFree: false, completed: false },
          { id: 4, title: "Supabase setup and schema design", duration: "26:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Core features",
        lessons: [
          { id: 5, title: "Auth with Supabase (email + Google OAuth)", duration: "30:00", isFree: false, completed: false },
          { id: 6, title: "Server components vs client components", duration: "28:00", isFree: false, completed: false },
          { id: 7, title: "API routes and server actions", duration: "32:00", isFree: false, completed: false },
          { id: 8, title: "Row-level security and protected routes", duration: "24:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Ship it",
        lessons: [
          { id: 9, title: "Adding AI features with Vercel AI SDK", duration: "35:00", isFree: false, completed: false },
          { id: 10, title: "Deployment to Vercel", duration: "20:00", isFree: false, completed: false },
          { id: 11, title: "Performance, SEO, and monitoring", duration: "26:00", isFree: false, completed: false },
          { id: 12, title: "Capstone: build and ship a real SaaS", duration: "90:00", isFree: false, completed: false },
        ],
      },
    ],
    whatYoullLearn: [
      "Build production Next.js apps with TypeScript from scratch",
      "Design and implement a Supabase backend with RLS",
      "Implement authentication with email and Google OAuth",
      "Add AI features using the Vercel AI SDK",
      "Deploy, monitor, and iterate on a live production app",
      "Ship a complete SaaS application you can show and grow",
    ],
  },
];

// ─────────────────────────────────────────
// DESIGN & AUTOMATION  (category: "design")
// ─────────────────────────────────────────

const DESIGN_COURSES: Course[] = [
  {
    slug: "ui-ux-design-fundamentals",
    title: "UI/UX Design Fundamentals",
    description:
      "Learn to design interfaces that people actually want to use. The principles behind great UX, applied from day one.",
    longDescription:
      "Great design is not about aesthetics — it is about making things work for people. This course teaches the foundational principles of UI and UX design: hierarchy, contrast, spacing, information architecture, and user research. No design experience required.",
    level: "Beginner",
    duration: "4h 00m",
    rating: 4.8,
    students: 11200,
    isFree: true,
    category: "design",
    tags: ["UI", "UX", "Design principles", "User research"],
    instructor: "MG Creative Labs",
    updatedAt: "2025-04-10",
    iconKey: "palette",
    modules: [
      {
        title: "Design fundamentals",
        lessons: [
          { id: 1, title: "Visual hierarchy and contrast", duration: "18:00", isFree: true, completed: false },
          { id: 2, title: "Typography in UI design", duration: "20:00", isFree: true, completed: false },
          { id: 3, title: "Color theory and accessible color", duration: "22:00", isFree: false, completed: false },
          { id: 4, title: "Spacing, grids, and layout", duration: "24:00", isFree: false, completed: false },
        ],
      },
      {
        title: "UX principles",
        lessons: [
          { id: 5, title: "Information architecture", duration: "18:00", isFree: false, completed: false },
          { id: 6, title: "User flows and journey maps", duration: "22:00", isFree: false, completed: false },
          { id: 7, title: "Wireframing: from sketch to structure", duration: "26:00", isFree: false, completed: false },
          { id: 8, title: "Usability testing basics", duration: "20:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Applied design",
        lessons: [
          { id: 9, title: "Designing for mobile", duration: "22:00", isFree: false, completed: false },
          { id: 10, title: "Design critique: review real products", duration: "18:00", isFree: false, completed: false },
          { id: 11, title: "Project: redesign a broken UI", duration: "40:00", isFree: false, completed: false },
        ],
      },
    ],
    whatYoullLearn: [
      "Apply visual hierarchy, contrast, and spacing to any design",
      "Choose and pair typefaces for UI contexts",
      "Build accessible color palettes",
      "Create wireframes and user flows",
      "Conduct basic usability tests",
      "Critique and improve real product interfaces",
    ],
  },
  {
    slug: "figma-mastery",
    title: "Figma Mastery",
    description:
      "The design tool used by every top team. Go from zero to professional-grade Figma skills in structured lessons.",
    longDescription:
      "Figma has become the default design tool for product and web design. This course builds real proficiency — from basic shapes to component libraries and interactive prototypes — so you can contribute to any design workflow.",
    level: "Beginner",
    duration: "5h 30m",
    rating: 4.9,
    students: 14800,
    isFree: true,
    category: "design",
    tags: ["Figma", "Prototyping", "Components", "Design systems"],
    instructor: "MG Creative Labs",
    updatedAt: "2025-05-01",
    iconKey: "pen-tool",
    modules: [
      {
        title: "Figma foundations",
        lessons: [
          { id: 1, title: "Figma interface and key concepts", duration: "15:00", isFree: true, completed: false },
          { id: 2, title: "Frames, shapes, and text", duration: "20:00", isFree: true, completed: false },
          { id: 3, title: "Auto layout: the game-changer", duration: "28:00", isFree: false, completed: false },
          { id: 4, title: "Styles: colors and typography", duration: "20:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Components and libraries",
        lessons: [
          { id: 5, title: "Creating reusable components", duration: "26:00", isFree: false, completed: false },
          { id: 6, title: "Variants and component properties", duration: "30:00", isFree: false, completed: false },
          { id: 7, title: "Building a component library", duration: "35:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Prototyping and handoff",
        lessons: [
          { id: 8, title: "Interactive prototypes", duration: "28:00", isFree: false, completed: false },
          { id: 9, title: "Figma AI features", duration: "20:00", isFree: false, completed: false },
          { id: 10, title: "Developer handoff and inspection", duration: "18:00", isFree: false, completed: false },
          { id: 11, title: "Project: design a complete app UI", duration: "55:00", isFree: false, completed: false },
        ],
      },
    ],
    whatYoullLearn: [
      "Use Figma's interface and tools with confidence",
      "Master Auto Layout for responsive designs",
      "Build reusable components with variants",
      "Create interactive prototypes for user testing",
      "Use Figma AI features to accelerate your workflow",
      "Hand off designs to developers with proper annotations",
    ],
  },
  {
    slug: "design-systems-101",
    title: "Design Systems 101",
    description:
      "Build the shared language that keeps products consistent. Learn how top companies maintain design quality at scale.",
    longDescription:
      "A design system is the single source of truth for any team building a digital product. This course teaches you to build one from scratch — tokens, components, documentation, and governance — using the approaches used by Vercel, Linear, and Notion.",
    level: "Intermediate",
    duration: "4h 30m",
    rating: 4.8,
    students: 5900,
    isFree: false,
    category: "design",
    tags: ["Design systems", "Tokens", "Storybook", "Components"],
    instructor: "MG Creative Labs",
    updatedAt: "2025-05-15",
    iconKey: "layers",
    modules: [
      {
        title: "Systems thinking",
        lessons: [
          { id: 1, title: "What makes a great design system", duration: "16:00", isFree: true, completed: false },
          { id: 2, title: "Design tokens: the foundation", duration: "22:00", isFree: true, completed: false },
          { id: 3, title: "Naming conventions that scale", duration: "16:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Building the system",
        lessons: [
          { id: 4, title: "Core component library", duration: "35:00", isFree: false, completed: false },
          { id: 5, title: "Motion and animation tokens", duration: "20:00", isFree: false, completed: false },
          { id: 6, title: "Dark mode and theming", duration: "26:00", isFree: false, completed: false },
          { id: 7, title: "Documentation that gets used", duration: "22:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Governance and adoption",
        lessons: [
          { id: 8, title: "Version control for design systems", duration: "18:00", isFree: false, completed: false },
          { id: 9, title: "Getting team buy-in", duration: "14:00", isFree: false, completed: false },
          { id: 10, title: "Project: build a mini design system", duration: "50:00", isFree: false, completed: false },
        ],
      },
    ],
    whatYoullLearn: [
      "Define design tokens for color, typography, and spacing",
      "Build a scalable component library in Figma",
      "Implement dark mode and theming from the ground up",
      "Write documentation that teams actually read",
      "Manage design system versions and breaking changes",
      "Drive adoption across a product organization",
    ],
  },
  {
    slug: "branding-basics",
    title: "Branding Basics",
    description:
      "Build a brand that people recognize and trust. Logo, palette, voice, and visual identity — covered from first principles.",
    longDescription:
      "A brand is not just a logo — it is the complete experience someone has with you and your product. This course teaches the core disciplines of brand identity, applied to real projects using modern AI-assisted design tools.",
    level: "Beginner",
    duration: "3h 15m",
    rating: 4.8,
    students: 9200,
    isFree: true,
    category: "design",
    tags: ["Branding", "Logo design", "Brand identity", "AI design"],
    instructor: "MG Creative Labs",
    updatedAt: "2025-04-25",
    iconKey: "sparkles",
    modules: [
      {
        title: "Brand strategy",
        lessons: [
          { id: 1, title: "What is a brand and why it matters", duration: "12:00", isFree: true, completed: false },
          { id: 2, title: "Positioning and differentiation", duration: "18:00", isFree: true, completed: false },
          { id: 3, title: "Brand voice and tone", duration: "15:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Visual identity",
        lessons: [
          { id: 4, title: "Logo design principles", duration: "22:00", isFree: false, completed: false },
          { id: 5, title: "Creating logos with AI tools", duration: "24:00", isFree: false, completed: false },
          { id: 6, title: "Choosing and pairing brand typefaces", duration: "18:00", isFree: false, completed: false },
          { id: 7, title: "Building a brand color system", duration: "20:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Brand in practice",
        lessons: [
          { id: 8, title: "Brand guidelines: what to include", duration: "16:00", isFree: false, completed: false },
          { id: 9, title: "Applying your brand across channels", duration: "18:00", isFree: false, completed: false },
          { id: 10, title: "Project: full brand identity from scratch", duration: "45:00", isFree: false, completed: false },
        ],
      },
    ],
    whatYoullLearn: [
      "Define a brand positioning that stands out",
      "Design a recognizable logo using AI and design tools",
      "Build a coherent color palette and type system",
      "Write brand voice guidelines for any context",
      "Create a complete brand identity document",
      "Apply your brand consistently across digital and print",
    ],
  },
  {
    slug: "no-code-automation",
    title: "No-Code Automation",
    description:
      "Build powerful automations without writing a single line of code using Zapier, Make, and Airtable.",
    longDescription:
      "No-code tools have democratized automation. In this course you will learn to build real, production-grade workflows using Zapier, Make, and Airtable — integrating AI where it adds the most leverage — without any coding background required.",
    level: "Beginner",
    duration: "3h 45m",
    rating: 4.8,
    students: 13400,
    isFree: true,
    category: "design",
    tags: ["No-code", "Zapier", "Make", "Airtable"],
    instructor: "MG Creative Labs",
    updatedAt: "2025-04-30",
    iconKey: "workflow",
    modules: [
      {
        title: "No-code foundations",
        lessons: [
          { id: 1, title: "The no-code ecosystem in 2026", duration: "12:00", isFree: true, completed: false },
          { id: 2, title: "Zapier vs Make vs n8n: choosing your tool", duration: "14:00", isFree: true, completed: false },
          { id: 3, title: "Your first Zapier automation in 15 minutes", duration: "18:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Building real automations",
        lessons: [
          { id: 4, title: "Airtable: your no-code database", duration: "24:00", isFree: false, completed: false },
          { id: 5, title: "Form-to-database automations", duration: "20:00", isFree: false, completed: false },
          { id: 6, title: "Automated email sequences", duration: "22:00", isFree: false, completed: false },
          { id: 7, title: "Adding AI to your no-code workflows", duration: "26:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Advanced no-code",
        lessons: [
          { id: 8, title: "Conditional logic and branching", duration: "20:00", isFree: false, completed: false },
          { id: 9, title: "Error handling in no-code", duration: "16:00", isFree: false, completed: false },
          { id: 10, title: "Project: end-to-end lead automation", duration: "35:00", isFree: false, completed: false },
        ],
      },
    ],
    whatYoullLearn: [
      "Build multi-step Zaps and Make scenarios",
      "Use Airtable as a lightweight no-code database",
      "Create automated email and notification workflows",
      "Add AI steps to no-code pipelines with ChatGPT",
      "Handle errors and edge cases in automations",
      "Build a complete lead capture and nurture system",
    ],
  },
  {
    slug: "workflow-automation",
    title: "Workflow Automation",
    description:
      "Eliminate repetitive tasks. Map, automate, and optimize business workflows to reclaim hours every week.",
    longDescription:
      "Workflow automation is the skill that compounds fastest. Every hour you invest learning it pays back for years. This course teaches a systematic approach to identifying automation opportunities, mapping workflows, and implementing solutions using the best tools available.",
    level: "Intermediate",
    duration: "4h 45m",
    rating: 4.8,
    students: 7100,
    isFree: false,
    category: "design",
    tags: ["Automation", "Process mapping", "n8n", "Productivity"],
    instructor: "MG Creative Labs",
    updatedAt: "2025-05-10",
    iconKey: "zap",
    modules: [
      {
        title: "Process thinking",
        lessons: [
          { id: 1, title: "How to spot automation opportunities", duration: "16:00", isFree: true, completed: false },
          { id: 2, title: "Process mapping and flowcharts", duration: "20:00", isFree: true, completed: false },
          { id: 3, title: "Prioritizing by ROI and effort", duration: "14:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Automation in practice",
        lessons: [
          { id: 4, title: "n8n deep dive: advanced nodes", duration: "30:00", isFree: false, completed: false },
          { id: 5, title: "Data transformation and formatting", duration: "22:00", isFree: false, completed: false },
          { id: 6, title: "Scheduling and recurring workflows", duration: "18:00", isFree: false, completed: false },
          { id: 7, title: "Testing and monitoring automations", duration: "20:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Business workflows",
        lessons: [
          { id: 8, title: "HR and onboarding automation", duration: "24:00", isFree: false, completed: false },
          { id: 9, title: "Finance and reporting automation", duration: "22:00", isFree: false, completed: false },
          { id: 10, title: "Customer lifecycle automation", duration: "26:00", isFree: false, completed: false },
          { id: 11, title: "Project: automate a complete business process", duration: "45:00", isFree: false, completed: false },
        ],
      },
    ],
    whatYoullLearn: [
      "Identify automation opportunities using an ROI framework",
      "Map business processes before automating them",
      "Build advanced multi-branch workflows in n8n",
      "Transform and clean data between systems",
      "Implement error handling and monitoring",
      "Automate HR, finance, and customer lifecycle processes",
    ],
  },
  {
    slug: "ai-powered-productivity",
    title: "AI-Powered Productivity",
    description:
      "Use AI to think faster, write better, and get more done. Practical tools and habits for knowledge workers.",
    longDescription:
      "The gap between people using AI casually and people using it systematically is enormous — and growing. This course teaches the workflows, tools, and habits that let knowledge workers use AI as a genuine cognitive partner, not just a search engine.",
    level: "Beginner",
    duration: "2h 30m",
    rating: 4.9,
    students: 22100,
    isFree: true,
    category: "design",
    tags: ["Productivity", "ChatGPT", "Notion AI", "Writing"],
    instructor: "MG Creative Labs",
    updatedAt: "2025-06-05",
    iconKey: "brain",
    modules: [
      {
        title: "AI as a thinking partner",
        lessons: [
          { id: 1, title: "Shifting from search to conversation", duration: "12:00", isFree: true, completed: false },
          { id: 2, title: "Second brain: AI-powered note-taking", duration: "18:00", isFree: true, completed: false },
          { id: 3, title: "Brainstorming and idea generation with AI", duration: "16:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Writing and communication",
        lessons: [
          { id: 4, title: "AI-assisted writing without losing your voice", duration: "20:00", isFree: false, completed: false },
          { id: 5, title: "Emails, reports, and proposals in minutes", duration: "18:00", isFree: false, completed: false },
          { id: 6, title: "Meeting prep, notes, and follow-ups", duration: "16:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Your AI productivity system",
        lessons: [
          { id: 7, title: "Building a personal prompt system", duration: "20:00", isFree: false, completed: false },
          { id: 8, title: "AI tool stack for different roles", duration: "18:00", isFree: false, completed: false },
          { id: 9, title: "Habits that make AI stick", duration: "12:00", isFree: false, completed: false },
        ],
      },
    ],
    whatYoullLearn: [
      "Use AI as a thinking partner for complex problems",
      "Build an AI-enhanced note-taking and research system",
      "Write drafts, emails, and reports 5x faster with AI",
      "Prepare for meetings and summarize notes automatically",
      "Build a personal prompt library for your role",
      "Develop habits that make AI productivity sustainable",
    ],
  },
  {
    slug: "business-process-automation",
    title: "Business Process Automation",
    description:
      "Systematically eliminate operational bottlenecks. A strategic and technical guide to automating business at scale.",
    longDescription:
      "This advanced course bridges the gap between business strategy and technical automation. You will learn to map and audit existing processes, identify systemic bottlenecks, design automation solutions, and implement them at scale — combining AI judgment with deterministic automation.",
    level: "Advanced",
    duration: "6h 00m",
    rating: 4.8,
    students: 4200,
    isFree: false,
    category: "design",
    tags: ["BPA", "Process automation", "AI strategy", "Enterprise"],
    instructor: "MG Creative Labs",
    updatedAt: "2025-06-01",
    iconKey: "building",
    modules: [
      {
        title: "Process audit",
        lessons: [
          { id: 1, title: "Mapping existing processes accurately", duration: "22:00", isFree: true, completed: false },
          { id: 2, title: "Identifying bottlenecks and waste", duration: "18:00", isFree: true, completed: false },
          { id: 3, title: "The automation opportunity matrix", duration: "16:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Automation design",
        lessons: [
          { id: 4, title: "Designing automation architecture", duration: "28:00", isFree: false, completed: false },
          { id: 5, title: "Combining AI and deterministic logic", duration: "24:00", isFree: false, completed: false },
          { id: 6, title: "Data pipelines and transformations", duration: "26:00", isFree: false, completed: false },
          { id: 7, title: "Human-in-the-loop decision points", duration: "20:00", isFree: false, completed: false },
        ],
      },
      {
        title: "Implementation and scale",
        lessons: [
          { id: 8, title: "Phased rollout and change management", duration: "22:00", isFree: false, completed: false },
          { id: 9, title: "Measuring automation impact", duration: "18:00", isFree: false, completed: false },
          { id: 10, title: "Scaling across the organization", duration: "24:00", isFree: false, completed: false },
          { id: 11, title: "Capstone: full process automation case study", duration: "60:00", isFree: false, completed: false },
        ],
      },
    ],
    whatYoullLearn: [
      "Audit and map business processes with precision",
      "Apply the automation opportunity matrix to any business",
      "Design automation architectures that combine AI and logic",
      "Build scalable data pipelines for business workflows",
      "Manage human oversight at critical decision points",
      "Measure and communicate ROI of automation initiatives",
    ],
  },
];

// ─────────────────────────────────────────
// Unified export
// ─────────────────────────────────────────

export const ALL_COURSES: Course[] = [
  ...LEARNING_COURSES,
  ...CODING_COURSES,
  ...DESIGN_COURSES,
];

export function getCourseBySlug(slug: string): Course | undefined {
  return ALL_COURSES.find((c) => c.slug === slug);
}

export function getCoursesByCategory(category: CourseCategory): Course[] {
  return ALL_COURSES.filter((c) => c.category === category);
}

/** Map from category to the listing page URL */
export const CATEGORY_HREF: Record<CourseCategory, string> = {
  learning: "/ai-learning-hub",
  coding: "/ai-coding-academy",
  design: "/ai-design-academy",
};

/** Human-readable label for each category */
export const CATEGORY_LABEL: Record<CourseCategory, string> = {
  learning: "AI Learning Hub",
  coding: "Coding Academy",
  design: "Design & Automation",
};
