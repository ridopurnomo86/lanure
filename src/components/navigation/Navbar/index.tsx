import { Search, MapPin, User, ShoppingBag, Menu } from "lucide-react";
import Link from "next/link";

const NavBar = () => (
  <nav className="w-full bg-white px-4 md:px-8 py-4">
    <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
      {/* Left: Menu & Search */}
      <div className="flex items-center gap-6 flex-1">
        <Menu className="w-6 h-6 text-ceramide-text-dark cursor-pointer" />
        <div className="relative flex-1 max-w-md hidden md:block">
          <input
            type="text"
            placeholder="Apa yang Anda cari?"
            className="w-full pl-4 pr-10 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-ceramide-text-dark transition-colors"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Center: Logo */}
      <div className="flex flex-col items-center shrink-0">
        <Link
          href="/"
          className="text-2xl md:text-3xl font-serif font-bold text-ceramide-text-dark tracking-tight"
        >
          Lanure
        </Link>
        <span className="text-[10px] uppercase tracking-[0.2em] text-ceramide-text-dark -mt-1">
          Skincare & Kosmetik
        </span>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center justify-end gap-5 md:gap-6 flex-1">
        <MapPin className="w-5 h-5 text-ceramide-text-dark cursor-pointer hover:opacity-70 transition-opacity" />
        <User className="w-5 h-5 text-ceramide-text-dark cursor-pointer hover:opacity-70 transition-opacity" />
        <div className="relative p-2 rounded-full border border-gray-100 bg-gray-50/50">
          <ShoppingBag className="w-5 h-5 text-ceramide-text-dark cursor-pointer" />
        </div>
      </div>
    </div>
  </nav>
);

export default NavBar;
