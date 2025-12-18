export interface PurchaseShortDTO {
    amount: number,
    status: string //make enum later
}

export type PurchaseDTOList = PurchaseShortDTO[];