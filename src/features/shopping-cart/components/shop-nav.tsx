import { Link } from '@tanstack/react-router';
import { FaCartArrowDown } from 'react-icons/fa';

export function ShopNav() {
  return (
    <div className="flex w-full items-center justify-between px-2">
      <Link to="/" aria-label="link to home">
        <p className="text-md font-medium">Products</p>
      </Link>
      <Link to="/cart" aria-label="link to cart">
        <FaCartArrowDown size={24} />
      </Link>
    </div>
  );
}
