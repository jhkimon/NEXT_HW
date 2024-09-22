'use client';

import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Product } from '../components/ui/Product';
import { PRODUCTS } from '../constants/common';
import { ProductProps } from '../types';

export default function HomePage() {
    const { cart } = useContext(CartContext);
    return (
        <div className="flex flex-col text-center p-12">
            {PRODUCTS.map((product: ProductProps) => (
                <div key={product.id} className="mb-4">
                    <Product product={product} />
                </div>
            ))}
        </div>
    );
}
