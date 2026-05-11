import { motion } from "framer-motion";
import Image from "next/image";

type RelatedProductsType = {
  relatedProducts: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
  }>;
};

const RelatedProducts = ({ relatedProducts }: RelatedProductsType) => (
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
            <Image
              width={500}
              height={500}
              src={p.image}
              alt={p.name}
              className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <p className="text-[10px] text-ceramide-text-muted uppercase tracking-widest mb-1">
            {p.brand}
          </p>
          <h3 className="font-serif text-ceramide-text-dark group-hover:underline line-clamp-1 mb-1">
            {p.name}
          </h3>
          <p className="font-bold text-ceramide-text-dark text-sm">
            ${(p.price / 100).toFixed(0)}
          </p>
        </motion.a>
      ))}
    </div>
  </div>
);

export default RelatedProducts;
