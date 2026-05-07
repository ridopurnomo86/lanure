import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import BLOG_POSTS from "./data";

const Blog = () => (
  <section className="py-20 px-4 md:px-8 bg-white">
    <div className="max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-end mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif text-ceramide-text-dark"
        >
          Postingan Blog
        </motion.h2>
        <motion.a
          href="/blog"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-1 text-sm font-medium text-ceramide-text-dark hover:opacity-70 transition-opacity"
        >
          Lihat Semua Postingan <ChevronRight className="w-4 h-4" />
        </motion.a>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative aspect-[1.5/1] overflow-hidden rounded-[20px] mb-6">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="space-y-3">
              <h3 className="text-2xl font-serif text-ceramide-text-dark leading-tight group-hover:text-ceramide-text-muted transition-colors">
                {post.title}
              </h3>
              <div className="flex items-center gap-2 text-xs font-medium text-ceramide-text-muted uppercase tracking-wider">
                <span>{post.date}</span>
                <span className="w-1 h-1 rounded-full bg-ceramide-text-muted" />
                <span>{post.author}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Blog;
