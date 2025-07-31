import { Link } from 'react-router-dom';
import { useCartStore } from '@store/useCartStore';
import CartDropZone from './CartDropZone';

function Header() {
  const cart = useCartStore((s) => s.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow flex justify-between items-center px-6 py-2 h-22 border-b">
      <Link to="/catalog" className="text-xl font-bold text-blue-600 hover:text-blue-700 transition">
        Catalog
      </Link>

      <CartDropZone>
        <div className="relative w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition">
          <Link to="/cart" className="flex items-center justify-center">
            <span className="text-xl">🛒</span>
          </Link>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1.5 rounded-full">
              {totalItems}
            </span>
          )}
        </div>
      </CartDropZone>
    </header>
  );
}

export default Header;
