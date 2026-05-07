import { NextResponse } from "next/server";
import type { NextRequest } from "next/request";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith("/admin")) {
    const adminToken = request.cookies.get("admin_token")?.value;

    // For simplicity, we check against a secret.
    // In production, this should be a proper JWT or session.
    if (adminToken !== process.env.ADMIN_SECRET) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
