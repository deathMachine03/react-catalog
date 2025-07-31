import type { ChangeEvent } from 'react';
import { useMemo } from 'react';
import debounce from 'lodash.debounce';

type Props = {
  onSearch: (query: string) => void;
};

function SearchBar({ onSearch }: Props) {
  const debouncedSearch = useMemo(() => debounce(onSearch, 400), [onSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        onChange={handleChange}
        placeholder="Поиск товаров..."
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
}

export default SearchBar;
