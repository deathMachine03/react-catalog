import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '@store/useCartStore';
import { useCompareStore } from '@store/useCompareStore';
import { toast } from 'react-toastify';
import { useDrag } from 'react-dnd';
import type { FC } from 'react';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity?: number;
  category: string;
};

type Props = {
  product: Product;
  inCart?: boolean;
};

const ProductCard: FC<Props> = ({ product, inCart = false }) => {
  const addToCart = useCartStore((s) => s.addToCart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);


  const handleAdd = () => {
    const { id, title, price, image } = product;
    addToCart({ id, title, price, image });
    toast.success('Товар добавлен в корзину');
  };

  const handleRemove = () => {
    removeFromCart(product.id);
    toast.info('Товар удалён из корзины');
  };

  const compareList = useCompareStore((s) => s.compareList);
  const addToCompare = useCompareStore((s) => s.addToCompare);
  const removeFromCompare = useCompareStore((s) => s.removeFromCompare);

  const isCompared = compareList.some((p) => p.id === product.id);

  const ref = useRef<HTMLDivElement | null>(null);
  const [, drag] = useDrag(() => ({
    type: 'product',
    item: { product },
  }));

  useEffect(() => {
    if (ref.current) {
      drag(ref.current);
    }
  }, [drag]);


  return (
    <div
       ref={ref}
      className="bg-white rounded-2xl shadow hover:shadow-lg transition-all p-4 flex flex-col cursor-move"
    >
      <Link to={`/product/${product.id}`} className="flex-1">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain mb-4 transition-transform hover:scale-105"
        />
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {product.title}
        </h3>
      </Link>

      <div className="mt-auto flex flex-col gap-2">
        <span className="text-xl font-bold">${product.price}</span>

        {inCart && product.quantity !== undefined && (
          <span className="text-sm text-gray-600">
            Кол-во: {product.quantity}
          </span>
        )}

        {inCart ? (
          <button
            onClick={handleRemove}
            className="bg-red-600 text-black px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Удалить из корзины
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            В корзину
          </button>
        )}
        <button
          onClick={() =>
            isCompared ? removeFromCompare(product.id) : addToCompare(product)
          }
          className={`text-xs px-2 py-1 rounded ${
            isCompared ? 'bg-yellow-500 text-black' : 'bg-gray-200'
          }`}
        >
          {isCompared ? 'Убрать из сравнения' : 'Добавить для сравнения'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
