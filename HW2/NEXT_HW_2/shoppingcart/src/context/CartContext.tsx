'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, CartContextType } from '../types';

// CartContext 생성
export const CartContext = createContext<CartContextType>({
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
});

// CartProvider 컴포넌트의 props 타입 정의
interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]); // 초기 상태는 빈 배열

    // 클라이언트 사이드에서 localStorage에서 cart 데이터를 불러옴
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                setCart(JSON.parse(savedCart));
            }
        }
    }, []);

    useEffect(() => {
        // cart 상태가 변경될 때마다 localStorage에 저장
        if (typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

    const addToCart = (item: CartItem) => {
        // 중복 여부 확인 후 추가
        const exists = cart.some((cartItem) => cartItem.id === item.id);
        if (exists) {
            alert(`${item.name}은(는) 이미 장바구니에 추가되어 있습니다.`);
            return;
        }
        setCart([...cart, item]);
    };

    const removeFromCart = (id: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>{children}</CartContext.Provider>
    );
};
