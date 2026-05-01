import { queryOptions } from '@tanstack/react-query';

import { fetchProducts } from '@/features/shopping-cart/shopping-cart.api';

export const productsQueryOptions = queryOptions({
  queryKey: ['products'],
  queryFn: fetchProducts,
});
