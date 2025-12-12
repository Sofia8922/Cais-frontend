import { create } from "zustand";

interface Account {
    id: number | null;
    email: string | null;
    name: string | null;
}

interface UserStore {
  user: Account;
  login: (account: Account) => void;
  logout: () => void;
}

const savedUser = typeof window !== "undefined" ? localStorage.getItem("currentAccount") : null;

const initialUser: Account = savedUser ? JSON.parse(savedUser) : {id: null, email: null, name: null};

export const useUserStore = create<UserStore>((set) => ({
    user: initialUser,

    login: (account: Account) => {
        set({ user: account });
        localStorage.setItem("currentAccount", JSON.stringify(account));
    },
    logout: () => {
    const emptyUser: Account = { id: null, email: null, name: null };
    set({ user: emptyUser });
    localStorage.removeItem("currentAccount");
  }
}));