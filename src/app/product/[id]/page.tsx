import { db } from "@/db";
import { product } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import { ShoppingBag, Star, ChevronRight, ShieldCheck, Truck, RefreshCw } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const [item] = await db.select().from(product).where(eq(product.id, id));

  if (!item) return { title: "Product Not Found" };

  return {
    title: `${item.name} | ${item.brand} - Lanure`,
    description: item.shortDesc,
    openGraph: {
      title: item.name,
      description: item.shortDesc,
      images: [{ url: item.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: item.name,
      description: item.shortDesc,
      images: [item.image],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const [item] = await db.select().from(product).where(eq(product.id, id));

  if (!item) notFound();

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    image: item.image,
    description: item.description,
    brand: {
      "@type": "Brand",
      name: item.brand,
    },
    offers: {
      "@type": "Offer",
      url: `https://lanure.pages.dev/product/${id}`,
      priceCurrency: "IDR",
      price: item.price / 100, // Assuming price is in cents for precision
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: item.rating,
      reviewCount: item.reviewCount,
    },
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-ceramide-text-muted mb-8">
        <a href="/" className="hover:text-ceramide-text-dark transition-colors">Beranda</a>
        <ChevronRight className="w-4 h-4" />
        <span className="capitalize">{item.category}</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-ceramide-text-dark font-medium">{item.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-[#F8F8F8] rounded-[32px] overflow-hidden flex items-center justify-center p-12">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>
          {/* Multi-image placeholders if needed */}
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer hover:border-ceramide-text-dark transition-colors overflow-hidden p-2">
                <img src={item.image} alt="" className="w-full h-full object-contain opacity-50" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-ceramide-red/10 text-ceramide-red text-[10px] font-bold rounded-full uppercase tracking-wider">
                Terlaris
              </span>
              <p className="text-sm font-bold text-ceramide-text-muted uppercase tracking-widest">{item.brand}</p>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-ceramide-text-dark leading-tight">
              {item.name}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 fill-current ${i >= Math.floor(item.rating) ? 'text-gray-200' : ''}`} />
                ))}
              </div>
              <span className="text-sm text-ceramide-text-muted font-medium">({item.reviewCount} ulasan)</span>
            </div>
            <p className="text-3xl font-bold text-ceramide-text-dark">
              Rp {(item.price / 100).toLocaleString('id-ID')}
            </p>
          </div>

          <p className="text-ceramide-text-muted leading-relaxed">
            {item.description}
          </p>

          <div className="pt-4 space-y-4">
            <a
              href={item.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-ceramide-btn-gray text-white py-5 rounded-full font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all transform hover:scale-[1.02] shadow-xl"
            >
              <ShoppingBag className="w-5 h-5" />
              Beli di Shopee
            </a>
            <p className="text-center text-xs text-ceramide-text-muted">
              *Anda akan diarahkan ke toko resmi Shopee
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
            <div className="flex flex-col items-center text-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#6A9A8A]" />
              <p className="text-xs font-bold uppercase tracking-wider">100% Original</p>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Truck className="w-6 h-6 text-[#6A9A8A]" />
              <p className="text-xs font-bold uppercase tracking-wider">Gratis Ongkir</p>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <RefreshCw className="w-6 h-6 text-[#6A9A8A]" />
              <p className="text-xs font-bold uppercase tracking-wider">Mudah Diretur</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
