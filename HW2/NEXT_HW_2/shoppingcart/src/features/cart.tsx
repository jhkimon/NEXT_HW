import { ProductProps } from '../types';

export const handleCart = (product: ProductProps) => {
    alert('장바구니에 추가되었습니다.');
};

export const handleDescription = (router: NextRouter, product: ProductProps) => {
    router.push(`/product/${product.id}`);
};
