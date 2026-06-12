// =============================================
// DASHBOARD PAGE — src/app/dashboard/page.tsx
// =============================================
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardClient } from "./DashboardClient";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirect=/dashboard");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const { data: savedPrompts } = await supabase
    .from("saved_prompts")
    .select("*, prompt:prompts(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(6);

  return (
    <DashboardClient
      user={user}
      profile={profile}
      savedPrompts={savedPrompts || []}
    />
  );
}
export const dynamic = 'force-dynamic';
