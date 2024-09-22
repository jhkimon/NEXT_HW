'use client';

import React, { useContext } from 'react';
import { Button } from '../common/Button';
import { useRouter } from 'next/navigation';
import { ProductComponentProps } from '../../types/index';
import { handleDescription } from '../../features/cart';
import { CartContext } from '../../context/CartContext';

export const Product: React.FC<ProductComponentProps> = ({ product, ...rest }) => {
    const router = useRouter();
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        console.error('CartContext is undefined. Make sure the component is wrapped in CartProvider.');
        return null;
    }

    const { addToCart } = cartContext;

    const handleAddToCart = () => {
        if (product) {
            addToCart({
                id: product.id,
                name: product.name,
            });
        }
        alert(`${product.name}이(가) 장바구니에 추가되었습니다.`);
    };

    return (
        <div
            {...rest}
            className="w-full flex justify-between items-center flex-auto p-3 shadow-lg rounded-lg cursor-pointer"
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
                <Button onClick={handleAddToCart} aria-label="Add to cart">
                    장바구니 담기
                </Button>
            </div>
        </div>
    );
};
