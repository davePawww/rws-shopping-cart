import { Link } from '@tanstack/react-router';
import { FaCartArrowDown } from 'react-icons/fa';

import { useCartStore } from '@/store/products.store';

export function ShopNav() {
  const cartItems = useCartStore((state) => state.cartItems);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="flex w-full items-center justify-between px-2">
      <Link to="/" aria-label="link to home">
        <p className="text-md font-medium">Products</p>
      </Link>
      <Link to="/cart" aria-label="link to cart" className="relative">
        <FaCartArrowDown size={24} />
        {cartItemCount > 0 && (
          <span className="absolute top-3 -right-2 z-50 size-4 rounded-full bg-red-400 p-0.5 text-center text-xs">
            {cartItemCount}
          </span>
        )}
      </Link>
    </div>
  );
}
