import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import { ShopNav } from '@/components/layout/components/shop-nav';

const meta = {
  title: 'Shopping Cart/ShopNav',
  component: ShopNav,
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
      return <RouterProvider router={router} />;
    },
  ],
} satisfies Meta<typeof ShopNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
