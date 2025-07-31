import { useCompareStore } from '@store/useCompareStore';
import { Link } from 'react-router-dom';

function ComparePage() {
  const compareList = useCompareStore((s) => s.compareList);
  const removeFromCompare = useCompareStore((s) => s.removeFromCompare);
  const clearCompare = useCompareStore((s) => s.clearCompare);

  if (compareList.length === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center text-gray-500">
        <p className="text-lg">Вы не выбрали товары для сравнения.</p>
        <Link to="/catalog" className="text-blue-600 hover:underline mt-4 block">
          ← Вернуться в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Сравнение товаров</h1>
        <button
          onClick={clearCompare}
          className="bg-red-600 text-black text-sm px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Очистить всё
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
        <table className="w-full min-w-[600px] text-sm text-gray-800">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="p-4 w-48 font-medium">Характеристика</th>
              {compareList.map((item) => (
                <th key={item.id} className="p-4 relative border-l border-gray-200 bg-white">
                  <button
                    onClick={() => removeFromCompare(item.id)}
                    className="absolute top-2 right-3 text-xs text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                  <div className="flex flex-col items-start gap-2">
                    <img src={item.image} alt={item.title} className="h-20 object-contain" />
                    <span className="font-semibold text-sm leading-tight line-clamp-2">
                      {item.title}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr className="hover:bg-gray-50 border-t">
              <td className="p-4 font-medium bg-gray-50">Цена</td>
              {compareList.map((item) => (
                <td key={item.id} className="p-4">${item.price}</td>
              ))}
            </tr>

            <tr className="hover:bg-gray-50 border-t">
              <td className="p-4 font-medium bg-gray-50">Категория</td>
              {compareList.map((item) => (
                <td key={item.id} className="p-4">{item.category}</td>
              ))}
            </tr>

            <tr className="hover:bg-gray-50 border-t">
              <td className="p-4 font-medium bg-gray-50">Рейтинг</td>
              {compareList.map((item) => (
                <td key={item.id} className="p-4">
                  {item.rating?.rate ?? '—'} ⭐ ({item.rating?.count ?? 0})
                </td>
              ))}
            </tr>

            <tr className="hover:bg-gray-50 border-t">
              <td className="p-4 font-medium bg-gray-50">Описание</td>
              {compareList.map((item) => (
                <td key={item.id} className="p-4 text-gray-600 text-sm">
                  {item.description?.slice(0, 150) ?? '—'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComparePage;
