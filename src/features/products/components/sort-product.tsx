import { SortAscIcon, SortDescIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useCartStore } from '@/store/products.store';

export function SortProduct() {
  const setSortBy = useCartStore((state) => state.setSortBy);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" aria-label="sort-button">
          <SortDescIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-45">
        <Button variant="ghost" onClick={() => setSortBy({ type: 'title', order: 'asc' })}>
          Name: A-Z <SortDescIcon size="16" />
        </Button>
        <Button variant="ghost" onClick={() => setSortBy({ type: 'title', order: 'desc' })}>
          Name: Z-A <SortAscIcon size="16" />
        </Button>
        <Button variant="ghost" onClick={() => setSortBy({ type: 'price', order: 'asc' })}>
          Price: Low to High <SortDescIcon size="16" />
        </Button>
        <Button variant="ghost" onClick={() => setSortBy({ type: 'price', order: 'desc' })}>
          Price: High to Low <SortAscIcon size="16" />
        </Button>
      </PopoverContent>
    </Popover>
  );
}
