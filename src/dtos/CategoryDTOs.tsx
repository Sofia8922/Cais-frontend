export interface SubCategoryDTO {
    id: number;
    name: string;
    category: CategoryShortDTO;
}

export interface CategoryShortDTO {
    id: number;
    name: string;
}

export type SubCategoryDTOList = SubCategoryDTO[];