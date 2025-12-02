import { createStore } from "@odemian/react-store";
import type { Role } from "../types/models.js";

interface User {
    email: String
    password: String
    id: number | null
    //role: Role | null;
}

export const [currentUser, updateUser] = createStore<User>({
    email: "",
    password: "",
    id: null,
    //role: null
});

export const logout = () => {
    updateUser({
        email: "",
        password: "",
        id: null,
        //role: null
    });
};