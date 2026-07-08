"use client";

import React from "react";
import { useActionState } from "react"; // React 19 hook
import { submitContactForm, type ContactState } from "@/app/actions";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Mail, Share2, GitBranch, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitContactForm, {} as ContactState);

  if (state.success) {
    return (
      <div className="min-h-screen">
        <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center mesh-bg">
           <Badge variant="blue" className="mb-5">Message Sent</Badge>
           <h1 className="text-5xl font-display font-bold text-white mb-4">Thank you!</h1>
           <p className="text-gray-400 text-lg max-w-xl mx-auto">We'll get back to you within 24–48 hours.</p>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center mesh-bg">
        <Badge variant="blue" className="mb-5">Get in touch</Badge>
        <h1 className="text-5xl font-display font-bold text-white mb-4">
          Contact <span className="text-gradient">Us</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Questions, partnerships, feedback, or just want to say hi — we read every message.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20 grid md:grid-cols-2 gap-12 items-start">
        {/* Contact info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-display font-bold text-white mb-4">Let's talk</h2>
            <p className="text-gray-500 leading-relaxed">
              We're a small team that cares deeply about our community. We respond to every message within 24–48 hours.
            </p>
          </div>
          
          {[
            { icon: Mail, label: "Email", value: "mgcreativelabs@technologist.com", href: "mailto:mgcreativelabs@technologist.com" },
            { icon: Share2, label: "Twitter / X", value: "@mgcreativelabs", href: "https://twitter.com/mgcreativelabs" },
            { icon: GitBranch, label: "GitHub", value: "github.com/mgcreativelabs", href: "https://github.com/mgcreativelabs" },
          ].map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl bg-surface-1 border border-white/[0.06] hover:border-brand-blue/30 transition-all group"
            >
              <div className="p-2.5 rounded-xl bg-surface-3 group-hover:bg-brand-blue/10 transition-colors">
                <Icon className="h-5 w-5 text-brand-blue" />
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-0.5">{label}</div>
                <div className="text-sm text-gray-200 font-medium">{value}</div>
              </div>
            </a>
          ))}
          
          <div className="p-5 rounded-2xl bg-gradient-brand-subtle border border-brand-blue/20">
            <h3 className="font-semibold text-white mb-2">Partnership inquiries</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Interested in sponsoring content, co-creating courses, or building integrations? Email us at{" "}
              <a href="mailto:mgcreativelabs@technologist.com" className="text-brand-blue hover:underline">
                mgcreativelabs@technologist.com
              </a>
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="glass rounded-3xl p-8 border border-white/[0.06]">
          <form action={formAction} className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-2">Send a message</h3>
            
            {state.error && <p className="text-red-400 text-sm">{state.error}</p>}

            <div className="grid grid-cols-2 gap-4">
              <Input label="Name" name="name" placeholder="Your name" required />
              <Input label="Email" name="email" type="email" placeholder="you@email.com" required />
            </div>
            
            <Input label="Subject" name="subject" placeholder="What's this about?" required />
            
            <Textarea label="Message" name="message" placeholder="Tell us more..." rows={5} required />
            
            <Button type="submit" variant="primary" size="lg" className="w-full" loading={isPending}>
              Send message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}