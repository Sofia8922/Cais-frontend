export interface ProductDTO {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageLink: string;
    subCategory: any;
    purchases: any;
}

export type ProductDTOList = ProductDTO[];

export interface ProductCreateDTO {
    name: string;
    description: string;
    price: number;
    stock: number;
    imageLink: string;
    subcategoryId: number;
}
