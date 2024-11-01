import { create } from 'zustand';
import { AppStore, AuthStore, ConversationStore } from './store-type';
import { IUser } from '@/features/user';
import Cookies from 'js-cookie';
import { IFilterScope, IMessage } from '@/features/conversations';

export const useAppStore = create<AppStore>((set) => ({
  isNavExpanded: true,
  setNavExpanded: (isNavExpanded: boolean) => set({ isNavExpanded }),
  toggleNav: () => set(({ isNavExpanded }) => ({ isNavExpanded: !isNavExpanded })),
  isFloatingNav: false,
  setFloatingNav: (isFloatingNav: boolean) => set({ isFloatingNav }),
}));

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user: IUser | null) => {
    if (!user) {
      Cookies.remove('vn-history-at');
      Cookies.remove('vn-history-rt');
    }
    set({ user });
  },
  login: (user: IUser) => set({ user }),
  logout: () => set({ user: null }),
}));

export const useConversationStore = create<ConversationStore>((set) => ({
  filterScope: null,
  messages: [],
  setFilterScope: (filterScope: IFilterScope | null) => set({ filterScope }),
  setMessages: (messages: IMessage[]) => set({ messages }),
}));
