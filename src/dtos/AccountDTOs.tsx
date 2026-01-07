import { ProductDTOList } from "./ProductDTOs";
import { PurchaseDTOList } from "./PurchaseDTOs";

export interface AccountDTO {
    id: number;
    username: string;
    email: string;
    address: string;
    phoneNumber: string;
    favorites: ProductDTOList;
    recentOrders: PurchaseDTOList;
    roles: string[];
}

export interface AccountShortDTO { // not set up yet i think
    id: number;
    username: string;
    email: string;
    address: string;
    phoneNumber: string; 
}