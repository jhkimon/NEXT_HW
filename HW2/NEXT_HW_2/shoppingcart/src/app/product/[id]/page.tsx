'use client';
import React from 'react';
import { Button } from '../../../components/common/Button';
import { PRODUCTS } from '../../../constants/common';
import { handleCart } from '../../../features/cart';

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const product = PRODUCTS.find((product) => product.id === parseInt(id));

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="flex flex-col items-center text-center p-12">
            <h1 className="text-2xl font-bold mb-5">{product.name}</h1>
            <p className="text-gray-700 mb-5">{product.description}</p>
            <div className="flex flex-col items-center">
                <Button onClick={handleCart} aria-label="Add to cart">
                    장바구니 담기
                </Button>
            </div>
        </div>
    );
};

export default ProductDetailPage;
