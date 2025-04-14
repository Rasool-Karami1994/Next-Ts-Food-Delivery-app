import Image from "next/image";
import React from "react";
import { useStore } from "@/store";
import { motion } from "framer-motion";

interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
}
interface CartItemsProps {
  cartItem: Product;
}

const CartItems: React.FC<CartItemsProps> = ({ cartItem }) => {
  const addToCart = useStore((state) => state.addToCart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const cart = useStore((state) => state.cart);
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="w-full"
    >
      <div className="flex w-full items-center justify-between gap-3 rounded-3xl bg-white dark:bg-gray-800 p-4 shadow-md border dark:border-gray-700">
        <div className="grid w-full grid-cols-[repeat(2,auto)] ">
          <div className="row-span-2 max-w-32 overflow-hidden rounded-xl border dark:border-gray-700">
            <Image
              className="object-cover"
              src={cartItem.image}
              height={100}
              width={150}
              alt={cartItem.title}
              priority
            />
          </div>
          <div className="flex flex-col justify-around justify-self-end font-bold">
            <h3 className="text-nowra col-span-2 text-xl text-gray-500 dark:text-gray-300 mb-1">
              {cartItem.title}
            </h3>
          </div>
          <div className="flex flex-col items-end justify-center lg:self-stretch">
            <div className="flex items-center justify-start gap-3">
              <div className="flex flex-col items-start">
                <div className="flex items-end justify-center gap-1">
                  <span className="text-gray-400 dark:text-gray-200 text-sm">
                    {cartItem.price.toLocaleString()}{" "}
                  </span>
                  <span className="text-gray-400 dark:text-gray-200 text-sm">
                    تومان
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => addToCart(cartItem)}
                  className="rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-500 text-gray-400 dark:text-white p-0.5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 5v14m-7-7h14"
                    />
                  </svg>
                </button>
                <div className="rounded-xl px-1.5 text-sm text-gray-400 dark:text-white">
                  {cart.find((item) => item.id === cartItem.id)?.quantity ?? 0}{" "}
                </div>
                <button
                  onClick={() => removeFromCart(cartItem)}
                  className="rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-500 text-gray-400 dark:text-white p-0.5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 12H5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(CartItems);
