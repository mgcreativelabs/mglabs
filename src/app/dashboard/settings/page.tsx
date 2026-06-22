import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SettingsClient } from "./SettingsClient";

export const dynamic = "force-dynamic";

export const metadata = { title: "Settings — MG Creative Labs" };

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/dashboard/settings");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return <SettingsClient user={user} profile={profile} />;
}
