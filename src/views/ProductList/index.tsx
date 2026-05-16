"use client";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ProductCard from "./components/ProductCard";
import { MOCK_PRODUCTS } from "@/data/products";
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const ProductListView = () => (
  <main className="bg-white min-h-screen">
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8">
      <Header productCount={MOCK_PRODUCTS.length} />

      <div className="flex flex-col lg:flex-row gap-12 pt-4">
        {/* Sidebar */}
        <aside className="w-full lg:w-[280px] shrink-0">
          <Sidebar />
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
          >
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

            {/* Duplicate for demo to fill the grid as seen in the image */}
            {MOCK_PRODUCTS.map((product, i) => (
              <ProductCard key={product.id + "-dup-" + i} product={product} />
            ))}
          </motion.div>

          {/* Back to Top Button */}
          <div className="flex justify-end mt-20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-12 h-12 border border-gray-200 flex items-center justify-center hover:border-gray-400 transition-colors"
            >
              <ChevronUp className="w-5 h-5 text-gray-400" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  </main>
);

export default ProductListView;
