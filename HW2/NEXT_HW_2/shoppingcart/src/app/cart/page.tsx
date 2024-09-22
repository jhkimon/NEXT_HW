'use client';

import React, { useContext } from 'react';
import { Button } from '../../components/common/Button';
import { CartContext } from '../../context/CartContext';
import { CartItem } from '../../types';

const CartPage: React.FC = () => {
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        return <div>장바구니를 불러오는 중 오류가 발생했습니다.</div>;
    }

    const { cart, removeFromCart, clearCart } = cartContext;

    const handleRemove = (id: string) => {
        removeFromCart(id);
    };

    const handleClearCart = () => {
        if (cart.length === 0) {
            alert('장바구니가 이미 비어 있습니다.');
            return;
        }
        if (confirm('정말로 장바구니를 비우시겠습니까?')) {
            clearCart();
            alert('장바구니가 비워졌습니다.');
        }
    };

    return (
        <div className="flex flex-col items-center p-12">
            <h1 className="text-2xl font-bold mb-5">장바구니</h1>
            {cart.length === 0 ? (
                <p>장바구니가 비어있습니다.</p>
            ) : (
                <>
                    <div className="w-full max-w-3xl">
                        {cart.map((item: CartItem) => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center w-full mb-4 p-4 border rounded"
                            >
                                <div>
                                    <h2 className="text-xl font-semibold">{item.name}</h2>
                                    <p className="text-gray-600">{item.description}</p>
                                </div>
                                <Button
                                    onClick={() => handleRemove(item.id)}
                                    aria-label={`Remove ${item.name}`}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                                >
                                    Remove
                                </Button>
                            </div>
                        ))}
                    </div>
                    <div className="w-full max-w-3xl mt-4 flex justify-between items-center">
                        <p className="text-xl font-bold">
                            총 가격: {cart.reduce((total, item) => total + item.price, 0).toLocaleString()}원
                        </p>
                        <div className="flex space-x-4">
                            <Button
                                onClick={handleClearCart}
                                aria-label="Clear Cart"
                                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700"
                            >
                                Clear Cart
                            </Button>
                            <Button
                                onClick={() => alert('Checkout 기능은 아직 구현되지 않았습니다.')}
                                aria-label="Checkout"
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Checkout
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
