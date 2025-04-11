import Image from "next/image";
interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
}
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
    <div className="border rounded-lg bg-white dark:bg-gray-800 shadow-md flex flex-col">
      <div className="relative">
        <Image
          src={product.image}
          alt={product.title}
          width={190}
          height={150}
          className="w-full h-40 object-cover rounded-t-lg"
        />
        <button
          onClick={() => onToggleFavorite(product)}
          className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-700 rounded-full focus:outline-none hover:scale-105"
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
              className="h-6 w-6 text-gray-500 dark:text-gray-200"
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
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          {product.title}
        </h3>
        <p className="mt-1 text-gray-400 dark:text-gray-200 text-sm">
          {product.price.toLocaleString()} تومان
        </p>
        <div className=" flex justify-end">
          <button
            onClick={() => onAddToCart(product)}
            className="px-3 py-1 bg-orange-400 focus:outline-none text-white rounded hover:bg-orange-500 transition"
          >
            + افزودن
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
