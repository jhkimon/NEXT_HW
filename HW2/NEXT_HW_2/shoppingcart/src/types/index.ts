export interface ProductProps {
    id: number;
    name: string;
    description: string;
}

export interface ProductComponentProps {
    product: ProductProps;
    [key: string]: any;
}
