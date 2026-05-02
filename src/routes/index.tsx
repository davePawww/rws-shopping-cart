import { createFileRoute } from '@tanstack/react-router';

import { SearchProduct } from '@/features/products';
import { Products } from '@/features/products/components/products';
import { productsQueryOptions } from '@/features/products/products.queries';

export const Route = createFileRoute('/')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(productsQueryOptions),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <SearchProduct />
      <Products />
    </>
  );
}
