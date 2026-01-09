//account endpoints are all here!

import { api } from "./apiService";

export const AccountService = {
    register: (dto) =>
        api.postUser("/accounts/register", dto),

    login: (dto) => 
        api.postUser("/accounts/login", dto),

    logout: () => 
        api.postUser("/accounts/logout", null),

    getAllAccounts: () => api.get("/accounts"),

    getAccountById: (id) => api.get(`/accounts/${id}`),

    addToCart: (accountId, productId, amount = 1) =>
    api.postUser(`/accounts/${accountId}/cart/${productId}?amount=${amount}`),
    
    removeFromCart: (accountId, productId, amount = 1) => 
        api.delete(`/accounts/${accountId}/cart/${productId}?amount=${amount}`),

    clearCart: (accountId) => api.post(`/accounts/${accountId}/cart`),

    addToFavorites: (accountId, productId) =>
        api.post(`/accounts/${accountId}/favorites/${productId}`),

    removeFromFavorites: (accountId, productId) =>
        api.delete(`/accounts/${accountId}/favorites/${productId}`),
    
    editAccount: (id, data) => api.putUser(`/accounts/${id}`, data),
    
    deleteAccount: (id) => api.delete(`/accounts/${id}`),

    checkout: (accountId) => api.post(`/accounts/${accountId}/checkout`),
};