'use client';

import React from 'react';
import { Button } from '../common/Button';
import { useRouter } from 'next/navigation';
import { CartItem } from '../../types/index';
import { handleDescription } from '../../features/cart';
import { handleAddToCart } from '../../features/cart';

export interface CartItemComponentProps {
    product: CartItem;
    [key: string]: any;
}

export const Product: React.FC<CartItemComponentProps> = ({ product, ...rest }) => {
    const router = useRouter();

    return (
        <div
            {...rest}
            className="w-full flex justify-between items-center flex-auto p-4 shadow-lg rounded-lg cursor-pointer"
        >
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
                <Button onClick={() => handleDescription(router, product)} aria-label="View product details">
                    제품 설명 보기
                </Button>
                <Button onClick={() => handleAddToCart(product)} aria-label="Add to cart">
                    장바구니 담기
                </Button>
            </div>
        </div>
    );
};