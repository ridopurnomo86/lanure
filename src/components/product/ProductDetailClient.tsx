"use client";

import React, { useState } from "react";
import { 
  Star, 
  Minus, 
  Plus, 
  ShoppingBag, 
  ChevronDown, 
  ChevronUp, 
  Share2, 
  Heart,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/db/schema";
import { cn } from "@/lib/utils";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

const Accordion = ({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group"
      >
        <span className="text-lg font-serif font-medium text-ceramide-text-dark">{title}</span>
        {isOpen ? <Minus className="w-5 h-5 text-gray-400" /> : <Plus className="w-5 h-5 text-gray-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-2 text-ceramide-text-muted leading-relaxed text-sm">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [activeImage, setActiveImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState<"one-time" | "subscribe">("one-time");
  const [subscriptionFrequency, setSubscriptionFrequency] = useState("Every Month");

  const images = [
    "/product_main.png",
    "/product_texture.png",
    "/product_main.png",
    "/product_texture.png",
  ];

  const savings = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 20;

  return (
    <div className="min-h-screen bg-[#FDFCF7]">
      {/* Announcement Bar */}
      <div className="bg-black text-white py-3 px-4 text-center text-[10px] md:text-xs font-medium tracking-widest uppercase flex items-center justify-center gap-4">
        <span>Discount 20% for this product! Check out now!</span>
        <span className="bg-white/20 px-2 py-0.5 rounded">18:36</span>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs md:text-sm text-ceramide-text-muted mb-8 md:mb-12">
          <a href="/" className="hover:text-ceramide-text-dark transition-colors">Home</a>
          <span className="text-gray-300">•</span>
          <a href="/shop" className="hover:text-ceramide-text-dark transition-colors capitalize">Shop</a>
          <span className="text-gray-300">•</span>
          <span className="text-ceramide-text-dark font-medium capitalize">Face Masks</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left: Image Gallery */}
          <div className="space-y-6">
            <motion.div 
              className="aspect-square bg-white rounded-3xl overflow-hidden shadow-sm flex items-center justify-center p-8 md:p-12 relative group"
            >
              <img
                src={activeImage === product.image ? "/product_main.png" : activeImage}
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
            
            <div className="grid grid-cols-4 gap-3 md:gap-4">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={cn(
                    "aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 bg-white",
                    activeImage === img || (activeImage === product.image && i === 0) ? "border-ceramide-text-dark shadow-md" : "border-transparent opacity-60 hover:opacity-100 hover:border-gray-200"
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-ceramide-text-dark leading-tight mb-4">
                Luméra Pore Refining Clay Mask
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4 fill-current",
                        i < 4 ? "text-orange-400" : "text-orange-400/50"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-ceramide-text-muted font-medium">
                  (4.9) 5k+ Reviews
                </span>
              </div>

              <p className="text-ceramide-text-muted leading-relaxed mb-8 max-w-xl text-sm md:text-base">
                Refresh and detoxify with Luméra Clay Mask. Soothing lavender and kaolin clay for smooth, clear skin.
              </p>

              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-3xl md:text-4xl font-bold text-ceramide-text-dark">
                  $128
                </span>
                <span className="text-xl text-ceramide-text-muted line-through font-light">
                  $160
                </span>
                <span className="bg-black text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                  Save 20%
                </span>
              </div>
            </div>

            {/* Purchase Options */}
            <div className="space-y-4 mb-8">
              <div 
                onClick={() => setPurchaseType("one-time")}
                className={cn(
                  "flex items-center justify-between p-5 rounded-2xl border transition-all",
                  purchaseType === "one-time" ? "border-gray-300 bg-white shadow-sm ring-1 ring-gray-200" : "border-gray-100 hover:border-gray-200"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                    purchaseType === "one-time" ? "border-ceramide-text-dark" : "border-gray-300"
                  )}>
                    {purchaseType === "one-time" && <div className="w-2.5 h-2.5 rounded-full bg-ceramide-text-dark" />}
                  </div>
                  <span className="text-sm font-medium text-ceramide-text-dark">One Time Purchase</span>
                </div>
                <span className="font-bold text-ceramide-text-dark">$128</span>
              </div>

              <div 
                onClick={() => setPurchaseType("subscribe")}
                className={cn(
                  "p-5 rounded-2xl border transition-all",
                  purchaseType === "subscribe" ? "border-gray-300 bg-white shadow-sm ring-1 ring-gray-200" : "border-gray-100 hover:border-gray-200"
                )}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                      purchaseType === "subscribe" ? "border-ceramide-text-dark" : "border-gray-300"
                    )}>
                      {purchaseType === "subscribe" && <div className="w-2.5 h-2.5 rounded-full bg-ceramide-text-dark" />}
                    </div>
                    <span className="text-sm font-medium text-ceramide-text-dark">Subscribe to save 25%</span>
                  </div>
                  <span className="font-bold text-ceramide-text-dark">$120</span>
                </div>
                
                {purchaseType === "subscribe" && (
                  <div className="relative">
                    <select 
                      value={subscriptionFrequency}
                      onChange={(e) => setSubscriptionFrequency(e.target.value)}
                      className="w-full pl-4 pr-10 py-3 bg-gray-50 rounded-xl text-sm appearance-none focus:outline-none border border-gray-100"
                    >
                      <option>Every Month</option>
                      <option>Every 2 Months</option>
                      <option>Every 3 Months</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                )}
              </div>
            </div>

            {/* Quantity and CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 min-w-[120px]">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-ceramide-text-dark hover:opacity-50 transition-opacity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-medium text-ceramide-text-dark w-8 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-ceramide-text-dark hover:opacity-50 transition-opacity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <button className="flex-grow bg-ceramide-text-dark text-white rounded-lg py-4 px-8 font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all active:scale-[0.98]">
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
            </div>

          <p className="text-center text-xs text-ceramide-text-muted mb-12">
            Sign up and get a FREE Toner with your first purchase. <a href="#" className="font-bold underline text-ceramide-text-dark">Sign Up</a>
          </p>

          {/* Accordions */}
          <div className="border-t border-gray-100">
            <Accordion title="Benefits">
              <ul className="list-disc pl-5 space-y-2">
                <li>Deeply cleanses and refines pores</li>
                <li>Detoxifies skin from impurities and pollutants</li>
                <li>Soothes and calms with lavender extract</li>
                <li>Leaves skin feeling smooth and revitalized</li>
              </ul>
            </Accordion>
            <Accordion title="Ingredients">
              <p>{product.ingredients as string || "Water, Kaolin, Glycerin, Bentonite, Butylene Glycol, Caprylic/Capric Triglyceride, Lavender Extract, Phenoxyethanol, Ethylhexylglycerin..."}</p>
            </Accordion>
            <Accordion title="How to Use">
              <p>{product.howToUse || "Apply an even layer to clean, dry skin. Leave on for 10-15 minutes or until the mask is dry. Rinse thoroughly with lukewarm water. Use 1-2 times a week for best results."}</p>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-24 md:mt-32">
        <h2 className="text-3xl md:text-4xl font-serif text-ceramide-text-dark text-center mb-12">
          You May Also Like
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {relatedProducts.map((p) => (
            <motion.a
              key={p.id}
              href={`/product/${p.id}`}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="aspect-[3/4] bg-white rounded-3xl overflow-hidden mb-4 p-6 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <p className="text-[10px] text-ceramide-text-muted uppercase tracking-widest mb-1">{p.brand}</p>
              <h3 className="font-serif text-ceramide-text-dark group-hover:underline line-clamp-1 mb-1">{p.name}</h3>
              <p className="font-bold text-ceramide-text-dark text-sm">${(p.price / 100).toFixed(0)}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
