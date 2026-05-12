"use client";

import Accordion from "@/components/core/Accordion";
import { useState } from "react";
import { Check } from "lucide-react";

const ProductTypeFilter = [
  { label: "Body Lotions", count: 2 },
  { label: "Creams", count: 4 },
  { label: "Foundation", count: 3 },
  { label: "Lips", count: 3 },
  { label: "Mascara", count: 2 },
  { label: "Serums & Oils", count: 3 },
  { label: "Shampoo", count: 2 },
];

const AvailabilityFilter = [
  { label: "In stock", count: 19 },
  { label: "Out of stock", count: 0 },
];

const Sidebar = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 109]);

  return (
    <div className="w-full space-y-2">
      <Accordion title="Product Type" defaultOpen>
        <div className="space-y-3 pt-2">
          {ProductTypeFilter.map((type) => (
            <label key={type.label} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border transition-colors flex items-center justify-center ${
                  selectedTypes.includes(type.label) ? "bg-black border-black" : "border-gray-200 group-hover:border-gray-400"
                }`}>
                  {selectedTypes.includes(type.label) && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
                <span className="text-sm text-gray-600 font-medium">{type.label}</span>
              </div>
              <span className="text-xs text-gray-400">{type.count}</span>
              <input 
                type="checkbox" 
                className="hidden" 
                checked={selectedTypes.includes(type.label)}
                onChange={() => {
                  setSelectedTypes(prev => 
                    prev.includes(type.label) 
                      ? prev.filter(t => t !== type.label) 
                      : [...prev, type.label]
                  );
                }}
              />
            </label>
          ))}
        </div>
      </Accordion>

      <Accordion title="Availability" defaultOpen>
        <div className="space-y-3 pt-2">
          {AvailabilityFilter.map((item) => (
            <label key={item.label} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded border border-gray-200 group-hover:border-gray-400 transition-colors" />
                <span className="text-sm text-gray-600 font-medium">{item.label}</span>
              </div>
              <span className="text-xs text-gray-400">{item.count}</span>
            </label>
          ))}
        </div>
      </Accordion>

      <Accordion title="Price" defaultOpen>
        <div className="space-y-6 pt-4 px-1">
          <p className="text-sm text-gray-500">The highest price is $109.00</p>
          
          <div className="flex items-center gap-4">
            <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-white">
              <span className="text-gray-400 text-sm">$</span>
              <input 
                type="number" 
                value={priceRange[0]} 
                className="w-full text-sm outline-none"
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              />
            </div>
            <span className="text-gray-400">—</span>
            <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-white">
              <span className="text-gray-400 text-sm">$</span>
              <input 
                type="number" 
                value={priceRange[1]} 
                className="w-full text-sm outline-none"
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              />
            </div>
          </div>

          <div className="relative h-1 bg-gray-100 rounded-full mt-2">
            <div 
              className="absolute h-full bg-black rounded-full" 
              style={{ 
                left: `${(priceRange[0] / 109) * 100}%`, 
                right: `${100 - (priceRange[1] / 109) * 100}%` 
              }} 
            />
            <input
              type="range"
              min="0"
              max="109"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), Math.max(Number(e.target.value), priceRange[1])])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            />
            <input
              type="range"
              min="0"
              max="109"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([Math.min(Number(e.target.value), priceRange[0]), Number(e.target.value)])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            />
            {/* Thumbs */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-black rounded-sm shadow-sm pointer-events-none z-10" 
              style={{ left: `calc(${(priceRange[0] / 109) * 100}% - 8px)` }}
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-black rounded-sm shadow-sm pointer-events-none z-10" 
              style={{ left: `calc(${(priceRange[1] / 109) * 100}% - 8px)` }}
            />
          </div>

        </div>
      </Accordion>
    </div>
  );
};

export default Sidebar;
