"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/db/schema";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] bg-[#F3F4F6] rounded-2xl overflow-hidden mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {discount > 0 && (
            <div className="absolute top-4 left-4 bg-[#E23E27] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
              {discount}% OFF
            </div>
          )}

          {/* Quick Shop Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-end justify-center p-6">
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white text-black py-3 rounded-full text-xs font-bold shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0"
            >
              Quick Shop
            </motion.button>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">
            {product.brand}
          </p>
          <h3 className="text-xl font-serif text-[#1A1A1A] leading-tight group-hover:text-ceramide-red transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 pt-1">
            <span className={cn(
              "text-base font-medium",
              discount > 0 ? "text-[#E23E27]" : "text-[#1A1A1A]"
            )}>
              ${(product.price / 100).toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${(product.originalPrice / 100).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
