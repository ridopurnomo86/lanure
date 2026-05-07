import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { DAILY_PROMO, ESSENTIAL_PRODUCTS } from "./data";
import Image from "next/image";

const DailyEssentials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-5xl font-serif text-ceramide-text-dark">
              Daily Essentials
            </h2>
            <p className="text-ceramide-text-muted">
              Temukan semua kebutuhan harian untuk menunjang rutinitas Anda.
            </p>
          </div>
          <a
            href="/shop"
            className="flex items-center gap-1 text-sm font-bold text-ceramide-text-dark hover:opacity-70 transition-opacity"
          >
            Belanja Semua Produk <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-12 snap-x snap-mandatory"
          >
            {/* Promo Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="min-w-[280px] sm:min-w-[320px] md:min-w-[400px] h-[450px] md:h-[550px] relative rounded-[24px] overflow-hidden snap-start shrink-0"
            >
              <Image
                width={600}
                height={800}
                src={DAILY_PROMO.image}
                alt={DAILY_PROMO.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative h-full p-10 flex flex-col justify-start items-start text-white">
                <p className="font-serif italic text-xl mb-2">
                  {DAILY_PROMO.subtitle}
                </p>
                <h3 className="text-4xl md:text-5xl font-serif leading-tight mb-auto">
                  Untuk Set <br /> Liburan
                </h3>
                <button
                  type="button"
                  className="flex items-center gap-2 text-sm font-bold hover:underline"
                >
                  Explore Now <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Product Cards */}
            {ESSENTIAL_PRODUCTS.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="min-w-[240px] sm:min-w-[300px] md:max-w-[370px] h-full group snap-start shrink-0"
              >
                <div className="relative aspect-[4/5] bg-[#F8F8F8] rounded-[24px] overflow-hidden mb-4 flex items-center justify-center p-6 md:p-8">
                  {product.tags.includes("New") && (
                    <span className="absolute top-4 left-4 bg-[#6A9A8A] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                      New
                    </span>
                  )}

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      type="button"
                      className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-md text-ceramide-text-dark hover:bg-ceramide-text-dark hover:text-white transition-colors"
                    >
                      <Search className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%]">
                      <button
                        type="button"
                        className="w-full py-4 bg-white rounded-full text-sm font-bold text-ceramide-text-dark shadow-lg hover:bg-ceramide-text-dark hover:text-white transition-all transform hover:scale-105"
                      >
                        Choose Options
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 px-2">
                  <p className="text-[10px] font-bold text-ceramide-text-muted uppercase tracking-widest">
                    {product.category}
                  </p>
                  <h3 className="text-xl font-serif text-ceramide-text-dark group-hover:text-ceramide-text-muted transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold text-ceramide-text-dark">
                    ${(product.price / 100).toFixed(2)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Progress Bar */}
            <div className="w-48 h-[2px] bg-gray-100 relative rounded-full">
              <motion.div
                className="absolute left-0 top-0 h-full bg-ceramide-text-dark rounded-full"
                animate={{
                  width: `${((currentIndex + 1) / ESSENTIAL_PRODUCTS.length) * 100}%`,
                }}
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => scroll("left")}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyEssentials;
