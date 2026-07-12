// =============================================
// NEWSLETTER — src/components/sections/Newsletter.tsx
// =============================================
"use client";

import React, { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: dbError } = await (supabase as any)
        .from("newsletter_subscribers")
        .insert({ email, name: name || null, is_confirmed: false });

      if (dbError) {
        if (dbError.code === "23505") {
          setError("You're already subscribed!");
        } else {
          throw dbError;
        }
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="newsletter" className="py-24 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="rounded-3xl bg-brand-blue/5 border border-brand-blue/20 p-10 text-center relative overflow-hidden">
          {/* Background decoration */}
          {/* Ambient glow blob removed for a calm, flat premium look */}

          <div className="relative z-10">
            <div className="h-12 w-12 rounded-2xl bg-brand-blue flex items-center justify-center mx-auto mb-5">
              <Mail className="h-6 w-6 text-white" />
            </div>

            <h2 className="text-3xl font-display font-bold text-ink mb-3">
              Weekly AI insights
            </h2>
            <p className="text-ink-2 mb-8 leading-relaxed">
              Get the best AI tools, prompts, tutorials, and news delivered every Tuesday.
              Zero fluff, only value.
            </p>

            {success ? (
              <div className="flex items-center justify-center gap-2 text-green-400 bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">You&apos;re subscribed! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    placeholder="Your name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                  />
                </div>
                
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  loading={loading}
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Subscribe for free
                </Button>
                <p className="text-xs text-ink-muted">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
