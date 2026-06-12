import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { prompt_id } = await request.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;
  const { error } = await db.from("saved_prompts").insert({ user_id: user.id, prompt_id });
  if (error?.code === "23505") {
    await db.from("saved_prompts").delete().eq("user_id", user.id).eq("prompt_id", prompt_id);
    return NextResponse.json({ saved: false });
  }
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ saved: true });
}
