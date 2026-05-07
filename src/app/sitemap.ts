import { MetadataRoute } from 'next';
import { db } from '@/db';
import { product } from '@/db/schema';
import { BLOG_POSTS } from '@/data/blog-posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lanure.pages.dev'; // Replace with actual production URL

  // Fetch all products for dynamic URLs
  const products = await db.select({ id: product.id }).from(product);
  
  const productUrls = products.map((p) => ({
    url: `${baseUrl}/product/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Blog post URLs
  const blogUrls = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Add static pages
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ];

  return [...staticUrls, ...productUrls, ...blogUrls];
}
