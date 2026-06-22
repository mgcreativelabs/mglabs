// =============================================
// PROXY — src/proxy.ts
// (Renamed from middleware.ts — Next.js 16 deprecated the
// "middleware" file convention in favor of "proxy". Same
// behavior, new name. See: nextjs.org/docs/messages/middleware-to-proxy)
// Session refresh + route protection
// =============================================
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
