import type { Product } from '@/types/product.types';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('https://fakestoreapi.com/products');

  if (!response.ok) {
    throw new Error('Failed to fetch all products');
  }

  return (await response.json()) as Product[];
};
