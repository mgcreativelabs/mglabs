import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const VALID_CATEGORIES = ["general", "showcase", "help", "resources", "jobs"];

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "You need to sign in to post." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const content = typeof body?.content === "string" ? body.content.trim() : "";
  const category = typeof body?.category === "string" ? body.category : "general";

  if (!title || title.length < 5) {
    return NextResponse.json({ error: "Title must be at least 5 characters." }, { status: 400 });
  }
  if (!content || content.length < 10) {
    return NextResponse.json({ error: "Post content must be at least 10 characters." }, { status: 400 });
  }
  if (!VALID_CATEGORIES.includes(category)) {
    return NextResponse.json({ error: "Invalid category." }, { status: 400 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!profile) {
    return NextResponse.json({ error: "Profile not found." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("community_posts")
    .insert({
      title,
      content,
      category,
      tags: [],
      author_id: profile.id,
      is_pinned: false,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ post: data }, { status: 201 });
}
