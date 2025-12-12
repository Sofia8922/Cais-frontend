//all product endpoints originate her!

import { api } from "./apiService";

export const ProductService = {
    createProduct: (dto) =>
        api.post("/products", dto),

    getAllProducts: () =>
        api.get("/products"),
    
    getProductById: (id) =>
        api.get(`/products/${id}`),

    editProduct: (id, dto) =>
        api.put(`/products/${id}`, dto),

    deleteProduct: (id) =>
        api.delete(`/products/${id}`),
};