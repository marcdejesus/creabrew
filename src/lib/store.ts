import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type CartState = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find((i) => i.id === item.id);

        if (existingItem) {
          return set((state) => {
            const updatedItems = state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            );
            return {
              items: updatedItems,
              totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
              totalPrice: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
            };
          });
        }

        const newItem = { ...item, quantity: 1 };
        return set((state) => {
          const updatedItems = [...state.items, newItem];
          return {
            items: updatedItems,
            totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
            totalPrice: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
          };
        });
      },

      removeItem: (id) => {
        return set((state) => {
          const updatedItems = state.items.filter((i) => i.id !== id);
          return {
            items: updatedItems,
            totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
            totalPrice: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
          };
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) return get().removeItem(id);

        return set((state) => {
          const updatedItems = state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          );
          return {
            items: updatedItems,
            totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
            totalPrice: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
          };
        });
      },

      clearCart: () => {
        return set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        });
      },
    }),
    { name: 'cart-storage' }
  )
); 