import { useCartStore } from '@store/useCartStore';
import ProductList from '../components/ProductList';
import CartDropZone from '../components/CartDropZone';

function Cart() {
  const cart = useCartStore((s) => s.cart);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Корзина</h1>

      <CartDropZone>
        {cart.length === 0 ? (
          <p className="text-gray-500">Товары в корзине</p>
        ) : (
          <ProductList products={cart} inCart />
        )}
      </CartDropZone>
    </div>
  );
}

export default Cart;
