
import { api } from "./apiService";

export const RoleService = {
    getAllRoles: () => api.get("/roles"),
};