import { create } from 'zustand';
import { CartItem } from '../types';
import { persist } from 'zustand/middleware';

interface CartState {
    cart: CartItem[];
    setCart: (cart: CartItem[]) => void;
}

export const useCartStore = create<CartState>(
    persist(
        (set) => ({
            cart: [],
            setCart: (cart) => set({ cart }),
        }),
        {
            name: 'cart-storage',
        }
    )
);
