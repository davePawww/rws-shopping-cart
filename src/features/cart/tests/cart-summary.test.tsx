import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { CartSummary } from '@/features/cart/components/cart-summary';
import { useCartStore } from '@/store/products.store';
import type { CartItem } from '@/types/cart.types';

// mock the cart items for testing
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

describe('CartSummary', () => {
  // clear localStorage and reset the zustand cart store before each test
  beforeEach(() => {
    localStorage.clear();
    useCartStore.setState({ cartItems: [] });
  });

  // cleanup after each test to clear the DOM and prevent memory leaks
  afterEach(() => {
    cleanup();
  });

  it('displays nothing/null when the cart is empty', () => {
    useCartStore.setState({ cartItems: [] });
    render(<CartSummary />);

    expect(screen.queryByText('Cart Summary')).not.toBeInTheDocument();
  });

  it('calculates and displays the correct subtotal, VAT, discount, and total', () => {
    useCartStore.setState({ cartItems: mockCartItems });
    render(<CartSummary />);

    expect(screen.getByText('Subtotal:')).toBeInTheDocument();
    expect(screen.getByText('$59.98')).toBeInTheDocument(); // 29.99 * 2

    expect(screen.getByText('VAT:')).toBeInTheDocument();
    expect(screen.getByText('$4.80')).toBeInTheDocument(); // 8% of 59.98

    expect(screen.getByText('Discount:')).toBeInTheDocument();
    expect(screen.getByText('-$0.00')).toBeInTheDocument(); // no discount for subtotal <= 100

    expect(screen.getByText('Total:')).toBeInTheDocument();
    expect(screen.getByText('$64.78')).toBeInTheDocument(); // 59.98 + 4.80 - 0.00
  });
});
