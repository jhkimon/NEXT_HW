'use client';

import React, { useContext, useEffect, useState } from 'react';
import { Button } from '../../../components/common/Button';
import { PRODUCTS } from '../../../constants/common';
import { CartContext } from '../../../context/CartContext';
import { ProductProps } from '../../../types';

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [product, setProduct] = useState<ProductProps | null>(null);
    const cartContext = useContext(CartContext);

    useEffect(() => {
        const foundProduct = PRODUCTS.find((p) => p.id === parseInt(id));
        setProduct(foundProduct || null);
    }, [id]);

    if (!cartContext) {
        return <div>장바구니를 불러오는 중 오류가 발생했습니다.</div>;
    }

    const { cart, addToCart } = cartContext;

    if (!product) {
        return <div>Product not found</div>;
    }

    const handleAddToCart = () => {
        const isInCart = cart.some((cartItem) => cartItem.id === product.id);

        if (isInCart) {
            alert(`${product.name}은(는) 이미 장바구니에 있습니다.`);
        } else {
            addToCart({
                id: product.id,
                name: product.name,
            });
            alert(`${product.name}이(가) 장바구니에 추가되었습니다.`);
        }
    };

    return (
        <div className="flex flex-col items-center text-center p-12">
            <h1 className="text-2xl font-bold mb-5">{product.name}</h1>
            <p className="text-gray-700 mb-5">{product.description}</p>
            <div className="flex flex-col items-center">
                <Button onClick={handleAddToCart} aria-label="Add to cart">
                    장바구니 담기
                </Button>
            </div>
        </div>
    );
};

export default ProductDetailPage;
