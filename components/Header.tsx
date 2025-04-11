import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useStore } from "../store";

const Header: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const cart = useStore((state) => state.cart);
  const theme = useStore((state) => state.theme);
  const changeTheme = useStore((state) => state.changeTheme);

  console.log(cart);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setIsDark(true);
      } else {
        setIsDark(false);
      }
    }
  }, []);

  const toggleDarkMode = () => {
    if (theme === "dark") {
      changeTheme("light");

      setIsDark(false);
    } else {
      changeTheme("dark");
    }
  };

  return (
    <header className="flex items-center justify-between  p-4 bg-white dark:bg-gray-800 border-b border-gray-200">
      <div className="text-2xl font-bold text-orange-400 dark:text-orange-200">
        Foody
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none ml-3 hover:scale-105"
          aria-label="Toggle Dark Mode"
        >
          {isDark ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-7.364l-1.414 1.414M7.05 16.95l-1.414 1.414M16.95 16.95l1.414 1.414M7.05 7.05L5.636 5.636M12 8a4 4 0 100 8 4 4 0 000-8z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
              />
            </svg>
          )}
        </button>

        <Link
          legacyBehavior
          href="/cart"
          className="relative p-2 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800 dark:text-yellow-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1 2m1-2l-1-2m12 2l1 2m-1-2l1-2M5 21h2a2 2 0 004 0"
            />
          </svg>
          {totalCartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {totalCartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
