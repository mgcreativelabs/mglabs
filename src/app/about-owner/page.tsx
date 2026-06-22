import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Mail, Globe, ExternalLink, Zap, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About the Founder — MG Creative Labs",
  description: "Meet Mehdi Guemdani, founder of MG Creative Labs — an AI education platform helping creators master AI, prompt engineering, coding, and automation.",
};

const skills = [
  "AI & Prompt Engineering",
  "Full-Stack Development",
  "Next.js & React",
  "Supabase & PostgreSQL",
  "UI/UX Design",
  "Content Creation",
  "Automation (n8n, Zapier)",
  "Community Building",
];

const values = [
  {
    emoji: "🎯",
    title: "Clarity first",
    desc: "I believe great education removes confusion, not adds to it. Every course and tutorial I build is designed to be immediately actionable.",
  },
  {
    emoji: "🚀",
    title: "Ship fast, improve always",
    desc: "Building MG Creative Labs from scratch taught me that done is better than perfect. Iterate in public, improve based on real feedback.",
  },
  {
    emoji: "🤝",
    title: "Community over competition",
    desc: "AI levels the playing field. The more we share, the faster we all grow. MG Creative Labs is built on radical generosity.",
  },
  {
    emoji: "🔮",
    title: "Long-term thinking",
    desc: "The tools change. The ability to learn, adapt, and create doesn't. That's what I'm really teaching.",
  },
];

export default function AboutOwnerPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 px-4 sm:px-6 max-w-5xl mx-auto mesh-bg">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="blue" className="mb-5">Founder & Creator</Badge>
            <h1 className="text-5xl font-display font-bold text-white leading-tight mb-4">
              Mehdi<br />
              <span className="text-gradient">Guemdani</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Founder of MG Creative Labs. Builder, educator, and AI practitioner helping creators master the tools reshaping how we work and build.
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="mailto:mgcreativelabs@technologist.com">
                <Button variant="primary" leftIcon={<Mail className="h-4 w-4" />}>
                  Get in touch
                </Button>
              </a>
              <a href="https://twitter.com/mgcreativelabs" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" leftIcon={<ExternalLink className="h-4 w-4" />}>
                  Twitter / X
                </Button>
              </a>
            </div>
          </div>

          {/* Avatar placeholder */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="h-64 w-64 rounded-3xl bg-gradient-to-br from-brand-blue/30 to-brand-purple/30 border border-white/10 flex items-center justify-center">
                <div className="h-20 w-20 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-xl shadow-brand-blue/30">
                  <Zap className="h-10 w-10 text-white" />
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 glass rounded-2xl px-4 py-2 border border-white/10">
                <p className="text-xs font-semibold text-white">MG Creative Labs</p>
                <p className="text-[10px] text-gray-500">Est. 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact info */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-wrap gap-4">
          <a
            href="mailto:mgcreativelabs@technologist.com"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <Mail className="h-4 w-4 text-brand-blue" />
            mgcreativelabs@technologist.com
          </a>
          <a
            href="https://mglabs.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <Globe className="h-4 w-4 text-brand-purple" />
            mglabs.vercel.app
          </a>
          <a
            href="https://github.com/mgcreativelabs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ExternalLink className="h-4 w-4 text-gray-400" />
            mgcreativelabs
          </a>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <Badge variant="purple" className="mb-4">Story</Badge>
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Why I built MG Creative Labs
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                I started learning about AI at a time when the best resources were locked behind expensive courses, dense academic papers, or YouTube videos that spent 20 minutes getting to the point.
              </p>
              <p>
                I learned anyway — through trial and error, late nights reading papers, and building projects that failed in interesting ways. Eventually I got good at it. And I realized the gap between where I started and where I ended up wasn&apos;t about talent. It was about access to good explanations.
              </p>
              <p>
                MG Creative Labs is my attempt to be the resource I wish I&apos;d had. Clear, practical, honest about what works and what doesn&apos;t.
              </p>
            </div>
          </div>

          <div>
            <Badge variant="success" className="mb-4">Skills</Badge>
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              What I work with
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg bg-surface-2 border border-white/[0.06] text-sm text-gray-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <Badge variant="blue" className="mb-4">Values</Badge>
        <h2 className="text-3xl font-display font-bold text-white mb-8">How I think</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {values.map((v) => (
            <Card key={v.title} className="border border-white/[0.06] p-6">
              <div className="text-2xl mb-3">{v.emoji}</div>
              <h3 className="font-semibold text-white mb-2">{v.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{v.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="glass rounded-3xl p-12 border border-white/[0.06]">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Want to work together or just say hi?
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Whether you have a question, a collaboration idea, or feedback on MG Creative Labs — I read everything and reply to most things.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="mailto:mgcreativelabs@technologist.com">
              <Button variant="primary" size="lg" leftIcon={<Mail className="h-4 w-4" />}>
                Email Mehdi
              </Button>
            </a>
            <Link href="/contact">
              <Button variant="secondary" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Contact form
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
