import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { ShopNav } from '@/features/shopping-cart/components/shop-nav';

function renderWithRouter() {
  const rootRoute = createRootRoute({ component: ShopNav });
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory(),
  });
  return render(<RouterProvider router={router} />);
}

describe('ShopNav', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the Products link', async () => {
    renderWithRouter();
    expect(await screen.findByRole('link', { name: /link to home/i })).toBeInTheDocument();
  });

  it('Products link points to /', async () => {
    renderWithRouter();
    expect(await screen.findByRole('link', { name: /link to home/i })).toHaveAttribute('href', '/');
  });

  it('renders the cart icon link pointing to /cart', async () => {
    renderWithRouter();
    const cartLink = await screen.findByRole('link', { name: /cart/i });
    expect(cartLink).toHaveAttribute('href', '/cart');
  });
});
