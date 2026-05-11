import { db } from "@/db";
import { product } from "@/db/schema";
import { eq, ne, and } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProductDetail from "@/views/product/ProductDetail";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;

  // Try to get from DB, otherwise use fallback for metadata
  const [item] = await db.select().from(product).where(eq(product.id, id));

  if (!item && id !== "lumera-clay-mask") return { title: "Product Not Found" };

  const name = item?.name || "Luméra Pore Refining Clay Mask";
  const brand = item?.brand || "Luméra";
  const shortDesc =
    item?.shortDesc || "Refresh and detoxify with Luméra Clay Mask.";

  return {
    title: `${name} | ${brand} - Lanure`,
    description: shortDesc,
    openGraph: {
      title: name,
      description: shortDesc,
      images: [{ url: item?.image || "/product_main.png" }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  let item;
  try {
    item = await db.query.product.findFirst({
      where: eq(product.id, id),
      with: {
        images: {
          orderBy: (images, { asc }) => [asc(images.order)],
        },
      },
    });
  } catch (e) {
    console.error("DB error:", e);
  }

  // If no item found in DB, we'll use a mock item for demonstration
  if (!item) {
    item = {
      id: id,
      name: "Luméra Pore Refining Clay Mask",
      brand: "Luméra",
      category: "Face Masks",
      price: 12800, // $128.00
      originalPrice: 16000,
      rating: 4.9,
      reviewCount: 5200,
      image: "/product_main.png",
      affiliateUrl: "#",
      description:
        "Experience nature's purity with Luméra Refining Clay Mask—detoxify, tighten, and refresh your skin with soothing lavender and kaolin clay. Perfect for your weekly routine.",
      shortDesc:
        "Refresh and detoxify with Luméra Clay Mask. Soothing lavender and kaolin clay for smooth, clear skin.",
      ingredients:
        "Water, Kaolin, Glycerin, Bentonite, Butylene Glycol, Caprylic/Capric Triglyceride, Lavender Extract, Phenoxyethanol, Ethylhexylglycerin...",
      howToUse:
        "Apply an even layer to clean, dry skin. Leave on for 10-15 minutes or until the mask is dry. Rinse thoroughly with lukewarm water. Use 1-2 times a week for best results.",
      skinTypes: ["All Skin Types", "Oily", "Combination"],
      tags: ["Detox", "Pore Refining", "Lavender"],
      volume: "100ml",
      inStock: true,
      commissionRate: 0.1,
      images: [
        { url: "/product_main.png", order: 1 },
        { url: "/product_texture.png", order: 2 },
        { url: "/product_main.png", order: 3 },
        { url: "/product_texture.png", order: 4 },
      ],
    };
  }

  // Fetch related products
  let relatedProducts = [];
  try {
    relatedProducts = await db
      .select()
      .from(product)
      .where(ne(product.id, id))
      .limit(4);
  } catch (e) {
    console.error("Related products DB error:", e);
  }

  // If no related products in DB, use mock ones
  if (relatedProducts.length === 0) {
    relatedProducts = [
      {
        id: "related-1",
        name: "NEOVA DNA Repair",
        brand: "NEOVA",
        price: 8500,
        image: "/product_related.png",
      },
      {
        id: "related-2",
        name: "NEOVA Cu3 Lip Repair",
        brand: "NEOVA",
        price: 4500,
        image: "/product_related.png",
      },
      {
        id: "related-3",
        name: "NEOVA Silc Sheer 2.0",
        brand: "NEOVA",
        price: 6200,
        image: "/product_related.png",
      },
      {
        id: "related-4",
        name: "NEOVA Illuminating Serum",
        brand: "NEOVA",
        price: 9800,
        image: "/product_related.png",
      },
    ];
  }

  return (
    <ProductDetail
      product={item as any}
      relatedProducts={relatedProducts as any}
    />
  );
}
