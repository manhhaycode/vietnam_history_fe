import { create } from 'zustand';
import { AppStore, AuthStore } from './store-type';
import { IUser } from '@/features/user';

export const useAppStore = create<AppStore>((set) => ({
  isNavExpanded: true,
  setNavExpanded: (isNavExpanded: boolean) => set({ isNavExpanded }),
  toggleNav: () => set(({ isNavExpanded }) => ({ isNavExpanded: !isNavExpanded })),
  isFloatingNav: false,
  setFloatingNav: (isFloatingNav: boolean) => set({ isFloatingNav }),
}));

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user: IUser | null) => set({ user }),
  login: (user: IUser) => set({ user }),
  logout: () => set({ user: null }),
}));
