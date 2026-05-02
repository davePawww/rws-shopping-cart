import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCartStore } from '@/store/products.store';

export function SearchProduct() {
  const searchItem = useCartStore((state) => state.searchItem);
  const setSearchItem = useCartStore((state) => state.setSearchItem);

  return (
    <div className="mt-6 flex w-full gap-2">
      <Label htmlFor="search-bar">Search:</Label>
      <Input
        data-testid="search-input"
        type="text"
        id="search-bar"
        className="w-full"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
      />
    </div>
  );
}
