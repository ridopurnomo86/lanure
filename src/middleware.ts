import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith("/admin")) {
    const adminToken = request.cookies.get("admin_token")?.value;

    // For simplicity, we check against a secret.
    // In production, this should be a proper JWT or session.
    const secret = process.env.ADMIN_SECRET;

    if (!adminToken || !secret || adminToken !== secret) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
