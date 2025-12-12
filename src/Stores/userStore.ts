import { createStore } from "@odemian/react-store";

interface Account {
    id: number | null;
    email: string | null;
    name: string | null
}

export const [currentAccount, setCurrentAccount] = createStore<Account>({
    id: null,
    email: null,
    name: null,
});

export const login = (AccountData: Account) => {
    setCurrentAccount(AccountData);
};

export const logout = () => {
    setCurrentAccount({
        id: null,
        email: null,
        name: null,
    });
};