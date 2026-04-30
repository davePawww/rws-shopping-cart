import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ProductList } from '@/features/shopping-cart/components/product-list';
import { fetchProducts } from '@/features/shopping-cart/shopping-cart.api';
import type { ShoppingCartProduct } from '@/features/shopping-cart/shopping-cart.types';

// fetchProducts mock
vi.mock('@/features/shopping-cart/shopping-cart.api');

const mockProducts: ShoppingCartProduct[] = [
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png',
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
  {
    id: 2,
    title: 'Mens Casual Premium Slim Fit T-Shirts ',
    price: 22.3,
    description:
      'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png',
    rating: {
      rate: 4.1,
      count: 259,
    },
  },
  {
    id: 3,
    title: 'Mens Cotton Jacket',
    price: 55.99,
    description:
      'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png',
    rating: {
      rate: 4.7,
      count: 500,
    },
  },
  {
    id: 4,
    title: 'Mens Casual Slim Fit',
    price: 15.99,
    description:
      'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png',
    rating: {
      rate: 2.1,
      count: 430,
    },
  },
];

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
}

describe('ProductList', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('shows No products found. when API returns an empty array', async () => {
    vi.mocked(fetchProducts).mockResolvedValue([]);
    renderWithProviders(<ProductList />);
    expect(await screen.findByText('No products found.')).toBeInTheDocument();
  });

  it('shows Failed to load products. when API call fails', async () => {
    vi.mocked(fetchProducts).mockRejectedValue(new Error('API error'));
    renderWithProviders(<ProductList />);
    expect(await screen.findByText('Failed to load products.')).toBeInTheDocument();
  });

  it('shows a loading message while fetching the products', async () => {
    vi.mocked(fetchProducts).mockReturnValue(new Promise(() => {}));
    renderWithProviders(<ProductList />);
    expect(await screen.findByText('Loading products...')).toBeInTheDocument();
  });

  it('renders a list of products when API call is successful', async () => {
    vi.mocked(fetchProducts).mockResolvedValue(mockProducts);
    renderWithProviders(<ProductList />);

    expect(await screen.findAllByRole('img')).toHaveLength(mockProducts.length);

    for (const product of mockProducts) {
      expect(await screen.findByText(product.title.trim())).toBeInTheDocument();
      expect(await screen.findByText(`$${product.price}`)).toBeInTheDocument();
      expect(screen.getAllByRole('button', { name: 'Add to Cart' })).toHaveLength(
        mockProducts.length,
      );
    }
  });
});
