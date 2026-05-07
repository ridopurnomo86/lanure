import { db } from "@/db";
import { product } from "@/db/schema";
import HomePage from "@/views/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lanure - Skincare & Kosmetik Mewah Indonesia",
  description:
    "Temukan koleksi skincare dan kosmetik mewah terbaik di Lanure. Belanja serum, moisturizer, dan produk kecantikan Korea terlaris dengan penawaran eksklusif.",
  keywords: [
    "skincare indonesia",
    "kosmetik mewah",
    "serum terbaik",
    "lanure skincare",
    "perawatan wajah",
  ],
  openGraph: {
    title: "Lanure - Destinasi Kecantikan Mewah Anda",
    description:
      "Koleksi skincare premium dan kosmetik pilihan untuk kulit sehat bercahaya.",
    url: "https://lanure.pages.dev",
    siteName: "Lanure Indonesia",
    images: [
      {
        url: "/images/hero-og.png", // Assuming we might have or will have an OG image
        width: 1200,
        height: 630,
        alt: "Lanure Skincare & Cosmetics",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lanure - Skincare & Kosmetik Mewah",
    description:
      "Belanja produk kecantikan terbaik dengan penawaran spesial di Lanure.",
    images: ["/images/hero-og.png"],
  },
};

export default async function Home() {
  const products = await db.select().from(product);

  return <HomePage />;
}
