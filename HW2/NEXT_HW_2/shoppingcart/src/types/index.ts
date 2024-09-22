// types/index.ts

export interface ProductProps {
    id: number;
    name: string;
    description: string;
}

export interface ProductComponentProps {
    product: ProductProps;
    [key: string]: any;
}

export interface CartItem {
    id: number;
    name: string;
}

export interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
}
