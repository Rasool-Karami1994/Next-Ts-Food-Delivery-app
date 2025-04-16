import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "../store";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Category, Product } from "@/types";
import { categoryTitleHandler } from "@/utils/categoryTitleHandler";

interface HomePageProps {
  categories: Category[];
  productsData: {
    [key: string]: Product[];
  };
}

const HomePage: React.FC<HomePageProps> = ({ categories, productsData }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("appetizer");
  const favorites = useStore((state) => state.favorites);
  const toggleFavorite = useStore((state) => state.toggleFavorite);
  const addToCart = useStore((state) => state.addToCart);
  const productsToDisplay: Product[] =
    selectedCategory === "favorites"
      ? favorites
      : productsData[selectedCategory] || [];

  const CategoryCard = dynamic(() => import("@/components/CategoryCard"), {
    loading: () => <LoadingSpinner />,
  });
  const ProductCard = dynamic(() => import("@/components/ProductCard"), {
    loading: () => <LoadingSpinner />,
  });
  const productsRef = useRef<HTMLDivElement>(null);
  const handleCategoryClick = (value: string) => {
    // اسکرول با حالت smooth
    productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setSelectedCategory(value);
  };
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-600 dark:text-white my-8">
          دسته بندی ها{" "}
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onSelect={handleCategoryClick}
            />
          ))}
        </div>
      </div>
      <h2
        ref={productsRef}
        className="text-3xl font-bold text-gray-600 dark:text-white my-6 mt-16"
      >
        {categoryTitleHandler(selectedCategory)}
      </h2>
      <div>
        {selectedCategory === "favorites" && favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-gray-400  text-lg">علاقه مندی خالیه !</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {productsToDisplay.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favorites.some((fav) => fav.id === product.id)}
                  onToggleFavorite={toggleFavorite}
                  onAddToCart={addToCart}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const categories = require("../data/categories.json");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const productsData = require("../data/products.json");

  return {
    props: {
      categories,
      productsData,
    },
    revalidate: 60,
  };
};
export default HomePage;
