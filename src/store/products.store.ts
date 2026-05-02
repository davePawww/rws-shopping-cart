import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { CartStore, Sort } from '@/types/cart.types';
import type { Product } from '@/types/product.types';

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: [],
      appliedDiscount: 0,
      searchItem: '',
      sortBy: null,
      setSortBy: (sort: Sort) => set({ sortBy: sort }),
      setSearchItem: (query: string) => set({ searchItem: query }),
      setAppliedDiscount: (discount: number) => set({ appliedDiscount: discount }),
      addToCart: (product: Product) =>
        set((state) => {
          const existing = state.cartItems.find((item) => item.id === product.id);
          if (existing) {
            return {
              cartItems: state.cartItems.map((item) => {
                if (item.id === product.id) {
                  return { ...item, quantity: item.quantity + 1 };
                }

                return item;
              }),
            };
          }

          return { cartItems: [...state.cartItems, { ...product, quantity: 1 }] };
        }),
      increaseQuantity: (productId: number) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        })),
      decreaseQuantity: (productId: number) =>
        set((state) => ({
          cartItems: state.cartItems
            .map((item) =>
              item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
            )
            .filter((item) => item.quantity > 0),
        })),
      removeFromCart: (productId: number) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== productId),
        })),
      clearCart: () => set({ cartItems: [] }),
    }),
    { name: 'cart', partialize: (state) => ({ cartItems: state.cartItems }) },
  ),
);
