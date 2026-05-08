"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
}: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: MouseEvent | TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = "touches" in event ? event.touches[0].clientX : event.clientX;
    const position = ((x - rect.left) / rect.width) * 100;

    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  useEffect(() => {
    const onUp = () => setIsDragging(false);
    
    if (isDragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", onUp);
      window.addEventListener("touchmove", handleMove);
      window.addEventListener("touchend", onUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [isDragging]);

  const onMouseDown = () => setIsDragging(true);
  const onTouchStart = () => setIsDragging(true);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video md:aspect-[21/9] rounded-[32px] overflow-hidden cursor-ew-resize select-none group"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >

      {/* After Image (Full Background) */}
      <div className="absolute inset-0">
        <img
          src={afterImage}
          alt="After"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-8 right-8">
          <span className="text-ceramide-text-dark font-serif text-xl md:text-3xl font-medium bg-white/20 backdrop-blur-md px-6 py-2 rounded-full">
            {afterLabel}
          </span>
        </div>
      </div>

      {/* Before Image (Clipped overlay) */}
      <div
        className="absolute inset-0 z-10"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt="Before"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-8 left-8">
          <span className="text-ceramide-text-dark font-serif text-xl md:text-3xl font-medium bg-white/20 backdrop-blur-md px-6 py-2 rounded-full">
            {beforeLabel}
          </span>
        </div>
      </div>

      {/* Slider Line & Handle */}
      <div
        className="absolute inset-y-0 z-20 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute inset-y-0 -left-px w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.3)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-[0_0_20px_rgba(0,0,0,0.2)] flex items-center justify-center border-4 border-white pointer-events-auto">
          <div className="flex gap-1">
            <div className="w-1 h-5 bg-[#6A9A8A] rounded-full" />
            <div className="w-1 h-5 bg-[#6A9A8A] rounded-full" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default BeforeAfterSlider;
