import { useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useCartStore } from '@store/useCartStore';
import { toast } from 'react-toastify';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type Props = {
  children: React.ReactNode;
};

function CartDropZone({ children }: Props) {
  const addToCart = useCartStore((s) => s.addToCart);
  const dropRef = useRef<HTMLDivElement | null>(null);

  const [{ isOver, canDrop }, connectDrop] = useDrop<
    { product: Product },
    void,
    { isOver: boolean; canDrop: boolean }
  >(() => ({
    accept: 'product',
    drop: (item) => {
      const { id, title, price, image } = item.product;
      addToCart({ id, title, price, image });
      toast.success(`Добавлено: ${title}`);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  useEffect(() => {
    if (dropRef.current) {
      connectDrop(dropRef.current);
    }
  }, [connectDrop]);

  return (
    <div
      ref={dropRef}
      className={`p-4 rounded-xl border-4 transition-all min-h-[50px] ${
        isOver
          ? 'border-green-600 bg-green-100'
          : canDrop
          ? 'border-blue-400 bg-blue-50'
          : 'border-transparent'
      }`}
    >
      {children}
    </div>
  );
}

export default CartDropZone;
