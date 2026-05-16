/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Product } from "@/db/schema";
import SectionDetail from "./SectionDetail";
import VideoReviews from "./VideoPreviews";

type ProductDetailPropsType = {
  product: Product;
  relatedProducts: Product[];
};

const ProductDetail = ({
  product,
  relatedProducts,
}: ProductDetailPropsType) => {
  const [activeImage, setActiveImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState<"one-time" | "subscribe">(
    "one-time",
  );
  const [subscriptionFrequency, setSubscriptionFrequency] =
    useState("Every Month");

  // Use dynamic images from product if available
  const images =
    (product as any).images?.length > 0
      ? (product as any).images.map((img: any) => img.url)
      : [product.image];

  return (
    <div className="min-h-screen bg-[#FDFCF7]">
      {/* <Announcement /> */}
      <SectionDetail
        activeImage={activeImage}
        images={images}
        onActiveImage={setActiveImage}
        product={product}
        relatedProducts={relatedProducts}
        purchaseType={purchaseType}
        setPurchaseType={setPurchaseType}
        subscriptionFrequency={subscriptionFrequency}
        setSubscriptionFrequency={setSubscriptionFrequency}
        quantity={quantity}
        setQuantity={setQuantity}
      />
      <VideoReviews videos={(product as any).videos} />
    </div>
  );
};

export default ProductDetail;
