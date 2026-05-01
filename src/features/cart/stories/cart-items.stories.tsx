import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import { CartItems } from '@/features/cart/components/cart-items';
import { useCartStore } from '@/store/products.store';

const meta = {
  title: 'Shopping Cart/Cart Items',
  component: CartItems,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  decorators: [
    (Story) => {
      const rootRoute = createRootRoute({ component: Story });
      const router = createRouter({
        routeTree: rootRoute,
        history: createMemoryHistory(),
      });

      useCartStore.setState({
        cartItems: [
          {
            id: 1,
            title: 'Test Product',
            description: 'A test product description',
            price: 29.99,
            image: 'https://via.placeholder.com/150',
            category: 'test-category',
            rating: {
              rate: 4.5,
              count: 10,
            },
            quantity: 2,
          },
        ],
      });

      return <RouterProvider router={router} />;
    },
  ],
} satisfies Meta<typeof CartItems>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const EmptyCart: Story = {
  decorators: [
    (Story) => {
      useCartStore.setState({ cartItems: [] });
      return <Story />;
    },
  ],
};
