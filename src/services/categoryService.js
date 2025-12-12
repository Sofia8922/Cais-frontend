import { api } from "./apiService";

export const CategoryService = {
    createCategory: (dto) =>
        api.post("/categories", dto),

    updateCategory: (id, dto) =>
        api.put(`/categories/${id}`, dto),

    deleteCategory: (id) => 
        api.delete(`/categories/${id}`),

    getAllCategories: () =>
        api.get("/categories"),
}