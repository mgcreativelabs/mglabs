import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "12");
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const difficulty = searchParams.get("difficulty");
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query = (supabase as any).from("prompts").select("*", { count: "exact" })
    .eq("is_public", true).order("created_at", { ascending: false });
  if (category && category !== "all") query = query.eq("category", category);
  if (difficulty && difficulty !== "all") query = query.eq("difficulty", difficulty);
  if (search) query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
  const from = (page - 1) * pageSize;
  query = query.range(from, from + pageSize - 1);
  const { data, error, count } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data, total: count || 0, page, pageSize, hasMore: (count || 0) > page * pageSize });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any).from("prompts")
    .insert({ ...body, author_id: user.id }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data, { status: 201 });
}
