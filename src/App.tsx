import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Layout from '@/components/layout/components/layout';
import ShoppingCart from '@/pages/shopping-cart.page';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <ShoppingCart />
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
