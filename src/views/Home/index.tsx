"use client";

import { Category } from "@/db/schema";
import Blog from "./Blog";
import ListCategory from "./Category";
import DailyEssentials from "./DailyEssentials";
import Hero from "./Hero";
import PromoCards from "./PromoCards";
// import BeforeAfterSlider from "@/components/BeforeAfterSlider";

type HomePropsType = {
  categories: Category[];
};

const Home = ({ categories }: HomePropsType) => (
  <div className="min-h-screen bg-[#f8f8f8]">
    <main>
      <Hero />
      <ListCategory categories={categories} />
      <DailyEssentials />
      <PromoCards />
      <Blog />
      {/* <BeforeAfterSlider
        beforeImage="https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=1400"
        afterImage="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=1400"
        beforeLabel="Sebelum"
        afterLabel="Sesudah"
      /> */}
    </main>
  </div>
);

export default Home;
