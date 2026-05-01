import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { CartItems } from '@/features/cart/components/cart-items';
import { useCartStore } from '@/store/products.store';
import type { CartItem } from '@/types/cart.types';

const mockCartItems: CartItem[] = [
  {
    id: 1,
    title: 'Test Backpack',
    price: 29.99,
    description: 'A sturdy backpack for everyday use.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/test.png',
    rating: { rate: 4.5, count: 100 },
    quantity: 2,
  },
];

function renderWithRouter() {
  const rootRoute = createRootRoute({ component: CartItems });
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory(),
  });
  return render(<RouterProvider router={router} />);
}

describe('CartItems', () => {
  beforeEach(() => {
    localStorage.clear();
    useCartStore.setState({ cartItems: [] });
  });

  afterEach(() => {
    cleanup();
  });

  it('shows an empty message when there are no items in the cart', async () => {
    renderWithRouter();

    expect(await screen.findByText('Your cart is empty.')).toBeInTheDocument();
  });

  it('renders item details when the cart has items', async () => {
    useCartStore.setState({ cartItems: mockCartItems });
    renderWithRouter();

    expect(await screen.findByText('Test Backpack')).toBeInTheDocument();
    expect(await screen.findByText('A sturdy backpack for everyday use.')).toBeInTheDocument();
    expect(await screen.findByText('Price: $29.99')).toBeInTheDocument();
    expect(await screen.findByText('2')).toBeInTheDocument();
  });

  it('increases quantity when the plus button is clicked', async () => {
    useCartStore.setState({ cartItems: mockCartItems });
    renderWithRouter();

    fireEvent.click(await screen.findByRole('button', { name: /plus item/i }));

    expect(useCartStore.getState().cartItems[0].quantity).toBe(3);
  });

  it('decreases quantity when the minus button is clicked', async () => {
    useCartStore.setState({ cartItems: mockCartItems });
    renderWithRouter();

    fireEvent.click(await screen.findByRole('button', { name: /minus item/i }));

    expect(useCartStore.getState().cartItems[0].quantity).toBe(1);
  });

  it('removes the item from the cart when quantity reaches zero', async () => {
    useCartStore.setState({ cartItems: [{ ...mockCartItems[0], quantity: 1 }] });
    renderWithRouter();

    fireEvent.click(await screen.findByRole('button', { name: /minus item/i }));

    expect(useCartStore.getState().cartItems).toHaveLength(0);
  });

  it('removes the item from the cart when the remove button is clicked', async () => {
    useCartStore.setState({ cartItems: mockCartItems });
    renderWithRouter();

    fireEvent.click(await screen.findByRole('button', { name: /remove item/i }));

    expect(useCartStore.getState().cartItems).toHaveLength(0);
  });
});
