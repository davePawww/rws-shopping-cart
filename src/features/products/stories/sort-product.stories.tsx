import type { Meta, StoryObj } from '@storybook/react-vite';

import { SortProduct } from '@/features/products/components/sort-product';

const meta = {
  title: 'Shopping Cart/Sort Product',
  component: SortProduct,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof SortProduct>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
