import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type CartItem = Product & {
  quantity: number;
};

type CartState = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

export const useCartStore = create(
  persist<CartState>(
    (set) => ({
      cart: [],

      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.find((item) => item.id === product.id);

          let newCart;
          if (existing) {
            newCart = state.cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            console.log(` количество товара ${product.id}`);
          } else {
            newCart = [...state.cart, { ...product, quantity: 1 }];
            console.log(` новый товар ${product.id}`);
          }

          console.log('Новая корзина:', newCart);
          return { cart: newCart };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
