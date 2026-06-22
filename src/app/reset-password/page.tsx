"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Zap, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 mesh-bg">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="h-9 w-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-lg shadow-brand-blue/30">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="font-display font-bold text-white text-lg">MG <span className="text-gradient">Creative Labs</span></span>
          </Link>
          <h1 className="text-2xl font-display font-bold text-white">Reset your password</h1>
          <p className="text-gray-500 text-sm mt-1">
            {sent ? "Check your inbox for a reset link" : "We'll email you a link to set a new password"}
          </p>
        </div>

        <div className="glass rounded-3xl p-8 border border-white/[0.06]">
          {sent ? (
            <div className="text-center">
              <div className="h-14 w-14 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-7 w-7 text-green-400" />
              </div>
              <p className="text-gray-400 text-sm mb-6">
                If an account exists for <strong className="text-white">{email}</strong>, a reset link is on its way. It'll expire in 1 hour.
              </p>
              <Link href="/login">
                <Button variant="secondary" size="lg" className="w-full">Back to sign in</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error && (
                <div className="text-sm text-red-400 bg-red-500/10 rounded-xl px-4 py-3 border border-red-500/20">
                  {error}
                </div>
              )}
              <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>
                Send reset link
              </Button>
            </form>
          )}
        </div>

        <Link href="/login" className="flex items-center justify-center gap-1.5 text-sm text-gray-600 hover:text-white transition-colors mt-5">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
        </Link>
      </div>
    </div>
  );
}
