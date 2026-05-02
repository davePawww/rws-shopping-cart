import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SortProduct } from '@/features/products/components/sort-product';
import { useCartStore } from '@/store/products.store';

describe('SortProduct', () => {
  beforeEach(() => {
    useCartStore.setState({ sortBy: null });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders the sort button', () => {
    render(<SortProduct />);

    expect(screen.getByRole('button', { name: /sort-button/i })).toBeInTheDocument();
  });

  it('opens the popover when the sort button is clicked', async () => {
    render(<SortProduct />);

    // the sort options should not be visible at this time
    expect(screen.queryByText(/name: a-z/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /sort-button/i }));

    expect(await screen.findByText(/name: a-z/i)).toBeInTheDocument();
    expect(screen.getByText(/name: z-a/i)).toBeInTheDocument();
    expect(screen.getByText(/price: low to high/i)).toBeInTheDocument();
    expect(screen.getByText(/price: high to low/i)).toBeInTheDocument();
  });

  it('calls setSortBy with { type: "title", order: "asc" } when "Name: A-Z" is clicked', async () => {
    const setSortBy = vi.spyOn(useCartStore.getState(), 'setSortBy');

    render(<SortProduct />);
    fireEvent.click(screen.getByRole('button', { name: /sort-button/i }));
    fireEvent.click(await screen.findByText(/name: a-z/i));

    expect(setSortBy).toHaveBeenCalledWith({ type: 'title', order: 'asc' });
  });

  it('calls setSortBy with { type: "title", order: "desc" } when "Name: A-Z" is clicked', async () => {
    const setSortBy = vi.spyOn(useCartStore.getState(), 'setSortBy');

    render(<SortProduct />);
    fireEvent.click(screen.getByRole('button', { name: /sort-button/i }));
    fireEvent.click(await screen.findByText(/name: z-a/i));

    expect(setSortBy).toHaveBeenCalledWith({ type: 'title', order: 'desc' });
  });

  it('calls setSortBy with { type: "price", order: "asc" } when "Price: Low to High" is clicked', async () => {
    const setSortBy = vi.spyOn(useCartStore.getState(), 'setSortBy');

    render(<SortProduct />);
    fireEvent.click(screen.getByRole('button', { name: /sort-button/i }));
    fireEvent.click(await screen.findByText(/price: low to high/i));

    expect(setSortBy).toHaveBeenCalledWith({ type: 'price', order: 'asc' });
  });

  it('calls setSortBy with { type: "price", order: "desc" } when "Price: High to Low" is clicked', async () => {
    const setSortBy = vi.spyOn(useCartStore.getState(), 'setSortBy');

    render(<SortProduct />);
    fireEvent.click(screen.getByRole('button', { name: /sort-button/i }));
    fireEvent.click(await screen.findByText(/price: high to low/i));

    expect(setSortBy).toHaveBeenCalledWith({ type: 'price', order: 'desc' });
  });

  it('actually updates the store state when a sort option is selected', async () => {
    render(<SortProduct />);
    fireEvent.click(screen.getByRole('button', { name: /sort-button/i }));
    fireEvent.click(await screen.findByText(/price: low to high/i));

    expect(useCartStore.getState().sortBy).toEqual({ type: 'price', order: 'asc' });
  });
});
