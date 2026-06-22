// =============================================
// CONTACT API — src/app/api/contact/route.ts
// Previously validated input then returned a fake
// success response without persisting anything.
// Now writes to contact_messages table (RLS allows
// anon inserts) so admins can see real submissions.
// =============================================

import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const subject = typeof body?.subject === "string" ? body.subject.trim() : null;
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!message || message.length < 10) {
    return NextResponse.json({ error: "Message must be at least 10 characters." }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert({
    name,
    email,
    subject: subject || null,
    message,
  });

  if (error) {
    // Don't leak DB error details to the client
    console.error("Contact form DB error:", error.message);
    return NextResponse.json(
      { error: "Something went wrong. Please email us directly at mgcreativelabs@technologist.com" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
