import { cn } from "@/lib/utils";
import Image from "next/image";

type CategoryCardPropsType = {
  label: string;
  isSpecial?: boolean;
  imageUrl: string;
  onClick: () => void;
};

const CategoryCard = ({
  label,
  isSpecial,
  imageUrl,
  onClick,
}: CategoryCardPropsType) => (
  <div
    onClick={onClick}
    key={label}
    className="flex flex-col items-center gap-4 group cursor-pointer shrink-0 snap-center"
  >
    <div
      className={cn(
        "w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg",
        isSpecial ? "bg-ceramide-red" : "bg-gray-100 shadow-sm",
      )}
    >
      {isSpecial ? (
        <span className="text-white font-serif text-2xl font-bold">Diskon</span>
      ) : (
        <Image
          width={64}
          height={64}
          src={imageUrl}
          alt={label}
          className="w-16 h-16 object-contain"
        />
      )}
    </div>
    <p className="text-[12px] md:text-[13px] font-bold text-ceramide-text-dark text-center tracking-tight">
      {label}
    </p>
  </div>
);

export default CategoryCard;
