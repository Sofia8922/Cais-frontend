export interface CategoryDTO {
    id: number;
    name: string;
    subcategories: SubCategoryShortDTO[];
}

export interface SubCategoryShortDTO {
    id: number;
    name: string;
}

export type CategoryDTOList = CategoryDTO[];