import { Link } from 'react-router-dom';
import { useCartStore } from '@store/useCartStore';
import { useCompareStore } from '@store/useCompareStore';
import CartDropZone from './CartDropZone';
import CompareDropZone from './CompareDropZone';

function Header() {
  const cart = useCartStore((s) => s.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const compareList = useCompareStore((s) => s.compareList);


  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow flex justify-between items-center px-8 h-14 border-b">
      <Link
        to="/catalog"
        className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition"
      >
        🛍 Магазин
      </Link>

      <div className="flex gap-4 items-center">
        <CartDropZone>
          <Link to="/cart" className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition">
            <span className="text-xl">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </CartDropZone>

        <CompareDropZone>
          <Link to="/compare" className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition">
            <span className="text-xl">🧮</span>
            {compareList.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-600 text-white text-[10px] px-1.5 rounded-full">
                {compareList.length}
              </span>
            )}
          </div>
          </Link>
        </CompareDropZone>


      </div>
    </header>
  );
}

export default Header;
