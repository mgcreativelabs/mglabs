// =============================================
// DASHBOARD PAGE — src/app/dashboard/page.tsx
// =============================================
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardClient } from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/dashboard");

  // Touch the daily streak in the background (doesn't block render)
  void supabase.rpc("touch_daily_streak", { p_user_id: user.id });

  const [
    { data: profile },
    { data: rawSavedPrompts },
    { data: rawEnrollments },
    { count: savedCount },
  ] = await Promise.all([
    supabase.from("profiles").select("*").eq("user_id", user.id).single(),
    supabase
      .from("saved_prompts")
      .select("*, prompt:prompts(*)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(6),
    supabase
      .from("course_enrollments")
      .select("*, course:courses(id,title,slug,level,lessons_count)")
      .eq("user_id", user.id)
      .order("last_accessed_at", { ascending: false })
      .limit(4),
    supabase
      .from("saved_prompts")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id),
  ]);

  // Cast joined results — the generated types can't infer cross-table joins
  const savedPrompts = (rawSavedPrompts ?? []) as unknown as Array<{
    prompt: { title: string; category: string; difficulty: string } | null;
  }>;
  const enrollments = (rawEnrollments ?? []) as unknown as Array<{
    progress_percent: number;
    last_accessed_at: string;
    course: { id: string; title: string; slug: string; level: string; lessons_count: number } | null;
  }>;

  return (
    <DashboardClient
      user={user}
      profile={profile}
      savedPrompts={savedPrompts}
      enrollments={enrollments}
      savedPromptsCount={savedCount ?? 0}
    />
  );
}

