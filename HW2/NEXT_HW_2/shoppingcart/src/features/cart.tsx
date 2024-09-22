import { ProductProps } from '../types';

export const handleDescription = (router: NextRouter, product: ProductProps) => {
    router.push(`/product/${product.id}`);
};
