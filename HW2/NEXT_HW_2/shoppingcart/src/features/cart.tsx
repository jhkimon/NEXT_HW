import { CartItem } from '../types';
import { useCartStore } from '../store/CartStore';

export const handleAddToCart = (product: CartItem) => {
    const cart = useCartStore.getState().cart;
    const setCart = useCartStore.getState().setCart;

    if (cart.find((item) => item.id === product.id)) {
        alert('이미 장바구니에 추가된 상품입니다.');
        return;
    }

    const newCart = [...cart, product];
    setCart(newCart);

    alert('장바구니에 추가되었습니다.');
};

export const handleClearCart = () => {
    const setCart = useCartStore.getState().setCart;
    setCart([]);
};

export const handleRemoveCart = (id: number) => {
    const cart = useCartStore.getState().cart;
    const setCart = useCartStore.getState().setCart;

    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
};

export const handleDescription = (router: NextRouter, product: CartItem) => {
    router.push(`/product/${product.id}`);
};
