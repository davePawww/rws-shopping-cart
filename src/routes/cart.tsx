import { createFileRoute } from '@tanstack/react-router';

import { CartItems } from '@/features/cart';

export const Route = createFileRoute('/cart')({
  component: RouteComponent,
});

function RouteComponent() {
  return <CartItems />;
}
