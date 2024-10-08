import { create } from 'zustand';
import { AppStore } from './store-type';

export const useAppStore = create<AppStore>((set) => ({
  isNavExpanded: true,
  toggleNav: () => set(({ isNavExpanded }) => ({ isNavExpanded: !isNavExpanded })),
}));
