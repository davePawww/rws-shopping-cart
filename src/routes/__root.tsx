import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { motion } from 'motion/react';

import Footer from '@/components/layout/components/footer';
import Header from '@/components/layout/components/header';
import { ShopNav } from '@/components/layout/components/shop-nav';
import { Toaster } from '@/components/ui/sonner';
import { useThemeSync } from '@/hooks/use-theme-sync';
import type { RouterContext } from '@/types/common.types';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  useThemeSync();

  return (
    <>
      <div className="mx-auto flex h-dvh max-w-6xl flex-col overflow-hidden p-4">
        <Header
          title="04-shopping-cart"
          projectLink="https://github.com/davePawww/rws-shopping-cart"
        />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'backIn' }}
          className="full-shadow my-4 flex flex-1 flex-col justify-start overflow-y-auto rounded-lg border p-4"
        >
          <ShopNav />
          <Outlet />
          <Toaster />
        </motion.main>
        <Footer />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackRouterDevtools initialIsOpen={false} />
    </>
  );
}
