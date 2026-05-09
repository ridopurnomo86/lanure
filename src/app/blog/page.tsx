import { BLOG_POSTS } from "@/data/blog-posts";
import Link from "next/link";
import { ChevronRight, Calendar, User } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog Skincare & Kecantikan - Lanure",
  description:
    "Dapatkan tips terbaru, review produk, dan rekomendasi skincare terbaik untuk kulit sehat Anda.",
};

export default function BlogListingPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-5xl md:text-6xl font-serif text-ceramide-text-dark">
          Blog Kami
        </h1>
        <p className="text-ceramide-text-muted max-w-2xl mx-auto">
          Temukan rahasia kulit sehat bercahaya melalui artikel informatif kami.
          Dari tips harian hingga review mendalam.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {BLOG_POSTS.map((post) => (
          <article key={post.slug} className="group cursor-pointer">
            <Link href={`/blog/${post.slug}`}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] mb-6">
                <Image
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-ceramide-text-dark text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-[11px] font-bold text-ceramide-text-muted uppercase tracking-widest">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-3 h-3" />
                    {post.author}
                  </span>
                </div>

                <h2 className="text-2xl font-serif text-ceramide-text-dark leading-tight group-hover:text-ceramide-text-muted transition-colors">
                  {post.title}
                </h2>

                <p className="text-ceramide-text-muted text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-1 text-sm font-bold text-ceramide-text-dark group-hover:translate-x-1 transition-transform">
                  Baca Selengkapnya <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
