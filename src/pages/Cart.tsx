import { useCartStore } from '@store/useCartStore';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import CartDropZone from '../components/CartDropZone';

function Cart() {
  const cart = useCartStore((s) => s.cart);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Корзина</h1>

      <CartDropZone>
        {cart.length === 0 ? (
          <div className=" max-w-4xl mx-auto text-center text-gray-500">
          <p className="text-gray-500">Товары в корзине отсутсвуют</p>
        <Link to="/catalog" className="text-blue-600 hover:underline mt-4 block">
          ← Вернуться в каталог
        </Link>
          </div>

        ) : (
          <ProductList products={cart} inCart />
        )}
      </CartDropZone>
    </div>
  );
}

export default Cart;
