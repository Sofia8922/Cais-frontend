import { createStore } from "@odemian/react-store";

interface User {
    id: number | null;
    email: string | null;
    name: string | null
}

export const [currentUser, setCurrentUser] = createStore<User>({
    id: null,
    email: null,
    name: null,
});

export const login = (userData: User) => {
    setCurrentUser(userData);
};

export const logout = () => {
    setCurrentUser({
        id: null,
        email: null,
        name: null,
    });
};