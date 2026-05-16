import ProductListView from "@/views/ProductList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shops | Lanure",
  description:
    "Browse our collection of premium skincare products tailored for your needs.",
};

export default function ShopPage() {
  return <ProductListView />;
}
