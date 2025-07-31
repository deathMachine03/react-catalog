import ProductCard from './ProductCard';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity?: number;
};

type Props = {
  products: Product[];
  inCart?: boolean;
};

function ProductList({ products, inCart = false }: Props) {
  if (products.length === 0) {
    return <p className="text-gray-500 text-center py-10">Товары не найдены.</p>;
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} inCart={inCart} />
      ))}
    </div>
  );
}

export default ProductList;
