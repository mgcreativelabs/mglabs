"use server";

import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject is too short"),
  message: z.string().min(10, "Message is too short").max(2000, "Message is too long"),
});

export type ContactState = {
  success?: boolean;
  error?: string;
};

export async function submitContactForm(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const validatedFields = ContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
   return { error: validatedFields.error.issues[0]?.message || "Invalid input." };  }

  const { name, email, subject, message } = validatedFields.data;

  // TODO: Here you can save to Supabase or send an email via Resend/SendGrid
  console.log("New Contact Form Submission:", { name, email, subject, message });

  // Simulate network delay for UX
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true };
}