"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Users, FileText, Sparkles, Mail, Shield, TrendingUp, Plus, Settings, BarChart2 } from "lucide-react";
import { formatRelativeDate } from "@/lib/utils/format";

interface AdminClientProps {
  stats: { userCount: number | null; promptCount: number | null; postCount: number | null; subscriberCount: number | null };
  recentUsers: Record<string, unknown>[];
}

const TABS = ["Overview", "Users", "Prompts", "Blog", "Newsletter", "Settings"];

export function AdminClient({ stats, recentUsers }: AdminClientProps) {
  const [activeTab, setActiveTab] = useState("Overview");

  const statCards = [
    { label: "Total Users", value: stats.userCount ?? 0, icon: Users, color: "text-brand-blue", change: "+12% this week" },
    { label: "Prompts", value: stats.promptCount ?? 0, icon: Sparkles, color: "text-brand-purple", change: "+5 this week" },
    { label: "Blog Posts", value: stats.postCount ?? 0, icon: FileText, color: "text-cyan-400", change: "+2 this week" },
    { label: "Subscribers", value: stats.subscriberCount ?? 0, icon: Mail, color: "text-green-400", change: "+84 this week" },
  ];

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="h-5 w-5 text-brand-blue" />
              <h1 className="text-2xl font-display font-bold text-white">Admin Panel</h1>
              <Badge variant="danger" size="sm">Restricted</Badge>
            </div>
            <p className="text-gray-500 text-sm">Manage content, users, and platform settings.</p>
          </div>
          <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            New content
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-surface-1 rounded-xl p-1 w-fit border border-white/[0.06]">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-surface-3 text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Overview" && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {statCards.map((s) => (
                <Card key={s.label} className="glass border border-white/[0.06]" p-4>
                  <div className="flex items-center justify-between mb-3">
                    <s.icon className={`h-5 w-5 ${s.color}`} />
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                  <div className="text-3xl font-display font-bold text-white">{s.value.toLocaleString()}</div>
                  <div className="text-xs text-gray-600 mt-0.5">{s.label}</div>
                  <div className="text-xs text-green-400 mt-1">{s.change}</div>
                </Card>
              ))}
            </div>

            {/* Recent users */}
            <Card className="glass border border-white/[0.06] p-4">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold">RECENT SIGNUP</h3>
                <Button variant="ghost" size="sm">View all users</Button>
              </div>
              <div className="space-y-3">
                {recentUsers.length === 0 ? (
                  <p className="text-gray-600 text-sm text-center py-4">No users yet.</p>
                ) : (
                  recentUsers.map((u: Record<string, unknown>, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-2 transition-colors">
                      <Avatar fallback={(u.full_name as string) || "U"} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white font-medium truncate">{(u.full_name as string) || "Anonymous"}</p>
                        <p className="text-xs text-gray-600">{formatRelativeDate(u.created_at as string)}</p>
                      </div>
                      <Badge
                        variant={(u.role as string) === "admin" ? "danger" : "default"}
                        size="sm"
                      >
                        {u.role as string}
                      </Badge>
                      <Badge
                        variant={(u.subscription_tier as string) === "pro" ? "gradient" : "default"}
                        size="sm"
                      >
                        {u.subscription_tier as string}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Quick actions */}
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: FileText, label: "New blog post", desc: "Write and publish a new article", color: "text-cyan-400" },
                { icon: Sparkles, label: "Add prompt", desc: "Add a new prompt to the library", color: "text-brand-purple" },
                { icon: Mail, label: "Send newsletter", desc: "Compose and send to subscribers", color: "text-green-400" },
              ].map((action) => (
                <div key={action.label} className="glass rounded-2xl p-5 border border-white/[0.06] hover:border-brand-blue/30 cursor-pointer transition-all hover:bg-surface-2">
                  <action.icon className={`h-6 w-6 ${action.color} mb-3`} />
                  <h3 className="font-semibold text-white text-sm">{action.label}</h3>
                  <p className="text-xs text-gray-600 mt-1">{action.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab !== "Overview" && (
          <div className="text-center py-20">
            <Settings className="h-10 w-10 text-gray-700 mx-auto mb-4" />
            <h3 className="text-gray-500 text-lg font-medium">{activeTab} management</h3>
            <p className="text-gray-700 text-sm mt-1">Full CRUD interface — connect to your Supabase tables.</p>
          </div>
        )}
      </div>
    </div>
  );
}
