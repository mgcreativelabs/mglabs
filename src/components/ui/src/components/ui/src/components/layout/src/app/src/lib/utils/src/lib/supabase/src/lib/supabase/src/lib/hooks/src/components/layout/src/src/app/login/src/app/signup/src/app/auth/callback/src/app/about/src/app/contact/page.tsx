"use client";
import React, { useState } from "react";
import { Mail, Share2, GitBranch, CheckCircle } from "lucide-react";

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
    <div className="pt-16 min-h-screen">
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center mesh-bg">
        <h1 className="text-5xl font-bold text-white mb-4">Contact <span className="text-gradient">Us</span></h1>
        <p className="text-gray-400 text-lg">Questions, partnerships, feedback — we read every message.</p>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20 grid md:grid-cols-2 gap-12">
        <div className="space-y-5">
          <h2 className="text-2xl font-bold text-white">Let&apos;s talk</h2>
          <p className="text-gray-500">We respond within 24–48 hours.</p>
          {[
            { icon: Mail, label: "Email", value: "hello@mgcreativelabs.com", href: "mailto:hello@mgcreativelabs.com" },
            { icon: Share2, label: "Twitter", value: "@mgcreativelabs", href: "https://twitter.com/mgcreativelabs" },
            { icon: GitBranch, label: "GitHub", value: "github.com/mgcreativelabs", href: "https://github.com/mgcreativelabs" },
          ].map(({ icon: Icon, label, value, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl bg-surface-1 border border-white/[0.06] hover:border-brand-blue/30 transition-all group">
              <div className="p-2.5 rounded-xl bg-surface-3"><Icon className="h-5 w-5 text-brand-blue" /></div>
              <div>
                <div className="text-xs text-gray-600 mb-0.5">{label}</div>
                <div className="text-sm text-gray-200 font-medium">{value}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="glass rounded-3xl p-8 border border-white/[0.06]">
          {success ? (
            <div className="flex flex-col items-center text-center py-8 gap-4">
              <div className="h-14 w-14 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <CheckCircle className="h-7 w-7 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Message sent!</h3>
              <p className="text-gray-500 text-sm">We&apos;ll get back to you within 24–48 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-2">Send a message</h3>
              {[
                { field: "name", label: "Name", type: "text", placeholder: "Your name" },
                { field: "email", label: "Email", type: "email", placeholder: "you@email.com" },
                { field: "subject", label: "Subject", type: "text", placeholder: "What's this about?" },
              ].map(({ field, label, type, placeholder }) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
                  <input type={type} placeholder={placeholder} required
                    value={form[field as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="w-full h-11 rounded-xl bg-surface-2 border border-white/10 text-gray-100 placeholder:text-gray-600 px-4 text-sm focus:outline-none focus:border-brand-blue/60 focus:ring-2 focus:ring-brand-blue/20" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Message</label>
                <textarea rows={4} placeholder="Tell us more..." required
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xl bg-surface-2 border border-white/10 text-gray-100 placeholder:text-gray-600 px-4 py-3 text-sm focus:outline-none focus:border-brand-blue/60 focus:ring-2 focus:ring-brand-blue/20 resize-none" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full h-12 rounded-xl bg-gradient-brand text-white font-semibold shadow-lg shadow-brand-blue/20 hover:scale-[1.02] disabled:opacity-50 transition-all">
                {loading ? "Sending..." : "Send message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}