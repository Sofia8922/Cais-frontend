//account endpoints are all here!

import { api } from "./apiService";

export const AccountService = {
    register: (dto) =>
        api.postUser("/accounts", dto),

    login: (dto) => 
        api.postUser("/accounts/login", dto),

    getAllAccounts: () => api.get("/accounts"),

    getAccountById: (id) => api.get(`/accounts/${id}`),

    addToCart: (accountId, productId, amount = 1) =>
    api.post(`/accounts/${accountId}/cart/${productId}?amount=${amount}`),
    
    removeFromCart: (accountId, productId, amount = 1) => 
        api.delete(`/accounts/${accountId}/cart/${productId}?amount=${amount}`),

    clearCart: (accountId) => api.post(`/accounts/${accountId}/cart`),

    addToFavorites: (accountId, productId) =>
        api.post(`/accounts/${accountId}/favorites/${productId}`),

    removeFromFavorites: (accountId, productId) =>
        api.delete(`/accounts/${accountId}/favorites/${productId}`),
    
    editAccount: (id, data) => api.post(`/accounts/${id}`, data),
    
    deleteAccount: (id) => api.delete(`/accounts/${id}`),

    checkout: (accountId) => api.post(`/accounts/${accountId}/checkout`),
};