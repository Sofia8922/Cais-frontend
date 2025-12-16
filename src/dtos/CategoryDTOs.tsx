export interface CategoryDTO {
    id: number;
    name: string;
    subcategories: SubCategoryShortDTO[];
}


export interface CategoryShortDTO {
    id: number;
    name: string;
}

export type CategoryDTOList = CategoryDTO[];

export interface SubCategoryDTO {
    id: number;
    name: string;
    category: CategoryShortDTO
}

export interface SubCategoryShortDTO {
    id: number;
    name: string;
}


export type SubCategoryDTOList = SubCategoryDTO[];
