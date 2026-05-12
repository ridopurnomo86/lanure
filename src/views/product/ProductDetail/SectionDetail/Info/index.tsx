/* eslint-disable @typescript-eslint/no-explicit-any */
import Accordion from "@/components/core/Accordion";
import { cn } from "@/lib/utils";
import { ChevronDown, Minus, Plus, ShoppingBag, Star } from "lucide-react";

type InfoPropsType = {
  setPurchaseType: (purchaseType: string) => void;
  setSubscriptionFrequency: (subscriptionFrequency: string) => void;
  purchaseType: string;
  subscriptionFrequency: string;
  quantity: number;
  setQuantity: (quantity: number) => void;
  product: any;
};

const Info = ({
  purchaseType,
  setPurchaseType,
  setSubscriptionFrequency,
  subscriptionFrequency,
  quantity,
  setQuantity,
  product,
}: InfoPropsType) => (
  <div className="flex flex-col">
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-ceramide-text-dark leading-tight mb-4">
        Luméra Pore Refining Clay Mask
      </h1>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-4 h-4 fill-current",
                i < 4 ? "text-orange-400" : "text-orange-400/50",
              )}
            />
          ))}
        </div>
        <span className="text-sm text-ceramide-text-muted font-medium">
          (4.9) 5k+ Reviews
        </span>
      </div>

      <p className="text-ceramide-text-muted leading-relaxed mb-8 max-w-xl text-sm md:text-base">
        Refresh and detoxify with Luméra Clay Mask. Soothing lavender and kaolin
        clay for smooth, clear skin.
      </p>

      <div className="flex items-baseline gap-3 mb-8">
        <span className="text-3xl md:text-4xl font-bold text-ceramide-text-dark">
          $128
        </span>
        <span className="text-xl text-ceramide-text-muted line-through font-light">
          $160
        </span>
        <span className="bg-black text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
          Save 20%
        </span>
      </div>
    </div>

    {/* Purchase Options */}
    <div className="space-y-4 mb-8">
      <div
        onClick={() => setPurchaseType("one-time")}
        className={cn(
          "flex items-center justify-between p-5 rounded-2xl border transition-all",
          purchaseType === "one-time"
            ? "border-gray-300 bg-white shadow-sm ring-1 ring-gray-200"
            : "border-gray-100 hover:border-gray-200",
        )}
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
              purchaseType === "one-time"
                ? "border-ceramide-text-dark"
                : "border-gray-300",
            )}
          >
            {purchaseType === "one-time" && (
              <div className="w-2.5 h-2.5 rounded-full bg-ceramide-text-dark" />
            )}
          </div>
          <span className="text-sm font-medium text-ceramide-text-dark">
            One Time Purchase
          </span>
        </div>
        <span className="font-bold text-ceramide-text-dark">$128</span>
      </div>

      <div
        onClick={() => setPurchaseType("subscribe")}
        className={cn(
          "p-5 rounded-2xl border transition-all",
          purchaseType === "subscribe"
            ? "border-gray-300 bg-white shadow-sm ring-1 ring-gray-200"
            : "border-gray-100 hover:border-gray-200",
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                purchaseType === "subscribe"
                  ? "border-ceramide-text-dark"
                  : "border-gray-300",
              )}
            >
              {purchaseType === "subscribe" && (
                <div className="w-2.5 h-2.5 rounded-full bg-ceramide-text-dark" />
              )}
            </div>
            <span className="text-sm font-medium text-ceramide-text-dark">
              Subscribe to save 25%
            </span>
          </div>
          <span className="font-bold text-ceramide-text-dark">$120</span>
        </div>

        {purchaseType === "subscribe" && (
          <div className="relative">
            <select
              value={subscriptionFrequency}
              onChange={(e) => setSubscriptionFrequency(e.target.value)}
              className="w-full pl-4 pr-10 py-3 bg-gray-50 rounded-xl text-sm appearance-none focus:outline-none border border-gray-100"
            >
              <option>Every Month</option>
              <option>Every 2 Months</option>
              <option>Every 3 Months</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        )}
      </div>
    </div>

    {/* Quantity and CTA */}
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 min-w-[120px]">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="text-ceramide-text-dark hover:opacity-50 transition-opacity"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="font-medium text-ceramide-text-dark w-8 text-center">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="text-ceramide-text-dark hover:opacity-50 transition-opacity"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <button className="flex-grow bg-ceramide-text-dark text-white rounded-lg py-4 px-8 font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all active:scale-[0.98]">
        <ShoppingBag className="w-5 h-5" />
        Add to Cart
      </button>
    </div>

    <p className="text-center text-xs text-ceramide-text-muted mb-12">
      Sign up and get a FREE Toner with your first purchase.{" "}
      <a href="#" className="font-bold underline text-ceramide-text-dark">
        Sign Up
      </a>
    </p>

    {/* Accordions */}
    <div className="border-t border-gray-100">
      <Accordion title="Benefits">
        <ul className="list-disc pl-5 space-y-2">
          <li>Deeply cleanses and refines pores</li>
          <li>Detoxifies skin from impurities and pollutants</li>
          <li>Soothes and calms with lavender extract</li>
          <li>Leaves skin feeling smooth and revitalized</li>
        </ul>
      </Accordion>
      <Accordion title="Ingredients">
        <p>
          {(product.ingredients as string) ||
            "Water, Kaolin, Glycerin, Bentonite, Butylene Glycol, Caprylic/Capric Triglyceride, Lavender Extract, Phenoxyethanol, Ethylhexylglycerin..."}
        </p>
      </Accordion>
      <Accordion title="How to Use">
        <p>
          {product.howToUse ||
            "Apply an even layer to clean, dry skin. Leave on for 10-15 minutes or until the mask is dry. Rinse thoroughly with lukewarm water. Use 1-2 times a week for best results."}
        </p>
      </Accordion>
    </div>
  </div>
);

export default Info;
