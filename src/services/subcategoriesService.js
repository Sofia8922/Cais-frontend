import { api } from "./apiService";

export const SubcategoriesService = {
    createSubcategory: (dto) =>
        api.post("/subcategories", dto),

    getAllSubcategories: () =>
        api.get("subcategories"),
}