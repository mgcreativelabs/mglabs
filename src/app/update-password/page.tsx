"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Eye, EyeOff, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";

export default function UpdatePasswordPage() {
  const [ready, setReady] = useState(false);
  const [invalidLink, setInvalidLink] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const readyRef = React.useRef(false);

  useEffect(() => {
    const supabase = createClient();

    // Clicking the reset-password email link logs the user into a
    // short-lived "recovery" session. We listen for that event instead
    // of assuming the link is valid — if it's expired or already used,
    // no PASSWORD_RECOVERY event will fire.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        readyRef.current = true;
        setReady(true);
      }
    });

    // If a recovery session is already active by the time this mounts
    // (common — the event can fire before the listener attaches), check
    // directly too.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        readyRef.current = true;
        setReady(true);
      }
    });

    const timeout = setTimeout(() => {
      if (!readyRef.current) setInvalidLink(true);
    }, 3000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 2000);
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
          <h1 className="text-2xl font-display font-bold text-white">Set a new password</h1>
        </div>

        <div className="glass rounded-3xl p-8 border border-white/[0.06]">
          {success ? (
            <div className="text-center">
              <div className="h-14 w-14 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-7 w-7 text-green-400" />
              </div>
              <p className="text-gray-400 text-sm">Password updated. Redirecting you to your dashboard...</p>
            </div>
          ) : invalidLink ? (
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-6">
                This reset link is invalid or has expired. Request a new one to continue.
              </p>
              <Link href="/reset-password">
                <Button variant="primary" size="lg" className="w-full">Request a new link</Button>
              </Link>
            </div>
          ) : !ready ? (
            <p className="text-gray-500 text-sm text-center">Verifying your reset link...</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="New password"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                rightIcon={
                  <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
              />
              <Input
                label="Confirm new password"
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {error && (
                <div className="text-sm text-red-400 bg-red-500/10 rounded-xl px-4 py-3 border border-red-500/20">
                  {error}
                </div>
              )}
              <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>
                Update password
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
