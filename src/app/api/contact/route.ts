import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // --- Validation ---
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // --- Send via Resend (production) ---
    // To activate: add RESEND_API_KEY to .env.local and install: npm i resend
    //
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from:    "MG Creative Labs <noreply@mgcreativelabs.com>",
    //   to:      ["hello@mgcreativelabs.com"],
    //   replyTo: email,
    //   subject: `[Contact] ${subject || "New message"} — from ${name}`,
    //   html: `
    //     <h2>New contact form submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Subject:</strong> ${subject || "—"}</p>
    //     <hr />
    //     <p>${message.replace(/\n/g, "<br/>")}</p>
    //   `,
    // });

    // --- Log in dev until Resend is wired ---
    if (process.env.NODE_ENV === "development") {
      console.log("📬 Contact form submission:", { name, email, subject, message });
    }

    return NextResponse.json(
      { success: true, message: "Message received. We'll get back to you within 24 hours." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
