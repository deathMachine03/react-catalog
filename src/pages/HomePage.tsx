import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  fetchProducts,
  fetchProductsByCategory,
} from '../services/api';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import Pagination from '../components/Pagination';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
  const [currentPage, setCurrentPageState] = useState(pageFromUrl);

  const itemsPerPage = 8;

  const setCurrentPage = (page: number) => {
    setCurrentPageState(page);
    searchParams.set('page', String(page));
    setSearchParams(searchParams);
  };

  useEffect(() => {
    setLoading(true);
    const load = category
      ? fetchProductsByCategory(category)
      : fetchProducts();
    load
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [category]);

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold p-4">Каталог товаров</h1>

      <SearchBar
        onSearch={(query) => {
          setSearchQuery(query);
          setCurrentPage(1);
        }}
      />

      <FilterPanel
        selectedCategory={category}
        onSelect={(cat) => {
          setCategory(cat);
          setCurrentPage(1);
        }}
      />

      {loading ? (
        <p className="p-4">Загрузка товаров...</p>
      ) : (
        <>
          <ProductList products={paginated} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

export default HomePage;
