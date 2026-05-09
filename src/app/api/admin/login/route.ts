import { NextResponse } from "next/server";
import { db } from "@/db";
import { admin } from "@/db/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcrypt-ts";
import { login } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find admin by email
    const adminUser = await db.query.admin.findFirst({
      where: eq(admin.email, email),
    });

    if (!adminUser) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await compare(password, adminUser.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Set JWT cookie
    await login(adminUser.id);

    return NextResponse.json({ success: true, message: "Login successful" });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
