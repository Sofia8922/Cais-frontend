import { create } from "zustand";

interface Account {
    id: number | null;
    username: string | null;
    email: string | null;
    address: string | null;
    phoneNumber: string | null;
    cart: any[];
    favorites: any[];
    recentOrders: any[];
    roles: any[];
}

interface UserStore {
  user: Account | null;
  login: (account: Account) => void;
  logout: () => void;
}

const savedUser = typeof window !== "undefined" ? localStorage.getItem("currentAccount") : null;

const initialUser: Account = savedUser ? JSON.parse(savedUser) : null;

export const useUserStore = create<UserStore>((set) => ({
    user: initialUser,

    login: (account: Account) => {
        set({ user: account });
        localStorage.setItem("currentAccount", JSON.stringify(account));
    },
    logout: () => {
    set({ user: null });
    localStorage.removeItem("currentAccount");
  }
}));