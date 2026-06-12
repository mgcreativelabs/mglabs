# 🚀 MG Creative Labs

> The #1 platform to master AI, Prompt Engineering, AI Coding, AI Design, and Automation.

Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Supabase**.

## Quick Start

```bash
git clone https://github.com/yourusername/mgcreativelabs.git
cd mgcreativelabs
npm install
cp .env.local.example .env.local
# Add your Supabase credentials to .env.local
npm run dev
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home
│   ├── about/              # About page
│   ├── ai-learning-hub/    # AI Learning Hub
│   ├── prompt-library/     # Prompt Library (client-side search/filter)
│   ├── ai-coding-academy/  # AI Coding Academy
│   ├── ai-design-academy/  # AI Design Academy
│   ├── blog/               # Blog listing
│   ├── community/          # Community discussions
│   ├── contact/            # Contact form
│   ├── dashboard/          # Protected user dashboard
│   ├── admin/              # Protected admin panel
│   ├── login/              # Authentication
│   ├── signup/             # Registration
│   └── api/                # API routes
│       ├── newsletter/     # Newsletter subscribe
│       └── prompts/        # Prompts CRUD + save
├── components/
│   ├── ui/                 # Button, Badge, Input, Card, Avatar, Skeleton, Textarea
│   ├── layout/             # Navbar, Footer
│   └── sections/           # Hero, Features, Newsletter, Testimonials
├── lib/
│   ├── supabase/           # client.ts, server.ts, middleware.ts, types.ts
│   ├── hooks/              # useAuth, usePrompts
│   └── utils/              # cn, seo, format
├── types/                  # TypeScript interfaces
└── styles/                 # globals.css
supabase/
└── schema.sql              # Full production DB schema + RLS + seed data
DEPLOYMENT.md               # Step-by-step deployment guide
STRATEGY.md                 # Monetization + marketing + roadmap
```

## Pages Built

| Page | Route | Type |
|------|-------|------|
| Home | `/` | Static |
| About | `/about` | Static |
| AI Learning Hub | `/ai-learning-hub` | Static |
| Prompt Library | `/prompt-library` | Client (search/filter) |
| AI Coding Academy | `/ai-coding-academy` | Static |
| AI Design Academy | `/ai-design-academy` | Static |
| Blog | `/blog` | Static |
| Community | `/community` | Static |
| Contact | `/contact` | Client (form) |
| Login | `/login` | Client (auth) |
| Signup | `/signup` | Client (auth) |
| Dashboard | `/dashboard` | Dynamic (protected) |
| Admin Panel | `/admin` | Dynamic (admin only) |

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + custom design system
- **Backend**: Supabase (PostgreSQL + Auth + RLS)
- **Auth**: Supabase Auth (email + Google OAuth)
- **Deployment**: Vercel
- **Icons**: Lucide React
- **Animation**: Custom CSS keyframes + Tailwind

## Key Features

- ✅ User authentication (email + Google OAuth)
- ✅ Protected routes (middleware)
- ✅ User dashboard with stats
- ✅ Admin panel (role-based access)
- ✅ Prompt library with search + filter
- ✅ Save/unsave prompts
- ✅ Newsletter subscription
- ✅ Blog system
- ✅ Community discussions
- ✅ Full SEO (metadata, OG, sitemap, robots, structured data)
- ✅ Dark design system
- ✅ Responsive mobile design
- ✅ Row-Level Security (RLS) on all tables
- ✅ Production-ready database schema

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete instructions.

## Business Strategy

See [STRATEGY.md](./STRATEGY.md) for monetization, marketing, and roadmap.
