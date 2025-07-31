import { useEffect, useState } from 'react';
import type { FC } from 'react';
import type { MouseEvent } from 'react';

type Props = {
  selectedCategory: string;
  onSelect: (category: string) => void;
};

const FilterPanel: FC<Props> = ({ selectedCategory, onSelect }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then(setCategories)
      .finally(() => setLoading(false));
  }, []);

  const handleClick = (e: MouseEvent<HTMLButtonElement>, category: string) => {
    e.preventDefault();
    onSelect(category);
  };

  return (
    <div className="p-4 flex flex-wrap gap-3">
      <button
        className={`px-3 py-1 rounded border ${
          selectedCategory === '' ? 'bg-blue-600 text-black' : ''
        }`}
        onClick={(e) => handleClick(e, '')}
      >
        Все
      </button>
      {loading ? (
        <span className="text-gray-500">Загрузка категорий...</span>
      ) : (
        categories.map((cat) => (
          <button
            key={cat}
            className={`px-3 py-1 rounded border ${
              selectedCategory === cat ? 'bg-blue-600 text-black' : ''
            }`}
            onClick={(e) => handleClick(e, cat)}
          >
            {cat}
          </button>
        ))
      )}
    </div>
  );
};

export default FilterPanel;
