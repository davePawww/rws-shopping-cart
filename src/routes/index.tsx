import { createFileRoute } from '@tanstack/react-router';

import { ProductList } from '@/features/shopping-cart';
import { productsQueryOptions } from '@/features/shopping-cart/shopping-cart.queries';

export const Route = createFileRoute('/')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(productsQueryOptions),
  component: RouteComponent,
});

function RouteComponent() {
  return <ProductList />;
}
