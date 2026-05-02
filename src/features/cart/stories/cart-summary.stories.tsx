import type { Meta, StoryObj } from '@storybook/react-vite';

import { CartSummary } from '@/features/cart/components/cart-summary';
import { useCartStore } from '@/store/products.store';

const meta = {
  title: 'Shopping Cart/Cart Summary',
  component: CartSummary,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  decorators: [
    (Story) => {
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

      return <Story />;
    },
  ],
} satisfies Meta<typeof CartSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
