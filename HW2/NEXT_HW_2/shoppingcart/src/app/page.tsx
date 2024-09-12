import React from 'react';
import { Product } from '../components/ui/Product';
import { PRODUCTS } from '../constants/common';
import { ProductProps } from '../types';

export default function HomePage() {
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
