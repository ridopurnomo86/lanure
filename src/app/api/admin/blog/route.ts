import { NextResponse } from "next/server";
import { db } from "@/db";
import { blogPost } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      title,
      slug,
      author,
      category,
      excerpt,
      content,
      image,
      tags,
      date,
    } = data;

    if (!title || !slug || !author || !category || !content || !image) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    await db.insert(blogPost).values({
      title,
      slug,
      author,
      category,
      excerpt,
      content,
      image,
      tags: tags || [],
      date: date || new Date().toISOString().split("T")[0],
    });

    revalidatePath("/blog");
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error adding blog post:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const posts = await db.select().from(blogPost).orderBy(blogPost.createdAt);
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
