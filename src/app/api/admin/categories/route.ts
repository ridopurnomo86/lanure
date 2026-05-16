import { NextResponse } from "next/server";
import { db } from "@/db";
import { category } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const categories = await db.select().from(category).orderBy(category.label);
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { label, slug, image, isSpecial } = data;

    if (!label || !slug || !image) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await db.insert(category).values({
      label,
      slug,
      image,
      isSpecial: isSpecial || false,
    });

    revalidatePath("/admin");
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error adding category:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
