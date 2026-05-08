import { Category } from "@/db/schema";
import CategoryCard from "./CategoryCard";

type ListCategoryPropsType = {
  categories: Category[];
};

const ListCategory = ({ categories }: ListCategoryPropsType) => (
  <section className="py-12 px-4 md:px-8 bg-white">
    <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4 md:gap-8 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory">
      {categories.map((cat) => (
        <CategoryCard
          key={cat.label}
          label={cat.label}
          isSpecial={cat.isSpecial}
          imageUrl={cat.image}
          onClick={() => {}}
        />
      ))}
    </div>
  </section>
);

export default ListCategory;
