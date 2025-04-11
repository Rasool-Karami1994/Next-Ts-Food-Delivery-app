// pages/index.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { useStore } from "../store";
interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
}

const categories = [
  {
    id: "appetizer",
    title: "پیش غذا",
    image: "/images/preFood.jpg",
  },
  {
    id: "dessert",
    title: "دسر",
    image: "/images/teeraa.jpg",
  },
  {
    id: "persian",
    title: "غذاایرانی",
    image: "/images/Iran.jpg",
  },
  {
    id: "fastfood",
    title: "فست فود",
    image: "/images/pizza.jpg",
  },
  {
    id: "drink",
    title: "نوشیدنی",
    image: "/images/pasta.jpg",
  },
  {
    id: "favorites",
    title: "علاقه مندی ها",
    image: "/images/fav.jpg",
  },
];

const productsData: { [key: string]: Product[] } = {
  appetizer: [
    {
      id: "app-1",
      title: "سالاد فصل",
      image: "/images/seaseon-salad.jpg",
      price: 220000,
    },
    {
      id: "app-3",
      title: "سوپ",
      image: "/images/Desser.jpg",
      price: 280000,
    },
    {
      id: "app-2",
      title: "سالاد چینی",
      image: "/images/preFood.jpg",
      price: 300000,
    },
  ],
  dessert: [
    {
      id: "des-1",
      title: "کیک میوه ایی",
      image: "/images/fr-cake.jpg",
      price: 160000,
    },
    {
      id: "des-2",
      title: "کاپ کیک",
      image: "/images/cup-cake.jfif",
      price: 80000,
    },
    {
      id: "des-3",
      title: "تیرامیسو",
      image: "/images/teeraa.jpg",
      price: 190000,
    },
  ],
  persian: [
    {
      id: "per-1",
      title: "سینی کباب",
      image: "/images/kebab.jpg",
      price: 450000,
    },
    {
      id: "per-2",
      title: "چلو گوشت",
      image: "/images/chelo.jpg",
      price: 320000,
    },
    {
      id: "per-3",
      title: "کباب بره",
      image: "/images/jooj.jpg",
      price: 380000,
    },
  ],
  fastfood: [
    {
      id: "fast-1",
      title: "برگر",
      image: "/images/sandwich.jpg",
      price: 270000,
    },
    {
      id: "fast-2",
      title: "پاستا",
      image: "/images/pasta.jpg",
      price: 235000,
    },
    {
      id: "fast-3",
      title: "پیتزا",
      image: "/images/pizza.jpg",
      price: 280000,
    },
  ],
  drink: [
    {
      id: "drink-1",
      title: "کوکا کولا",
      image: "/images/cooca.webp",
      price: 25000,
    },
    {
      id: "drink-2",
      title: "شربت سنتی",
      image: "/images/syr.avif",
      price: 15000,
    },
    {
      id: "drink-3",
      title: "سودا",
      image: "/images/soda.jpg",
      price: 100000,
    },
  ],
};
const titleHandler = (title: string) => {
  switch (title) {
    case "appetizer":
      return "پیش غذا";
    case "dessert":
      return "دسر";
    case "persian":
      return "غذاایرانی";
    case "fastfood":
      return "فست فود";
    case "drink":
      return "نوشیدنی";
    case "favorites":
      return "علاقه مندی ها";

    default:
      break;
  }
};

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("appetizer");
  const favorites = useStore((state) => state.favorites);
  const toggleFavorite = useStore((state) => state.toggleFavorite);
  const addToCart = useStore((state) => state.addToCart);
  const cart = useStore((state) => state.cart);
  console.log(cart);
  const productsToDisplay: Product[] =
    selectedCategory === "favorites"
      ? favorites
      : productsData[selectedCategory] || [];

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
              onSelect={setSelectedCategory}
            />
          ))}
        </div>
      </div>
      <h2 className="text-3xl font-bold text-gray-600 dark:text-white my-6 mt-16">
        {titleHandler(selectedCategory)}
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
                initial={{ opacity: 0, y: 50 }} // حالت اولیه انیمیشن
                animate={{ opacity: 1, y: 0 }} // حالت نهایی انیمیشن
                transition={{ duration: 1, delay: index * 0.1 }} // با تاخیر اندکی برای هر آیتم
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

export default HomePage;
