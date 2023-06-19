import { account } from "@/libs/appwrite";
import { getSession } from "@/libs/auth";
import { create } from "zustand";

export const useCurrentUser = create((set, get) => ({
  user: null,
  isLoading: false,
  setLoading: () => set((state: any) => ({ isLoading: !state })),
  // setUser: async () => {
  //   const currentUser = await getSession();
  //   set(() => ({ user: currentUser }));
  // },
  removeUser: async () => {
    await account.deleteSession("current");
    set(() => ({ user: null }));
  },
}));
