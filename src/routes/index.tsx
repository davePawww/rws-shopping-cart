import { createFileRoute } from '@tanstack/react-router';

import { Products } from '@/features/products/components/products';
import { productsQueryOptions } from '@/features/products/products.queries';

export const Route = createFileRoute('/')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(productsQueryOptions),
  component: RouteComponent,
});

function RouteComponent() {
  return <Products />;
}
