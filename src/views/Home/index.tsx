"use client";

import Blog from "./Blog";
import Category from "./Category";
import DailyEssentials from "./DailyEssentials";
import Hero from "./Hero";
import PromoCards from "./PromoCards";

const Home = () => (
  <div className="min-h-screen bg-[#f8f8f8]">
    <main>
      <Hero />
      <Category />
      <DailyEssentials />
      <PromoCards />
      <Blog />
    </main>
  </div>
);

export default Home;
