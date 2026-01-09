import { AccountShortDTO } from "./AccountDTOs";
import { ProductShortDTO } from "./ProductDTOs";

export interface PurchaseShortDTO {
    id: number,
    amount: number,
    status: string //make enum later
}

export type PurchaseShortDTOList = PurchaseShortDTO[];

export interface PurchaseDTO {
    id: number,
    amount: number,
    status: string, //make enum later
    productDTO: ProductShortDTO,
    userDTO: AccountShortDTO
}

export type PurchaseDTOList = PurchaseDTO[];

