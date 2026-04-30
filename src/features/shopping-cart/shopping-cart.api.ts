import type { ShoppingCartProduct } from '@/features/shopping-cart/shopping-cart.types';

export const fetchProducts = async (): Promise<ShoppingCartProduct[]> => {
  const response = await fetch('https://fakestoreapi.com/products');

  if (!response.ok) {
    throw new Error('Failed to fetch all products');
  }

  return (await response.json()) as ShoppingCartProduct[];
};
