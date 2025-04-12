// store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

interface StoreState {
  favorites: Product[];
  cart: CartItem[];
  toggleFavorite: (product: Product) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
}

export const useStore = create<StoreState, [["zustand/persist", StoreState]]>(
  persist(
    (set, get) => ({
      favorites: [],
      cart: [],
      toggleFavorite: (product: Product) => {
        const exists = get().favorites.find((item) => item.id === product.id);
        if (exists) {
          set({
            favorites: get().favorites.filter((item) => item.id !== product.id),
          });
        } else {
          set({ favorites: [...get().favorites, product] });
        }
      },
      addToCart: (product: Product) => {
        const currentCart = get().cart;
        const index = currentCart.findIndex((item) => item.id === product.id);
        if (index > -1) {
          const newCart = [...currentCart];
          newCart[index].quantity += 1;
          set({ cart: newCart });
        } else {
          set({ cart: [...currentCart, { ...product, quantity: 1 }] });
        }
      },
      removeFromCart: (product: Product) => {
        const currentCart = get().cart;
        const index = currentCart.findIndex((item) => item.id === product.id);
        if (index > -1) {
          const newCart = [...currentCart];
          if (newCart[index].quantity > 1) {
            newCart[index].quantity -= 1;
          } else {
            newCart.splice(index, 1);
          }
          set({ cart: newCart });
        }
      },
    }),
    {
      name: "zustand-store",
    }
  )
);
