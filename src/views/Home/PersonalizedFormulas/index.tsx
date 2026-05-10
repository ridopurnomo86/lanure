"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const PersonalizedFormulas = () => (
  <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden mb-12">
    {/* Background Image */}
    <Image
      src="https://images.unsplash.com/photo-1728848901352-cff8d51d3e24?q=100&w=1470h=700&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Personalized Skincare"
      fill
      className="object-cover object-center"
      priority
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/15 flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl space-y-4"
      >
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
          Personalized Formulas Tailored <br className="hidden md:block" /> Just
          for You
        </h2>

        <p className="text-white text-base md:text-lg max-w-2xl mx-auto font-medium opacity-90">
          Our formulas are carefully crafted to work best for you, with only the
          essential ingredients needed for great results.
        </p>

        <div className="pt-4">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#d94132" }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-ceramide-red text-white rounded-lg text-sm font-bold shadow-2xl transition-all uppercase tracking-widest"
          >
            Shop Now
          </motion.button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default PersonalizedFormulas;
