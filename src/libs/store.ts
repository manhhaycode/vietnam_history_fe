import { create } from 'zustand';
import { AppStore, AuthStore, ConversationStore } from './store-type';
import { IUser } from '@/features/user';
import Cookies from 'js-cookie';
import { IFilterScope, IMessage } from '@/features/conversations';
import { IEra } from '@/features/era';
import { IArtifact } from '@/features/artifacts';
import { IEvent } from '@/features/event';
import { IFigure } from '@/features/figure';
import { IPlace } from '@/features/places';
import { ITopic } from '@/features/topic';

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
  eraFilter: null,
  topicFilter: null,
  eventFilter: null,
  figureFilter: null,
  placeFilter: null,
  artifactFilter: null,
  setFilterScope: (filterScope: Partial<IFilterScope> | null) => set({ filterScope }),
  setMessages: (messages: IMessage[]) => set({ messages }),
  setEraFilter: (eraFilter: Partial<IEra> | null) => set({ eraFilter }),
  setTopicFilter: (topicFilter: Partial<ITopic> | null) => set({ topicFilter }),
  setEventFilter: (eventFilter: Partial<IEvent> | null) => set({ eventFilter }),
  setFigureFilter: (figureFilter: Partial<IFigure> | null) => set({ figureFilter }),
  setPlaceFilter: (placeFilter: Partial<IPlace> | null) => set({ placeFilter }),
  setArtifactFilter: (artifactFilter: Partial<IArtifact> | null) => set({ artifactFilter }),
  reset: () =>
    set({
      filterScope: null,
      messages: [],
      eraFilter: null,
      topicFilter: null,
      eventFilter: null,
      figureFilter: null,
      placeFilter: null,
      artifactFilter: null,
    }),
}));
