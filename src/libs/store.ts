import { create } from 'zustand';
import { AppStore } from './store-type';

export const useAppStore = create<AppStore>((set) => ({
  isNavExpanded: true,
  setNavExpanded: (isNavExpanded: boolean) => set({ isNavExpanded }),
  toggleNav: () => set(({ isNavExpanded }) => ({ isNavExpanded: !isNavExpanded })),
  isFloatingNav: false,
  setFloatingNav: (isFloatingNav: boolean) => set({ isFloatingNav }),
}));
