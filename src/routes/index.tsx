import { createFileRoute } from '@tanstack/react-router';

import { SearchProduct, SortProduct } from '@/features/products';
import { Products } from '@/features/products/components/products';
import { productsQueryOptions } from '@/features/products/products.queries';

export const Route = createFileRoute('/')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(productsQueryOptions),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="mt-6 flex items-center gap-2">
        <SearchProduct />
        <SortProduct />
      </div>
      <Products />
    </>
  );
}
