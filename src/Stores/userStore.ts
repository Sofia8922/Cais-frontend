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

const initialUser: Account | null = savedUser ? {
  ...JSON.parse(savedUser),
  favorites: JSON.parse(savedUser).favorites ?? [],
  recentOrders: JSON.parse(savedUser).recentOrders ?? [],
  cart: JSON.parse(savedUser).cart ?? [],
} : null;

export const useUserStore = create<UserStore>((set) => ({
    user: initialUser,

    login: (account: Account) => {
        set({ user: {
            ...account,
            favorites: account.favorites ?? [],
            recentOrders: account.recentOrders ?? [],
            cart: account.cart ?? [],
          },
        });
        localStorage.setItem("currentAccount", JSON.stringify(account));
    },
    logout: () => {
    set({ user: null });
    localStorage.removeItem("currentAccount");
  }
}));