// =============================================
// TESTIMONIALS — src/components/sections/Testimonials.tsx
// =============================================
import React from "react";
import { Star } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Freelance Designer",
    avatar: null,
    content: "MG Creative Labs transformed how I work. I went from struggling with AI tools to landing 3x my old freelance rate within 2 months of learning here.",
    rating: 5,
    badge: "AI Design Academy",
  },
  {
    name: "Marcus Williams",
    role: "Software Engineer",
    avatar: null,
    content: "The prompt library alone saved me 10 hours a week. The AI coding tutorials are the most practical I've found — actual projects, not toy examples.",
    rating: 5,
    badge: "AI Coding Academy",
  },
  {
    name: "Priya Patel",
    role: "Startup Founder",
    avatar: null,
    content: "I automated my entire customer onboarding with the automation course. No technical background needed — the instructions are genuinely clear.",
    rating: 5,
    badge: "Automation",
  },
  {
    name: "Jake Torres",
    role: "Content Creator",
    avatar: null,
    content: "Finally a platform that explains prompt engineering without the hype. I write 10x faster and my content quality has never been higher.",
    rating: 5,
    badge: "Prompt Library",
  },
  {
    name: "Amara Osei",
    role: "Marketing Manager",
    avatar: null,
    content: "The community is incredibly supportive. I posted my first AI project and got detailed feedback from senior developers within hours.",
    rating: 5,
    badge: "Community",
  },
  {
    name: "Ryan Park",
    role: "Product Manager",
    avatar: null,
    content: "Best free resource for AI education on the internet. The learning path is well-structured and never overwhelming.",
    rating: 5,
    badge: "AI Learning Hub",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-surface-1/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="gradient" className="mb-4">Trusted by creators</Badge>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            Real results, real people
          </h2>
          <p className="text-gray-500 text-lg">
            Join 50,000+ learners who leveled up with MG Creative Labs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="glass glass-hover rounded-2xl p-6 border border-white/[0.06] flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar fallback={t.name} size="md" />
                  <div>
                    <div className="font-semibold text-white text-sm">{t.name}</div>
                    <div className="text-xs text-gray-600">{t.role}</div>
                  </div>
                </div>
                <Badge variant="blue" size="sm">{t.badge}</Badge>
              </div>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed flex-1">&ldquo;{t.content}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
