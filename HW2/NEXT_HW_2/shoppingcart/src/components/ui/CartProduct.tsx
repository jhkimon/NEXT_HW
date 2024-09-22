'use client';

import React from 'react';
import { Button } from '../common/Button';
import { CartItem } from '../../types';
import { handleRemoveCart } from '../../features/cart';

interface CartProductProps {
    product: CartItem;
}

export const CartProduct: React.FC<CartProductProps> = ({ product }) => {
    return (
        <div className="w-full flex justify-between items-center flex-auto p-4 shadow-lg rounded-lg cursor-pointer">
            <div className="flex flex-col gap-4">
                <h2
                    dangerouslySetInnerHTML={{
                        __html: product.name.replace(/\\n/g, '<br/>'),
                    }}
                    className="text-black text-start font-bold text-lg leading-snug break-words overflow-hidden line-clamp-2 to-transparent"
                />
                <div className="w-8/12 text-gray-500 text-start font-medium text-base leading-relaxed break-words overflow-hidden line-clamp-2">
                    {product.description}
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <Button onClick={() => handleRemoveCart(product.id)} aria-label="Remove product from cart">
                    제거하기
                </Button>
            </div>
        </div>
    );
};
