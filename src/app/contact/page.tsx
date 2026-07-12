"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Mail, MessageSquare, Share2, GitBranch, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSuccess(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center mesh-bg">
        <Badge variant="blue" className="mb-5">Get in touch</Badge>
        <h1 className="text-5xl font-display font-bold text-ink mb-4">
          Contact <span className="text-gradient">Us</span>
        </h1>
        <p className="text-ink-2 text-lg max-w-xl mx-auto">
          Questions, partnerships, feedback, or just want to say hi — we read every message.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20 grid md:grid-cols-2 gap-12 items-start">
        {/* Contact info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-display font-bold text-ink mb-4">Let&apos;s talk</h2>
            <p className="text-ink-muted leading-relaxed">
              We&apos;re a small team that cares deeply about our community. We respond to every message within 24–48 hours.
            </p>
          </div>
          {[
            { icon: Mail, label: "Email", value: "mgcreativelabs@technologist.com", href: "mailto:mgcreativelabs@technologist.com" },
            { icon: Share2, label: "Twitter / X", value: "@mgcreativelabs", href: "https://twitter.com/mgcreativelabs" },
            { icon: GitBranch, label: "GitHub", value: "github.com/mgcreativelabs", href: "https://github.com/mgcreativelabs" },
          ].map(({ icon: Icon, label, value, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl bg-surface-1 border border-border hover:border-brand-blue/30 transition-all group">
              <div className="p-2.5 rounded-xl bg-surface-3 group-hover:bg-brand-blue/10 transition-colors">
                <Icon className="h-5 w-5 text-brand-blue" />
              </div>
              <div>
                <div className="text-xs text-ink-muted mb-0.5">{label}</div>
                <div className="text-sm text-ink font-medium">{value}</div>
              </div>
            </a>
          ))}

          <div className="p-5 rounded-2xl bg-brand-blue/5 border border-brand-blue/20">
            <h3 className="font-semibold text-ink mb-2">Partnership inquiries</h3>
            <p className="text-sm text-ink-2 leading-relaxed">
              Interested in sponsoring content, co-creating courses, or building integrations? Email us at{" "}
              <a href="mailto:mgcreativelabs@technologist.com" className="text-brand-blue hover:underline">
                mgcreativelabs@technologist.com
              </a>
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="glass rounded-3xl p-8 border border-border">
          {success ? (
            <div className="flex flex-col items-center justify-center text-center py-8 gap-4">
              <div className="h-14 w-14 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <CheckCircle className="h-7 w-7 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Message sent!</h3>
              <p className="text-ink-muted text-sm">We&apos;ll get back to you within 24–48 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-semibold text-ink mb-2">Send a message</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Name" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <Input label="Email" type="email" placeholder="you@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <Input label="Subject" placeholder="What's this about?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
              <Textarea label="Message" placeholder="Tell us more..." rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
              <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>
                Send message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
