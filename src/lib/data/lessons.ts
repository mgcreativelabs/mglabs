// ─────────────────────────────────────────────────────────────────────
// src/lib/data/lessons.ts
// AI Builder Foundation Path — 5 free lessons.
// Each lesson ends pointing toward the next.
// Lesson 5 deliberately ends at the "wall" → Launch Program CTA.
// ─────────────────────────────────────────────────────────────────────

export interface LessonSection {
  type: "text" | "highlight" | "exercise" | "code" | "list";
  heading?: string;
  body?: string;
  items?: string[];
  code?: string;
  label?: string;
}

export interface Lesson {
  slug: string;
  number: number;
  title: string;
  tagline: string;
  duration: string;       // e.g. "8 min read"
  difficulty: "Beginner" | "Intermediate";
  sections: LessonSection[];
  nextLesson: string | null; // slug of next lesson, null if last
  wall?: boolean;            // true on lesson 5 — triggers Launch Program CTA
}

export const lessons: Lesson[] = [
  // ─────────────────────────────────────────────────────
  // LESSON 1
  // ─────────────────────────────────────────────────────
  {
    slug: "what-ai-apps-are",
    number: 1,
    title: "What AI apps actually are",
    tagline: "Before you build anything, understand the simple model behind every AI product.",
    duration: "7 min read",
    difficulty: "Beginner",
    nextLesson: "how-ai-tools-work",
    sections: [
      {
        type: "text",
        heading: "The simple truth most people miss",
        body:
          "AI apps are not magic. They are software that does three things in sequence: take an input, send it to an AI model, and return an output. That's it. Every AI product you've ever used — ChatGPT, Midjourney, GitHub Copilot, Notion AI — follows this exact pattern. Once you see it, you can't unsee it.",
      },
      {
        type: "highlight",
        body: "Input → AI Model → Output. This is the foundation of every AI app ever built.",
      },
      {
        type: "text",
        heading: "Breaking down real examples",
        body:
          "Let's look at three AI products you've probably used and map them to the three-part model.",
      },
      {
        type: "list",
        heading: "ChatGPT",
        items: [
          "Input: Your typed message",
          "AI Model: GPT-4 (OpenAI's language model)",
          "Output: The response text",
        ],
      },
      {
        type: "list",
        heading: "Midjourney",
        items: [
          "Input: A text description of an image",
          "AI Model: A diffusion model trained on images",
          "Output: A generated image",
        ],
      },
      {
        type: "list",
        heading: "GitHub Copilot",
        items: [
          "Input: Your code + comments",
          "AI Model: A code-specialized language model",
          "Output: Code suggestions",
        ],
      },
      {
        type: "text",
        heading: "Where you come in",
        body:
          "Here's the key insight: the AI model already exists. Companies like OpenAI, Anthropic, Google, and Groq have built and trained them. Your job as a builder is not to create the intelligence — it's to wrap it in something useful. You write the logic, design the experience, and decide what inputs to send and how to present the outputs.",
      },
      {
        type: "text",
        heading: "What makes an AI app valuable",
        body:
          "The value of an AI product is almost never the AI model itself. It's the context, the constraints, and the design decisions around it. A customer support chatbot trained on your own company's knowledge base is worth far more than raw access to GPT-4. You're adding the value by shaping what the AI knows and how it behaves.",
      },
      {
        type: "exercise",
        heading: "Your first exercise",
        body:
          "Pick 3 AI apps you use regularly (or have heard of). For each one, write down: what the input is, what AI model it probably uses, and what the output is. This simple exercise will completely change how you look at AI products.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────
  // LESSON 2
  // ─────────────────────────────────────────────────────
  {
    slug: "how-ai-tools-work",
    number: 2,
    title: "How AI tools like Groq work",
    tagline: "Understanding the engine under the hood — without needing a PhD.",
    duration: "9 min read",
    difficulty: "Beginner",
    nextLesson: "building-chatbot-logic",
    sections: [
      {
        type: "text",
        heading: "What is a Large Language Model?",
        body:
          "A Large Language Model (LLM) is an AI system trained on enormous amounts of text. During training, it learns patterns in language — how words relate to each other, how sentences are structured, how questions are typically answered. When you send it a message, it predicts the most statistically likely next tokens (chunks of text) one at a time, which is how it generates a response.",
      },
      {
        type: "highlight",
        body: "An LLM doesn't understand meaning the way humans do — it predicts what text should come next based on everything it learned during training. But the results are good enough to be remarkably useful.",
      },
      {
        type: "text",
        heading: "What makes Groq different",
        body:
          "Most LLMs run on GPUs (Graphics Processing Units), which are powerful but designed for parallel tasks like gaming and image rendering. Groq built a custom chip called an LPU (Language Processing Unit) specifically designed to run language models. The result is inference that's dramatically faster than GPU-based alternatives. This is why MG Labs uses Groq — it makes the AI feel instant, which is critical for a good user experience.",
      },
      {
        type: "text",
        heading: "How API calls actually work",
        body:
          "When you build an AI app, you don't run the model on your own computer. You make an API call — a structured request to a server that runs the model. You send a JSON object with your messages and configuration, and you get back a JSON object with the AI's response. That's the entire technical interface. Everything else is just code that wraps these calls.",
      },
      {
        type: "code",
        heading: "What an API call looks like",
        code: `// This is what happens behind the scenes when you use MG AI
const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "What is an API?" }
    ]
  })
});

const data = await response.json();
const aiReply = data.choices[0].message.content;`,
      },
      {
        type: "text",
        heading: "The two types of messages",
        body:
          "Every API call includes two types of messages. System messages define the AI's behavior — its personality, rules, and context. User messages are the actual conversation turns. Together they form a 'prompt' — the complete input the AI uses to generate its response. Understanding this distinction is foundational to everything you'll build.",
      },
      {
        type: "list",
        heading: "System messages control behavior",
        items: [
          "Sets the AI's role and personality",
          "Defines rules and constraints",
          "Gives the AI context about what it's for",
          'Example: "You are a customer support bot for a coffee shop. Be friendly and concise."',
        ],
      },
      {
        type: "exercise",
        heading: "Try this in MG AI right now",
        body:
          "Open MG AI and have a normal conversation. Then imagine you're setting the system prompt to: 'You are a strict business advisor. Always respond with 3 bullet points. Never use casual language.' Notice how the same model would behave completely differently. That difference — between system prompt and user message — is where AI product design happens.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────
  // LESSON 3
  // ─────────────────────────────────────────────────────
  {
    slug: "building-chatbot-logic",
    number: 3,
    title: "Building your first chatbot logic",
    tagline: "System prompts are your product. This is where you actually design AI behavior.",
    duration: "10 min read",
    difficulty: "Beginner",
    nextLesson: "improving-responses-and-prompts",
    sections: [
      {
        type: "text",
        heading: "The system prompt is your product",
        body:
          "Most people think building an AI chatbot means writing thousands of lines of code. It doesn't. The most important work happens in the system prompt — a few paragraphs of plain English that define exactly how your AI behaves. Good system prompt engineering is the difference between a generic chatbot and a specific, valuable tool.",
      },
      {
        type: "highlight",
        body: "Your system prompt is where you design the product. The code just sends it to the model and displays the response.",
      },
      {
        type: "text",
        heading: "The anatomy of a good system prompt",
        body:
          "A strong system prompt has four parts: Role, Context, Rules, and Format. Each part does a specific job. Together they turn a general-purpose LLM into a specialized, reliable tool.",
      },
      {
        type: "list",
        heading: "Four parts of a system prompt",
        items: [
          "Role — Who is the AI? (e.g., 'You are a customer support specialist for a fitness app')",
          "Context — What does the AI need to know? (e.g., 'The app helps users track workouts and nutrition')",
          "Rules — What should and shouldn't it do? (e.g., 'Never recommend medical treatments. Always suggest consulting a doctor for injuries')",
          "Format — How should it respond? (e.g., 'Keep responses under 3 sentences unless asked for detail')",
        ],
      },
      {
        type: "code",
        heading: "A real example: coffee shop support bot",
        code: `ROLE:
You are a friendly customer support assistant for Brew & Co, a specialty coffee shop.

CONTEXT:
Brew & Co is open Monday–Saturday 7am–6pm. 
We serve espresso drinks, pour-overs, and seasonal specials.
Our most popular drink is the Honey Lavender Latte.
We do not offer Wi-Fi. We have outdoor seating.

RULES:
- Only answer questions related to Brew & Co
- If asked about competitors, politely redirect to our menu
- For complaints, apologize sincerely and offer to pass feedback to the manager
- Never make up information — say "I'm not sure, let me find out" if you don't know

FORMAT:
Keep responses conversational and warm. 2-3 sentences maximum unless explaining a menu item.`,
      },
      {
        type: "text",
        heading: "Why specificity wins",
        body:
          "The more specific your system prompt, the more valuable your chatbot becomes. A generic 'helpful assistant' system prompt produces generic results. A precisely tuned 'customer support bot for a fitness app that specializes in beginner-friendly workout plans' system prompt produces a tool that people will actually pay for.",
      },
      {
        type: "exercise",
        heading: "Build your first system prompt",
        body:
          "Choose a real business or use case you understand. It could be your own job, a side project, or a business you admire. Write a system prompt for a chatbot that would help that business. Use the four-part structure: Role, Context, Rules, Format. Then test it in MG AI by copy-pasting the prompt at the start of your conversation.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────
  // LESSON 4
  // ─────────────────────────────────────────────────────
  {
    slug: "improving-responses-and-prompts",
    number: 4,
    title: "Improving responses & prompts",
    tagline: "The difference between a mediocre AI tool and a great one is prompt quality.",
    duration: "11 min read",
    difficulty: "Beginner",
    nextLesson: "mini-project-completion",
    sections: [
      {
        type: "text",
        heading: "Why your first prompt is never your best",
        body:
          "Prompt engineering is iterative. Your first version will work. Your fifth version will be significantly better. The gap between a first prompt and a refined one is the gap between a chatbot that's 'kind of useful' and one that users actually rely on. This lesson is about how to close that gap systematically.",
      },
      {
        type: "text",
        heading: "The 5 most common prompt mistakes",
        body:
          "After working with dozens of AI prompts, these are the patterns that consistently produce weak results.",
      },
      {
        type: "list",
        items: [
          "Too vague: 'Be helpful' gives the AI nothing to work with. 'Help startup founders evaluate business ideas by asking 3 clarifying questions before giving feedback' is actionable.",
          "No boundaries: Without rules, the AI will do anything asked of it, including things outside its intended scope.",
          "No format instruction: Without guidance, responses vary wildly in length and structure. Users hate inconsistency.",
          "Over-engineering: Adding too many rules creates contradictions. 5 clear rules beat 20 vague ones.",
          "Ignoring tone: 'Be professional' and 'Be warm and conversational' produce completely different user experiences. Be intentional.",
        ],
      },
      {
        type: "text",
        heading: "Chain of thought prompting",
        body:
          "For complex tasks, telling the AI to think step by step dramatically improves output quality. Add 'Think through this step by step before answering' or 'First outline your approach, then execute it' to your system prompt when you need careful, reasoned responses — like analysis, evaluation, or multi-step problem solving.",
      },
      {
        type: "code",
        heading: "Bad prompt vs good prompt",
        code: `// ❌ BAD — vague, no structure, no boundaries
You are an AI assistant. Help users with their questions.

// ✅ GOOD — specific role, clear rules, defined format
You are a business idea evaluator for early-stage entrepreneurs.

When a user shares a business idea:
1. Ask ONE clarifying question about the target customer
2. Identify the single biggest risk in the idea
3. Suggest ONE specific way to validate it this week with zero budget

Keep each point to 1-2 sentences. Do not give generic encouragement.
If the idea is not a business concept, politely redirect: 
"I specialize in business ideas — want to share one?"`,
      },
      {
        type: "highlight",
        body: "The goal of prompt refinement is predictability. A great prompt produces consistently good results, not occasionally great ones.",
      },
      {
        type: "text",
        heading: "How to iterate systematically",
        body:
          "Test your prompt with at least 10 different inputs before calling it done. Look for cases where the AI breaks the rules, gives inconsistent formatting, or goes off-topic. Each failure is a prompt improvement opportunity — add a rule, clarify a constraint, or give an example of the ideal response.",
      },
      {
        type: "exercise",
        heading: "Refine a real prompt",
        body:
          "Take the system prompt you wrote in Lesson 3. Test it with 5 different messages — including 2 edge cases (unusual questions outside the intended scope). Find at least 2 things to improve. Rewrite the prompt. Test again. Compare the two versions side by side. Notice the difference.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────
  // LESSON 5  (wall lesson — leads to Launch Program)
  // ─────────────────────────────────────────────────────
  {
    slug: "mini-project-completion",
    number: 5,
    title: "Mini project completion",
    tagline: "You've built something. Here's what it would take to make it real.",
    duration: "8 min read",
    difficulty: "Intermediate",
    nextLesson: null,
    wall: true,
    sections: [
      {
        type: "text",
        heading: "What you've actually built",
        body:
          "Over these 5 lessons, you've gone from zero to understanding AI apps, APIs, system prompts, and prompt engineering. You've tested your own AI chatbot using a real language model. You've refined prompts and seen how specificity changes output quality. That's a meaningful foundation — most people who say they 'want to get into AI' never get this far.",
      },
      {
        type: "highlight",
        body: "You now understand how AI products work from the inside. Most users never reach this point.",
      },
      {
        type: "text",
        heading: "What your mini project is right now",
        body:
          "The chatbot you built in MG Labs is real — it uses Groq's Llama model, responds to messages, and behaves according to your system prompt. But right now, it only exists inside MG Labs. You can't share a link to it. You can't give it a URL. You can't let someone else use it without them logging into this platform. And you don't own it — if MG Labs goes offline, it's gone.",
      },
      {
        type: "list",
        heading: "What your chatbot currently cannot do",
        items: [
          "Be accessed from its own URL",
          "Be shared with users outside MG Labs",
          "Have its own custom design or branding",
          "Connect to your own data or files",
          "Be monetized or embedded in another product",
          "Run independently without this platform",
        ],
      },
      {
        type: "text",
        heading: "What a real AI product actually needs",
        body:
          "Turning what you built into a real product requires several additional layers. A frontend (the interface users interact with). A backend (the server that handles API calls securely). Hosting (so it's always accessible at a URL). Authentication (if users need accounts). A domain. Error handling. Rate limiting. Sometimes a database. Payment integration if you're charging for it. None of these are impossible — but all of them require decisions, time, and guidance.",
      },
      {
        type: "highlight",
        body: "The gap between 'it works in a sandbox' and 'it's a real product' is exactly where most people get stuck. That gap is not about intelligence. It's about knowing which steps to take in what order.",
      },
      {
        type: "text",
        heading: "What comes next",
        body:
          "You have two options from here. You can continue exploring — reading documentation, watching tutorials, trying to figure out deployment on your own. Some people succeed this way. Many get overwhelmed and abandon the project. Or you can take the structured path: the MG Labs Launch Program. We guide you through every step of building and deploying your specific project — from the idea you have right now to a live product with a real URL that you own and can share. Four weeks. Real result. No guesswork.",
      },
      {
        type: "exercise",
        heading: "Before you decide — do this",
        body:
          "Write down the AI product you want to build. Be specific: who uses it, what problem it solves, what the ideal output looks like. Then write the honest answer to: 'Could I figure out how to deploy this on my own in the next 30 days?' If yes, start exploring. If uncertain, that uncertainty is exactly why the Launch Program exists.",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((l) => l.slug === slug);
}

export function getNextLesson(currentSlug: string): Lesson | undefined {
  const current = getLessonBySlug(currentSlug);
  if (!current?.nextLesson) return undefined;
  return getLessonBySlug(current.nextLesson);
}
