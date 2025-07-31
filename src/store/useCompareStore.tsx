import { create } from 'zustand';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  rating?: {
    rate: number;
    count: number;
  };
};

type CompareState = {
  compareList: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (id: number) => void;
  clearCompare: () => void;
};

// 🔁 Получить начальное состояние из localStorage
const loadFromLocalStorage = (): Product[] => {
  try {
    const stored = localStorage.getItem('compareList');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const useCompareStore = create<CompareState>((set, get) => ({
  compareList: loadFromLocalStorage(),

  addToCompare: (product) =>
    set((state) => {
      const alreadyExists = state.compareList.some((p) => p.id === product.id);
      if (alreadyExists) return state;

      const updated = [...state.compareList, product];
      localStorage.setItem('compareList', JSON.stringify(updated));

      return { compareList: updated };
    }),

  removeFromCompare: (id) => {
    const updated = get().compareList.filter((p) => p.id !== id);
    localStorage.setItem('compareList', JSON.stringify(updated));
    set({ compareList: updated });
  },

  clearCompare: () => {
    localStorage.removeItem('compareList');
    set({ compareList: [] });
  },
}));
