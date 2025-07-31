import { useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useCompareStore } from '@store/useCompareStore';
import { toast } from 'react-toastify';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};

type Props = {
  children: React.ReactNode;
};

function CompareDropZone({ children }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const addToCompare = useCompareStore((s) => s.addToCompare);

  const [{ isOver, canDrop }, drop] = useDrop<
    { product: Product },
    void,
    { isOver: boolean; canDrop: boolean }
  >({
    accept: 'product',
    drop: (item) => {
      addToCompare(item.product);
      toast.success(`Добавлено в сравнение: ${item.product.title}`);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  useEffect(() => {
    if (ref.current) drop(ref.current);
  }, [drop]);

  return (
    <div
      ref={ref}
      className={`transition-all rounded-lg ${
        isOver
          ? 'bg-yellow-100 border-2 border-yellow-600'
          : canDrop
          ? 'bg-yellow-50 border-2 border-yellow-400'
          : ''
      }`}
    >
      {children}
    </div>
  );
}

export default CompareDropZone;
