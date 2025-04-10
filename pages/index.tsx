// pages/index.tsx
import Image from "next/image";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

const categories = [
  {
    id: "appetizer",
    title: "پیش غذا",
    image: "/food-delivery-platform/assets/images/gg.jpg",
  },
  {
    id: "dessert",
    title: "دسر",
    image: "/food-delivery-platform/assets/images/gg.jpg",
  },
  {
    id: "persian",
    title: "غذا ایرانی",
    image: "/food-delivery-platform/assets/images/gg.jpg",
  },
  {
    id: "fastfood",
    title: "فست فود",
    image: "/food-delivery-platform/assets/images/gg.jpg",
  },
  {
    id: "drink",
    title: "نوشیدنی",
    image: "/food-delivery-platform/assets/images/gg.jpg",
  },
  {
    id: "favorites",
    title: "علاقه مندی ها",
    image: "/food-delivery-platform/assets/images/gg.jpg",
  },
];

const productsData: { [key: string]: Product[] } = {
  appetizer: [
    {
      id: "app-1",
      title: "سالاد فصل",
      image: "/food-delivery-platform/assets/images/gg.jpg",
      price: 50000,
    },
    {
      id: "app-2",
      title: "سوپ جو",
      image: "/food-delivery-platform/assets/images/gg.jpg",
      price: 60000,
    },
    {
      id: "app-3",
      title: "کره پنیر",
      image: "/food-delivery-platform/assets/images/gg.jpg",
      price: 45000,
    },
  ],
  dessert: [
    {
      id: "des-1",
      title: "بستنی شکلاتی",
      image: "/food-delivery-platform/assets/images/gg.jpg",
      price: 40000,
    },
    {
      id: "des-2",
      title: "کیک لیمویی",
      image: "/food-delivery-platform/assets/images/gg.jpg",
      price: 80000,
    },
    {
      id: "des-3",
      title: "تیرامیسو",
      image: "/food-delivery-platform/assets/images/gg.jpg",
      price: 90000,
    },
  ],
  persian: [
    {
      id: "per-1",
      title: "چلوکباب",
      image: "/food-delivery-platform/assets/images/gg.jpg",
      price: 150000,
    },
    {
      id: "per-2",
      title: "خورشت قورمه سبزی",
      image: "/food-delivery-platform/assets/images/gg.jpg",
      price: 120000,
    },
    {
      id: "per-3",
      title: "کباب بره",
      image: "/food-delivery-platform/assets/images/gg.jpg",
      price: 180000,
    },
  ],
  fastfood: [
    {
      id: "fast-1",
      title: "برگر",
      image: "/food-delivery-platform/assets/images/gg.jpg",
      price: 70000,
    },
    {
      id: "fast-2",
      title: "سیب زمینی سرخ شده",
      image: "/food-delivery-platform/assets/images/gg.jpg",
      price: 35000,
    },
    {
      id: "fast-3",
      title: "ساندویچ چیکن",
      image: "/food-delivery-platform/assets/images/gg.jpg",
      price: 80000,
    },
  ],
  drink: [
    {
      id: "drink-1",
      title: "کوکا کولا",
      image: "/food-delivery-platform/assets/images/gg.jpg",
      price: 25000,
    },
    {
      id: "drink-2",
      title: "آب معدنی",
      image: "/food-delivery-platform/assets/images/gg.jpg",
      price: 15000,
    },
    {
      id: "drink-3",
      title: "چای",
      image: "/food-delivery-platform/assets/images/gg.jpg",
      price: 10000,
    },
  ],
};

interface CategoryCardProps {
  category: { id: string; title: string; image: string };
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(category.id)}
      className={`cursor-pointer overflow-hidden rounded-lg relative border-2 hover:scale-110 hover:rotate-3 transition-transform duration-300 ${
        isSelected ? "border-gray-500" : "border-transparent"
      }`}
    >
      <Image
        src={category.image}
        alt={category.title}
        width={190}
        height={150}
        className="w-full h-32 object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <span className="text-white font-semibold">{category.title}</span>
      </div>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
}) => {
  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md flex flex-col">
      <Image
        src={product.image}
        alt={product.title}
        width={190}
        height={150}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">
        {product.title}
      </h3>
      <p className="mt-1 text-gray-600 dark:text-gray-300">
        {product.price.toLocaleString()} تومان
      </p>
      <div className="mt-auto flex justify-between items-center">
        <button
          onClick={() => onToggleFavorite(product)}
          className="p-2 focus:outline-none"
          aria-label="Toggle Favorite"
        >
          {isFavorite ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-pink-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.344l1.172-1.172a4 4 0 115.656 5.656L10 18.656l-6.828-6.828a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z"
              />
            </svg>
          )}
        </button>
        <button
          onClick={() => onAddToCart(product)}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 focus:outline-none dark:text-white text-gray-800 rounded hover:bg-gray-300 dark:hover:bg-gray-800 transition"
        >
          +  افزودن{" "}
        </button>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("appetizer");
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const favData = localStorage.getItem("favorites");
    if (favData) {
      setFavorites(JSON.parse(favData));
    }
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);

  const updateFavoritesStorage = (newFav: Product[]) => {
    localStorage.setItem("favorites", JSON.stringify(newFav));
  };

  const updateCartStorage = (newCart: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const toggleFavorite = (product: Product) => {
    const exists = favorites.find((item) => item.id === product.id);
    if (exists) {
      const newFav = favorites.filter((item) => item.id !== product.id);
      setFavorites(newFav);
      updateFavoritesStorage(newFav);
    } else {
      const newFav = [...favorites, product];
      setFavorites(newFav);
      updateFavoritesStorage(newFav);
    }
  };

  const addToCart = (product: Product) => {
    const index = cart.findIndex((item) => item.id === product.id);
    if (index > -1) {
      const newCart = [...cart];
      newCart[index].quantity += 1;
      setCart(newCart);
      updateCartStorage(newCart);
    } else {
      const newCart = [...cart, { ...product, quantity: 1 }];
      setCart(newCart);
      updateCartStorage(newCart);
    }
  };

  let productsToDisplay: Product[] = [];
  if (selectedCategory === "favorites") {
    productsToDisplay = favorites;
  } else {
    productsToDisplay = productsData[selectedCategory] || [];
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          کتگوری‌ها
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

      <div>
        {selectedCategory === "favorites" && favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-500 mb-4"
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
            <p className="text-gray-500 dark:text-gray-300 text-lg">
              علاقه مندی خالی است
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {productsToDisplay.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.some((fav) => fav.id === product.id)}
                onToggleFavorite={toggleFavorite}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
