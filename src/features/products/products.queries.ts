import { queryOptions } from '@tanstack/react-query';

import { fetchProducts } from '@/features/products/products.api';

export const productsQueryOptions = queryOptions({
  queryKey: ['products'],
  queryFn: fetchProducts,
});
