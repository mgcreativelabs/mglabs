// =============================================
// ADMIN PANEL — src/app/admin/page.tsx
// Protected: requires admin role
// =============================================
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminClient } from "./AdminClient";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if ((profile as Record<string, unknown> | null)?.['role'] !== "admin") redirect("/dashboard");

  const [{ count: userCount }, { count: promptCount }, { count: postCount }, { count: subscriberCount }] =
    await Promise.all([
      supabase.from("profiles").select("*", { count: "exact", head: true }),
      supabase.from("prompts").select("*", { count: "exact", head: true }),
      supabase.from("blog_posts").select("*", { count: "exact", head: true }),
      supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }),
    ]);

  const { data: recentUsers } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <AdminClient
      stats={{ userCount, promptCount, postCount, subscriberCount }}
      recentUsers={recentUsers || []}
    />
  );
}
export const dynamic = 'force-dynamic';
