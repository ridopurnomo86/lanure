import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "default_secret_key_change_me"
);

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // 1. Skip middleware for the login page and API login route
  if (path === "/admin/login" || path === "/api/admin/login") {
    return NextResponse.next();
  }

  // 2. Protect all /admin routes
  if (path.startsWith("/admin")) {
    const adminToken = request.cookies.get("admin_token")?.value;

    if (!adminToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      // Verify JWT
      await jwtVerify(adminToken, secret, {
        algorithms: ["HS256"],
      });
      return NextResponse.next();
    } catch (error) {
      // Token invalid or expired
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
