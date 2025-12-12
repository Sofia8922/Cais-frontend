import { SubCategoryDTO } from "./CategoryDTOs";

export interface ProductDTO {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageLink: string;
    subcategory: SubCategoryDTO;
    purchases: any;
}


export type ProductDTOList = ProductDTO[];
