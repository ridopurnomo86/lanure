import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Product } from "@/db/schema";

type ImageGalleryPropsType = {
  images: string[];
  activeImage: string;
  product: Product;
  onActiveImage: (image: string) => void;
};

const ImageGallery = ({
  images,
  activeImage,
  product,
  onActiveImage,
}: ImageGalleryPropsType) => (
  <div className="space-y-6">
    <motion.div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-sm flex items-center justify-center p-8 md:p-12 relative group">
      <Image
        width={500}
        height={500}
        src={activeImage === product.image ? "/product_main.png" : activeImage}
        alt={product.name}
        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
      />
    </motion.div>

    <div className="grid grid-cols-4 gap-3 md:gap-4">
      {images.map((img, i) => (
        <button
          key={i}
          onClick={() => onActiveImage(img)}
          className={cn(
            "aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 bg-white",
            activeImage === img || (activeImage === product.image && i === 0)
              ? "border-ceramide-text-dark shadow-md"
              : "border-transparent opacity-60 hover:opacity-100 hover:border-gray-200",
          )}
        >
          <Image
            width={500}
            height={500}
            src={img}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  </div>
);

export default ImageGallery;
