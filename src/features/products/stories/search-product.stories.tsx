import type { Meta, StoryObj } from '@storybook/react-vite';

import { SearchProduct } from '@/features/products/components/search-product';

const meta = {
  title: 'Shopping Cart/Search Product',
  component: SearchProduct,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof SearchProduct>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
