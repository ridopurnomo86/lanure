import { NextResponse } from "next/server";
import { db } from "@/db";
import { product, productImage, productVideo } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, slug, brand, category, price, image, description, affiliateUrl, shortDesc, images, videos } = data;

    if (!name || !slug || !image || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const productId = crypto.randomUUID();

    await db.insert(product).values({
      id: productId,
      name,
      slug,
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

    if (images && images.length > 0) {
      await db.insert(productImage).values(
        images.map((url: string, index: number) => ({
          productId,
          url,
          order: index,
        }))
      );
    }

    if (videos && videos.length > 0) {
      await db.insert(productVideo).values(
        videos.map((v: any) => ({
          productId,
          url: v.url,
          type: v.type,
        }))
      );
    }

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
