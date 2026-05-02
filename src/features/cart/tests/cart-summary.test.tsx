import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { CartSummary } from '@/features/cart/components/cart-summary';
import { useCartStore } from '@/store/products.store';
import type { CartItem } from '@/types/cart.types';

// mock the cart items for testing
const mockCartItems: CartItem[] = [
  {
    id: 1,
    title: 'Test Backpack',
    price: 29.95,
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
    expect(screen.getByText('$59.90')).toBeInTheDocument();

    expect(screen.getByText('VAT:')).toBeInTheDocument();
    expect(screen.getByText('$4.79')).toBeInTheDocument();

    expect(screen.getByText('Discount:')).toBeInTheDocument();
    expect(screen.getByText('-$0.00')).toBeInTheDocument();

    expect(screen.getByText('Total:')).toBeInTheDocument();
    expect(screen.getByText('$64.69')).toBeInTheDocument();
  });

  it('applies a 10% discount when the discount code is valid', () => {
    useCartStore.setState({ cartItems: mockCartItems });
    render(<CartSummary />);

    fireEvent.click(screen.getByTestId('discount-code-button'));

    const discountInput = screen.getByTestId('discount-code-input');
    const applyButton = screen.getByRole('button', { name: /apply/i });

    fireEvent.change(discountInput, { target: { value: 'IMPOOR10' } });
    fireEvent.click(applyButton);

    expect(screen.getByText('-$5.99')).toBeInTheDocument();
    expect(screen.getByText('$58.70')).toBeInTheDocument();
  });
});
