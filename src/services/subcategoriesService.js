import { api } from "./apiService";

export const SubcategoriesService = {
    createSubcategory: (dto) =>
        api.post("/subcategories", dto),

    updateSubcategory: (id, dto) => 
        api.put(`/sibcategories/${id}`, dto),

    deleteSubcategory: (id) => 
        api.delete(`/subcategories/${id}`),

    getAllSubcategories: () =>
        api.get("subcategories"),
}