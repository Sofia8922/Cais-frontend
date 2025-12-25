import { SubCategoryDTO } from "./CategoryDTOs";
import { PurchaseShortDTOList } from "./PurchaseDTOs";

export interface ProductDTO {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageLink: string;
    subcategory: SubCategoryDTO;
    purchases: PurchaseShortDTOList;
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
export interface ProductEditDTO {
    name: string;
    description: string;
    price: number;
    stock: number;
    imageLink: string;
    subcategoryId: number;
}

export interface ProductShortDTO {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageLink: string;
    subcategory: SubCategoryDTO;
}