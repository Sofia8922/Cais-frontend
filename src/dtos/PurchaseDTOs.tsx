import { ProductShortDTO } from "./ProductDTOs";

export interface PurchaseShortDTO {
    amount: number,
    status: string //make enum later
}

export type PurchaseShortDTOList = PurchaseShortDTO[];

export interface PurchaseDTO {
    id: number,
    amount: number,
    status: string, //make enum later
    productDTO: ProductShortDTO
}

export type PurchaseDTOList = PurchaseDTO[];