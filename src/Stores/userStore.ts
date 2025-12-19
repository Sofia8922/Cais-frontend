import { create } from "zustand";
import { AccountService } from "../services/accountService";

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
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  updateUser: (data: Partial<Account>) => Promise<void>;
  addFavorite: (productId: number) => Promise<void>;
  removeFavorite: (productId: number) => Promise<void>;
  addToCart: (productId: number, amount?: number) => Promise<void>;
  removeFromCart: (productId: number, amount?: number) => Promise<void>;
  checkout: () => Promise<void>;
}

const loadUser = (): Account | null => {
  const raw = localStorage.getItem("currentAccount");
  return raw ? JSON.parse(raw) : null;
};

export const useUserStore = create<UserStore>((set, get) => ({
    user: loadUser(),

    login: async (credentials) => {
        const account = await AccountService.login(credentials);

        const normalized = {
          ...account,
          cartItems: account.cartItems ?? [],
          favorites: account.favorites ?? [],
          recentOrders: account.recentOrders ?? [],
          roles: account.roles ?? [],
        };

        localStorage.setItem("currentAccount", JSON.stringify(normalized));
        set({user: normalized});
    },

    logout: () => {
      localStorage.removeItem("currentAccount");
      set({ user: null });
    },

    refreshUser: async () => {
    const user = get().user;
    if (!user) return;
    const account = await AccountService.getAccountById(user.id);
    const normalized = {
      ...account,
      cart: account.cart ?? [],
      favorites: account.favorites ?? [],
      recentOrders: account.recentOrders ?? [],
      roles: account.roles ?? [],
    };
    localStorage.setItem("currentAccount", JSON.stringify(normalized));
    set({ user: normalized });
  },

  updateUser: async (partial: Partial<Account>) => {
    const user = get().user;
    if (!user) return;
    const updated = await AccountService.editAccount(user.id, partial);
    const normalized = {
      ...updated,
      cart: updated.cart ?? [],
      favorites: updated.favorites ?? [],
      recentOrders: updated.recentOrders ?? [],
      roles: updated.roles ?? [],
    };
    localStorage.setItem("currentAccount", JSON.stringify(normalized));
    set({ user: normalized });
  },

  addFavorite: async (productId: number) => {
    const user = get().user;
    if (!user) return;
    const updated = await AccountService.addToFavorites(user.id, productId);
    const normalized = {
      ...updated,
      cart: updated.cart ?? [],
      favorites: updated.favorites ?? [],
      recentOrders: updated.recentOrders ?? [],
      roles: updated.roles ?? [],
    };
    localStorage.setItem("currentAccount", JSON.stringify(normalized));
    set({ user: normalized });
  },

  removeFavorite: async (productId: number) => {
    const user = get().user;
    if (!user) return;
    const updated = await AccountService.removeFromFavorites(user.id, productId);
    const normalized = {
      ...updated,
      cart: updated.cart ?? [],
      favorites: updated.favorites ?? [],
      recentOrders: updated.recentOrders ?? [],
      roles: updated.roles ?? [],
    };
    localStorage.setItem("currentAccount", JSON.stringify(normalized));
    set({ user: normalized });
  },

  addToCart: async (productId: number, amount = 1) => {
    const user = get().user;
    if (!user) return;
    const updated = await AccountService.addToCart(user.id, productId, amount);
    const normalized = {
      ...updated,
      cart: updated.cart ?? [],
      favorites: updated.favorites ?? [],
      recentOrders: updated.recentOrders ?? [],
      roles: updated.roles ?? [],
    };
    localStorage.setItem("currentAccount", JSON.stringify(normalized));
    set({ user: normalized });
  },

  removeFromCart: async (productId: number, amount = 1) => {
    const user = get().user;
    if (!user) return;
    const updated = await AccountService.removeFromCart(user.id, productId, amount);
    const normalized = {
      ...updated,
      cart: updated.cart ?? [],
      favorites: updated.favorites ?? [],
      recentOrders: updated.recentOrders ?? [],
      roles: updated.roles ?? [],
    };
    localStorage.setItem("currentAccount", JSON.stringify(normalized));
    set({ user: normalized });
  },
  
  checkout: async () => {
    const user = get().user;
    if (!user) return;
    const updated = await AccountService.checkout(user.id);
    const normalized = {
      ...updated,
      cart: updated.cart ?? [],
      favorites: updated.favorites ?? [],
      recentOrders: updated.recentOrders ?? [],
      roles: updated.roles ?? [],
    };
    localStorage.setItem("currentAccount", JSON.stringify(normalized));
    set({ user: normalized });
  },
}));