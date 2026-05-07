import { motion } from "framer-motion";
import PROMO_CARDS from "./data";
import Image from "next/image";

const PromoCards = () => (
  <section className="py-12 px-4 md:px-8">
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {PROMO_CARDS.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="relative group h-[350px] md:h-[450px] rounded-[30px] overflow-hidden cursor-pointer"
        >
          {/* Background Image */}
          <Image
            width={600}
            height={800}
            src={card.image}
            alt={card.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

          {/* Content Container */}
          <div className="relative h-full p-8 md:p-12 flex flex-col justify-between items-start text-white">
            <div className="space-y-4">
              <p className="font-serif italic text-xl md:text-2xl opacity-90">
                {card.subtitle}
              </p>
              <h2 className="font-serif text-3xl md:text-5xl max-w-xs leading-tight">
                {card.title}
              </h2>
            </div>

            <button
              type="button"
              className="px-8 py-3 bg-white text-ceramide-text-dark rounded-full text-sm font-bold hover:bg-opacity-90 transition-all transform hover:scale-105"
            >
              Belanja Sekarang
            </button>

            {/* Discount Badge */}
            <div className="absolute top-8 right-8 md:top-12 md:right-12 w-20 h-20 md:w-24 md:h-24 bg-[#FDE2E4] rounded-full flex flex-col items-center justify-center text-ceramide-text-dark shadow-xl transform group-hover:rotate-12 transition-transform duration-500">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">
                Hemat
              </span>
              <span className="font-serif text-2xl md:text-3xl font-medium">
                {card.discount}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default PromoCards;
