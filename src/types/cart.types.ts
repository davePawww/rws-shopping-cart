import type { Product } from '@/types/product.types';

export type CartItem = Product & {
  quantity: number;
};

export type Sort = {
  type: string;
  order: string;
} | null;

export type CartStore = {
  cartItems: CartItem[];
  appliedDiscount: number;
  searchItem: string;
  sortBy: Sort;
  setSortBy: (sort: Sort) => void;
  setSearchItem: (query: string) => void;
  setAppliedDiscount: (discount: number) => void;
  addToCart: (product: Product) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
};
