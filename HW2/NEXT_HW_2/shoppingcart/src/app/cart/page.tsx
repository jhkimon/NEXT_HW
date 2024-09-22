'use client';

import React from 'react';
import { useCartStore } from '../../store/CartStore';
import { CartProduct } from '../../components/ui/CartProduct';
import { Button } from '../../components/common/Button';
import { handleClearCart } from '../../features/cart';

const CartPage: React.FC = () => {
    const cart = useCartStore((state) => state.cart);

    return (
        <div className="flex flex-col items-center p-12">
            <h1 className="text-2xl font-bold mb-5">장바구니</h1>
            {cart.length === 0 ? (
                <p>장바구니가 비어있습니다.</p>
            ) : (
                <div className="w-full max-w-3xl">
                    {cart.map((item) => (
                        <div key={item.id} className="mb-4">
                            {' '}
                            <CartProduct product={item} />
                        </div>
                    ))}
                    <Button
                        onClick={handleClearCart}
                        aria-label="Clear Cart"
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 mt-4"
                    >
                        Clear Cart
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CartPage;
