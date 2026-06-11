"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Zap, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { signUp, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 8) { setError("Password must be at least 8 characters"); return; }
    setLoading(true);
    setError("");
    const { error } = await signUp(form.email, form.password, form.name);
    if (error) { setError(error.message); setLoading(false); }
    else setSuccess(true);
  };

  if (success) return (
    <div className="min-h-screen flex items-center justify-center px-4 mesh-bg">
      <div className="text-center max-w-md">
        <div className="h-16 w-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="h-8 w-8 text-green-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">Check your inbox!</h1>
        <p className="text-gray-400 mb-6">We sent a confirmation link to <strong className="text-white">{form.email}</strong></p>
        <Link href="/login" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-brand text-white font-semibold hover:scale-[1.02] transition-all">Go to sign in</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-4 mesh-bg py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="h-9 w-9 rounded-xl bg-gradient-brand flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-white text-lg">MG <span className="text-gradient">Creative Labs</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Create your free account</h1>
          <p className="text-gray-500 text-sm mt-1">No credit card required</p>
        </div>

        <div className="glass rounded-3xl p-8 border border-white/[0.06]">
          <button onClick={() => signInWithGoogle()}
            className="w-full flex items-center justify-center gap-3 h-12 rounded-xl bg-surface-2 border border-white/10 text-gray-100 font-medium hover:border-brand-blue/40 transition-all mb-5">
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign up with Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-xs text-gray-600">or with email</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {["name", "email", "password"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-300 mb-1.5 capitalize">{field === "name" ? "Full name" : field}</label>
                <div className="relative">
                  <input
                    type={field === "password" ? (showPassword ? "text" : "password") : field === "email" ? "email" : "text"}
                    placeholder={field === "name" ? "Jane Smith" : field === "email" ? "you@email.com" : "Min. 8 characters"}
                    value={form[field as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    required
                    className="w-full h-11 rounded-xl bg-surface-2 border border-white/10 text-gray-100 placeholder:text-gray-600 px-4 pr-10 text-sm focus:outline-none focus:border-brand-blue/60 focus:ring-2 focus:ring-brand-blue/20" />
                  {field === "password" && (
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {error && <div className="text-sm text-red-400 bg-red-500/10 rounded-xl px-4 py-3 border border-red-500/20">{error}</div>}
            <button type="submit" disabled={loading}
              className="w-full h-12 rounded-xl bg-gradient-brand text-white font-semibold shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/40 hover:scale-[1.02] disabled:opacity-50 transition-all">
              {loading ? "Creating account..." : "Create free account"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-brand-blue hover:underline font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}