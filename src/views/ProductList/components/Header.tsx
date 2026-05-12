"use client";

import { ChevronDown } from "lucide-react";

interface HeaderProps {
  productCount: number;
}

const Header = ({ productCount }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between py-8">
      <div className="border border-gray-200 rounded px-4 py-2 text-sm font-medium text-gray-700">
        {productCount} Products
      </div>

      <div className="flex items-center gap-2 group cursor-pointer border border-gray-200 rounded px-4 py-2 hover:border-gray-400 transition-colors">
        <span className="text-sm font-medium text-gray-700">Featured</span>
        <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
      </div>
    </div>
  );
};

export default Header;
