import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { useCartStore } from '@store/useCartStore';
import { toast } from 'react-toastify';

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
};

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const addToCart = useCartStore((s) => s.addToCart);

  useEffect(() => {
    if (!id) return;
    fetchProductById(id)
      .then(setProduct)
      .catch(() => setError('Не удалось загрузить товар'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAdd = () => {
    if (!product) return;
    const { id, title, price, image } = product;
    addToCart({ id, title, price, image });
    toast.success('Товар добавлен в корзину');
  };

  if (loading) return <p className="p-4">Загрузка...</p>;
  if (error || !product) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col md:flex-row gap-8">
      <img
        src={product.image}
        alt={product.title}
        className="w-full md:w-1/2 h-96 object-contain rounded"
      />
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-xl font-semibold mb-6">${product.price}</p>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-black px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Добавить в корзину
        </button>
      </div>
    </div>
  );
}

export default ProductPage;
