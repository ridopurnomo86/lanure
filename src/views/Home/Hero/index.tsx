import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import SLIDES from "./data";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex(
      (prevIndex) => (prevIndex + newDirection + SLIDES.length) % SLIDES.length,
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const currentSlide = SLIDES[currentIndex];

  return (
    <section className="relative w-full overflow-hidden px-4 md:px-8 py-4 min-h-[600px] flex items-center">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row items-center gap-8 md:gap-16"
        >
          {/* Left Column */}
          <div className="flex-1 space-y-6 md:space-y-8 z-10">
            <div className="space-y-2">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-ceramide-text-muted italic font-serif text-lg"
              >
                Nikmati Penawarannya
              </motion.p>
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-7xl font-serif text-ceramide-text-dark leading-[1.1] font-medium"
              >
                {currentSlide.title} <br />
                <span className="relative">
                  {currentSlide.subtitle}
                  <span className="absolute inset-0 text-gray-200/50 -z-10 translate-x-2 translate-y-2 blur-[1px]">
                    {currentSlide.subtitle}
                  </span>
                </span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-ceramide-text-muted text-sm md:text-base max-w-sm leading-relaxed"
            >
              {currentSlide.description}
            </motion.p>

            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              type="button"
              className="px-10 py-4 bg-ceramide-btn-gray text-white rounded-full text-sm font-bold shadow-lg hover:opacity-90 transition-all"
            >
              {currentSlide.buttonText}
            </motion.button>

            {/* Navigation Controls */}
            <div className="flex items-center gap-6 pt-4">
              <ChevronLeft
                className="w-5 h-5 text-ceramide-text-dark cursor-pointer hover:opacity-50 transition-opacity"
                onClick={() => paginate(-1)}
              />
              <div className="flex items-center gap-3">
                {SLIDES.map((_, idx) => (
                  <motion.div
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    className={cn(
                      "rounded-full cursor-pointer transition-all duration-300",
                      idx === currentIndex
                        ? "w-4 h-1.5 bg-ceramide-btn-gray"
                        : "w-1.5 h-1.5 bg-gray-300",
                    )}
                    animate={{
                      width: idx === currentIndex ? 16 : 6,
                      backgroundColor:
                        idx === currentIndex ? "#B0B9BE" : "#D1D5DB",
                    }}
                  />
                ))}
              </div>
              <ChevronRight
                className="w-5 h-5 text-ceramide-text-dark cursor-pointer hover:opacity-50 transition-opacity"
                onClick={() => paginate(1)}
              />
            </div>
          </div>

          {/* Right Column: Product Image */}
          <div className="flex-[1.2] relative h-[400px] md:h-[500px] w-full">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="rounded-[40px] overflow-hidden aspect-[1.4/1] relative group h-full"
              style={{ backgroundColor: currentSlide.bgColor }}
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/soft-wallpaper.png')] opacity-20 pointer-events-none" />
              <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent pointer-events-none" />

              <motion.img
                key={currentSlide.image}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                src={currentSlide.image}
                alt={currentSlide.label}
                className="w-full h-full object-cover mix-blend-multiply"
              />
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Hero;
