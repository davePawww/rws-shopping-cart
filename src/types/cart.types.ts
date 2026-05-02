import type { Product } from '@/types/product.types';

export type CartItem = Product & {
  quantity: number;
};

export type CartStore = {
  cartItems: CartItem[];
  appliedDiscount: number;
  searchItem: string;
  setSearchItem: (query: string) => void;
  setAppliedDiscount: (discount: number) => void;
  addToCart: (product: Product) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
};
