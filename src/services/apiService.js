// base service that all other endpoints are based on!

const BASE_URL = "http://localhost:8080";

export const api = {
    get: async(url) => {
        const res = await fetch(`${BASE_URL}${url}`);
        if (!res.ok) throw new Error(`GET ${url} failed`);
        return res.json();
    },

    post: async(url, data) => {
        const res = await fetch (`${BASE_URL}${url}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: data ? JSON.stringify(data) : undefined,
        });
        if (!res.ok) throw new Error(`POST ${url} failed`);
        return res.json();
    },

    put: async(url, data) => {
        const res = await fetch(`${BASE_URL}${url}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`PUT ${url} failed`);
        return res.json();
    },

    delete: async(url) => {
        const res = await fetch(`${BASE_URL}${url}`, {
            method: "DELETE",
        });
        if (!res.ok) throw new Error(`DELETE ${url} failed`);
        return res.json();
    },
};
