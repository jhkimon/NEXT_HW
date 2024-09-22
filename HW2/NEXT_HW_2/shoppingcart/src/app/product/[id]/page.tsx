'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '../../../components/common/Button';
import { PRODUCTS } from '../../../constants/common';
import { CartItem } from '../../../types';
import { handleAddToCart } from '../../../features/cart';

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [product, setProduct] = useState<CartItem | null>(null);

    useEffect(() => {
        const foundProduct = PRODUCTS.find((p) => p.id === parseInt(id));
        setProduct(foundProduct || null);
    }, [id]);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="flex flex-col items-center text-center p-12">
            <h1 className="text-2xl font-bold mb-5">{product.name}</h1>
            <p className="text-gray-700 mb-5">{product.description}</p>
            <div className="flex flex-col items-center">
                <Button onClick={() => handleAddToCart(product)} aria-label="Add to cart">
                    장바구니 담기
                </Button>
            </div>
        </div>
    );
};

export default ProductDetailPage;
