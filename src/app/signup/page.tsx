"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Eye, EyeOff, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/lib/hooks/useAuth";

const PERKS = [
  "Access all free courses & tutorials",
  "Save prompts to your library",
  "Join the community",
  "Weekly AI newsletter",
];

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { signUp, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 8) { setError("Password must be at least 8 characters"); return; }
    setLoading(true);
    setError("");
    const { error } = await signUp(form.email, form.password, form.name);
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 mesh-bg">
        <div className="text-center max-w-md">
          <div className="h-16 w-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
          <h1 className="text-2xl font-display font-bold text-white mb-3">Check your inbox!</h1>
          <p className="text-gray-400 mb-6">We sent a confirmation link to <strong className="text-white">{form.email}</strong>. Click it to activate your account.</p>
          <Link href="/login"><Button variant="primary" size="lg">Go to sign in</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 mesh-bg py-20">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-start">
        {/* Left: Perks */}
        <div className="hidden md:block pt-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-8">
            <div className="h-9 w-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-lg shadow-brand-blue/30">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="font-display font-bold text-white text-lg">MG <span className="text-gradient">Creative Labs</span></span>
          </Link>
          <h2 className="text-3xl font-display font-bold text-white mb-3 leading-tight">
            Start your AI journey today
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Join 50,000+ creators mastering AI tools, prompt engineering, and automation. Free forever.
          </p>
          <ul className="space-y-3">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-gray-300 text-sm">
                <div className="h-5 w-5 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                </div>
                {perk}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Form */}
        <div>
          <div className="text-center mb-6 md:hidden">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-xl bg-gradient-brand flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="font-display font-bold text-white">MG Creative Labs</span>
            </Link>
          </div>
          <div className="glass rounded-3xl p-8 border border-white/[0.06]">
            <h1 className="text-xl font-display font-bold text-white mb-1">Create your free account</h1>
            <p className="text-gray-500 text-sm mb-6">No credit card required</p>

            <Button variant="secondary" className="w-full mb-5" size="lg"
              onClick={() => signInWithGoogle()}
              leftIcon={
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              }>
              Sign up with Google
            </Button>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-white/[0.06]" />
              <span className="text-xs text-gray-600">or with email</span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Full name" placeholder="Jane Smith" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <Input label="Email" type="email" placeholder="you@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                hint="At least 8 characters"
                rightIcon={
                  <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
              />
              {error && <div className="text-sm text-red-400 bg-red-500/10 rounded-xl px-4 py-3 border border-red-500/20">{error}</div>}
              <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>
                Create free account
              </Button>
              <p className="text-xs text-gray-600 text-center">
                By signing up you agree to our{" "}
                <Link href="/terms" className="text-gray-500 hover:text-white">Terms</Link> and{" "}
                <Link href="/privacy" className="text-gray-500 hover:text-white">Privacy Policy</Link>.
              </p>
            </form>
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-brand-blue hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
