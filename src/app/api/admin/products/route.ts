import { NextResponse } from "next/server";
import { db } from "@/db";
import { product } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, brand, category, price, image, description, affiliateUrl, shortDesc } = data;

    if (!name || !image || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await db.insert(product).values({
      id: crypto.randomUUID(),
      name,
      brand,
      category,
      price: parseInt(price),
      image,
      description,
      affiliateUrl,
      shortDesc,
      rating: 0,
      reviewCount: 0,
      inStock: true,
      commissionRate: 0,
    });

    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
