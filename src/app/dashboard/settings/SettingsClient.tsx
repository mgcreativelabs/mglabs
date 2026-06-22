"use client";
import React, { useState } from "react";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { ArrowLeft, User as UserIcon, Lock, CreditCard, Bell, Palette, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { createClient } from "@/lib/supabase/client";

interface SettingsClientProps {
  user: User;
  profile: Record<string, unknown> | null;
}

type ActiveTab = "profile" | "password" | "billing" | "notifications";

export function SettingsClient({ user, profile }: SettingsClientProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("profile");

  const tabs = [
    { id: "profile" as ActiveTab, label: "Profile", icon: UserIcon },
    { id: "password" as ActiveTab, label: "Password", icon: Lock },
    { id: "billing" as ActiveTab, label: "Billing", icon: CreditCard },
    { id: "notifications" as ActiveTab, label: "Notifications", icon: Bell },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Back */}
        <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-white transition-colors mb-8">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to dashboard
        </Link>

        <h1 className="text-3xl font-display font-bold text-white mb-8">Settings</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar nav */}
          <nav className="lg:w-52 flex-shrink-0">
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-brand-blue/20 text-brand-blue border border-brand-blue/30"
                      : "text-gray-400 hover:text-white hover:bg-surface-2"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Panel */}
          <div className="flex-1">
            {activeTab === "profile" && (
              <ProfileTab user={user} profile={profile} />
            )}
            {activeTab === "password" && (
              <PasswordTab />
            )}
            {activeTab === "billing" && (
              <BillingTab profile={profile} />
            )}
            {activeTab === "notifications" && (
              <NotificationsTab />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Profile tab
// ─────────────────────────────────────────────
function ProfileTab({ user, profile }: { user: User; profile: Record<string, unknown> | null }) {
  const [fullName, setFullName] = useState((profile?.full_name as string) || "");
  const [username, setUsername] = useState((profile?.username as string) || "");
  const [bio, setBio] = useState((profile?.bio as string) || "");
  const [website, setWebsite] = useState((profile?.website as string) || "");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const displayName = fullName || user.email?.split("@")[0] || "Creator";

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatus("idle");

    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName.trim(), username: username.trim() || null, bio: bio.trim() || null, website: website.trim() || null })
      .eq("user_id", user.id);

    setSaving(false);
    if (error) {
      setStatus("error");
      setErrMsg(error.message);
    } else {
      setStatus("success");
    }
  }

  return (
    <Card className="border border-white/[0.06] p-6">
      <h2 className="text-lg font-semibold text-white mb-6">Profile information</h2>

      <div className="flex items-center gap-4 mb-8">
        <Avatar fallback={displayName} src={(profile?.avatar_url as string) || undefined} size="xl" />
        <div>
          <p className="text-sm font-medium text-white">{displayName}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
          <p className="text-xs text-gray-600 mt-1">Avatar is pulled from your Gravatar or Google account</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <Input
          label="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Your name"
        />
        <Input
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="your-username"
        />
        <div>
          <Input
            label="Email"
            type="email"
            value={user.email || ""}
            disabled
          />
          <p className="text-xs text-gray-600 mt-1.5">To change your email, contact mgcreativelabs@technologist.com</p>
        </div>
        <Textarea
          label="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell the community a bit about yourself..."
          rows={3}
          maxLength={300}
        />
        <Input
          label="Website"
          type="url"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="https://yoursite.com"
        />

        {status === "success" && (
          <div className="flex items-center gap-2 text-green-400 text-sm">
            <CheckCircle className="h-4 w-4" /> Profile saved successfully.
          </div>
        )}
        {status === "error" && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="h-4 w-4" /> {errMsg}
          </div>
        )}

        <div className="flex justify-end">
          <Button type="submit" variant="primary" loading={saving}>Save changes</Button>
        </div>
      </form>
    </Card>
  );
}

