import { api } from "./apiService";

export const CategoryService = {
    createCategory: (dto) =>
        api.post("/categories", dto),

    getAllCategories: () =>
        api.get("/categories"),
}