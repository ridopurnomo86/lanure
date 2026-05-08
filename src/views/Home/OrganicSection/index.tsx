import Link from "next/link";

const OrganicSection = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-16 md:gap-24">
        {/* Left Content */}
        <div className="flex-1 space-y-8">
          <p className="text-xs font-bold tracking-[0.3em] text-ceramide-text-muted uppercase">
            Try the Organic
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#1B4332] leading-[1.2] font-medium">
            Powered by the highest concentration of retinol and botanical extracts, Retinol 1.0 Maximum Strength Refining Night Cream exfoliates skin to reduce the appearance of blemishes and pores while minimizing breakouts.
          </h2>
          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-block px-10 py-4 bg-[#1B4332] text-white text-sm font-bold uppercase tracking-widest hover:bg-[#122e22] transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Right Content: Image */}
        <div className="flex-1 relative">
          <div className="relative aspect-square w-full max-w-[600px] mx-auto">
             {/* Background texture element if needed, but we'll use a single clean image */}
             <div className="absolute inset-0 bg-[#F2F2F2] rounded-[40px] -rotate-3 -z-10" />
             <img 
               src="https://ik.imagekit.io/nip7tdbas/main/organic-retinol.png" // Placeholder URL, I'll assume they might have it or I'll use a generic one
               alt="Organic Retinol Serum"
               className="w-full h-full object-contain"
               onError={(e) => {
                 (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800";
               }}
             />
             
             {/* Decorative smudges if we want to be fancy, but let's keep it clean first */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrganicSection;
