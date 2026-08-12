import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { CartItemType } from "@/types/cart";

/** Tope de cantidad por producto — evita valores absurdos ya que el dataset no informa stock real. */
const MAX_QUANTITY_PER_ITEM = 20;

type CartState = {
  items: CartItemType[];
  /** Agrega un producto; si ya está en el carrito, suma `quantity` a lo que ya había. */
  addToCart: (item: Omit<CartItemType, "quantity">, quantity?: number) => void;
  increaseQuantity: (productId: number) => void;
  /** Si la cantidad llega a 0, el producto se saca solo del carrito. */
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
};

export const cartContext = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addToCart: (item, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId);

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: Math.min(i.quantity + quantity, MAX_QUANTITY_PER_ITEM) }
                  : i
              ),
            };
          }

          return {
            items: [
              ...state.items,
              { ...item, quantity: Math.min(quantity, MAX_QUANTITY_PER_ITEM) },
            ],
          };
        }),

      increaseQuantity: (productId) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId
              ? { ...i, quantity: Math.min(i.quantity + 1, MAX_QUANTITY_PER_ITEM) }
              : i
          ),
        })),

      decreaseQuantity: (productId) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i))
            .filter((i) => i.quantity > 0),
        })),

      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "montecarlo-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
