import { SubCategoryDTO } from "./CategoryDTOs";
import { PurchaseDTOList } from "./PurchaseDTOs";

export interface ProductDTO {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageLink: string;
    subcategory: SubCategoryDTO;
    purchases: PurchaseDTOList;
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
