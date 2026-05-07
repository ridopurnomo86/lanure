import { BLOG_POSTS } from "@/data/blog-posts";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Calendar, User, ChevronLeft, Share2 } from "lucide-react";
import Link from "next/link";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} - Lanure Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) notFound();

  // Article JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.image,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    description: post.excerpt,
  };

  return (
    <article className="max-w-[800px] mx-auto px-4 md:px-8 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-ceramide-text-muted hover:text-ceramide-text-dark transition-colors mb-12">
        <ChevronLeft className="w-4 h-4" /> Kembali ke Blog
      </Link>

      <div className="space-y-8">
        <div className="space-y-4">
          <span className="bg-[#FDE2E4] text-ceramide-text-dark text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-ceramide-text-dark leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-ceramide-text-muted pt-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </div>
          </div>
        </div>

        <div className="relative aspect-[2/1] rounded-[32px] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div 
          className="prose prose-lg max-w-none prose-serif prose-headings:font-serif prose-headings:text-ceramide-text-dark prose-p:text-ceramide-text-muted prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="pt-12 border-t border-gray-100 mt-16">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs font-bold text-ceramide-text-muted bg-gray-100 px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
            <button className="flex items-center gap-2 text-sm font-bold text-ceramide-text-dark hover:opacity-70 transition-opacity">
              <Share2 className="w-4 h-4" /> Bagikan
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
