import { createFileRoute } from '@tanstack/react-router';

import { CartItems, CartSummary } from '@/features/cart';

export const Route = createFileRoute('/cart')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-full flex-col items-start gap-4">
      <CartItems />
      <CartSummary />
    </div>
  );
}