// ─────────────────────────────────────────────
// Password tab
// ─────────────────────────────────────────────
function PasswordTab() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");

    if (next.length < 8) {
      setStatus("error");
      setErrMsg("New password must be at least 8 characters.");
      return;
    }
    if (next !== confirm) {
      setStatus("error");
      setErrMsg("Passwords don't match.");
      return;
    }

    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: next });
    setSaving(false);

    if (error) {
      setStatus("error");
      setErrMsg(error.message);
    } else {
      setStatus("success");
      setCurrent("");
      setNext("");
      setConfirm("");
    }
  }

  return (
    <Card className="border border-white/[0.06] p-6">
      <h2 className="text-lg font-semibold text-white mb-6">Change password</h2>
      <form onSubmit={handleSave} className="space-y-4 max-w-md">
        <Input
          label="Current password"
          type="password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          placeholder="Your current password"
        />
        <Input
          label="New password"
          type="password"
          value={next}
          onChange={(e) => setNext(e.target.value)}
          placeholder="Min. 8 characters"
        />
        <Input
          label="Confirm new password"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Re-enter new password"
        />

        {status === "success" && (
          <div className="flex items-center gap-2 text-green-400 text-sm">
            <CheckCircle className="h-4 w-4" /> Password updated successfully.
          </div>
        )}
        {status === "error" && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="h-4 w-4" /> {errMsg}
          </div>
        )}

        <div className="flex justify-end">
          <Button type="submit" variant="primary" loading={saving}>Update password</Button>
        </div>
      </form>
    </Card>
  );
}

// ─────────────────────────────────────────────
// Billing tab
// ─────────────────────────────────────────────
function BillingTab({ profile }: { profile: Record<string, unknown> | null }) {
  const tier = (profile?.subscription_tier as string) ?? "free";

  return (
    <Card className="border border-white/[0.06] p-6">
      <h2 className="text-lg font-semibold text-white mb-6">Billing & subscription</h2>

      <div className="p-4 rounded-xl bg-surface-2 border border-white/[0.06] flex items-center justify-between mb-6">
        <div>
          <p className="text-sm font-semibold text-white">
            {tier === "pro" ? "Pro plan" : "Free plan"}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {tier === "pro" ? "$500/month — renews automatically" : "No active subscription"}
          </p>
        </div>
        <Badge variant={tier === "pro" ? "gradient" : "default"}>
          {tier === "pro" ? "Active" : "Free"}
        </Badge>
      </div>

      {tier === "free" ? (
        <div className="space-y-4">
          <p className="text-sm text-gray-400">
            Upgrade to Pro to unlock all premium courses, exclusive AI tools, and the full prompt library.
          </p>
          <Link href="/pricing">
            <Button variant="primary">View Pro plan — $500/month</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3 text-sm text-gray-400">
          <p>To manage or cancel your subscription, email us at{" "}
            <a href="mailto:mgcreativelabs@technologist.com" className="text-brand-blue hover:underline">
              mgcreativelabs@technologist.com
            </a>
          </p>
        </div>
      )}
    </Card>
  );
}

// ─────────────────────────────────────────────
// Notifications tab
// ─────────────────────────────────────────────
function NotificationsTab() {
  return (
    <Card className="border border-white/[0.06] p-6">
      <h2 className="text-lg font-semibold text-white mb-6">Notification preferences</h2>
      <div className="space-y-4 text-sm text-gray-400">
        {[
          { label: "New course announcements", sub: "When new courses are published" },
          { label: "Community replies", sub: "When someone replies to your posts" },
          { label: "Newsletter", sub: "Weekly AI creator insights" },
          { label: "Streak reminders", sub: "Daily reminder to keep your streak" },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
            <div>
              <p className="text-sm text-white">{item.label}</p>
              <p className="text-xs text-gray-600">{item.sub}</p>
            </div>
            <p className="text-xs text-gray-600 italic">Coming soon</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
