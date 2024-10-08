export type ProductDetails = {
    name: string;
    price: string;
    link?: string;
    key: string;
}

export interface ProductData {
    data: Omit<ProductDetails, 'key'>[];
}

export enum Views {
    INPUT_VIEW = 'INPUT_VIEW',
    OUTPUT_VIEW = 'OUTPUT_VIEW',
}