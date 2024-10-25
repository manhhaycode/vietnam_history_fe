import { IFilterScope, IMessage } from '@/features/conversations';
import { IUser } from '@/features/user';

export interface AppStore {
  isNavExpanded: boolean;
  isFloatingNav: boolean;
  setNavExpanded: (isNavExpanded: boolean) => void;
  setFloatingNav: (isFloatingNav: boolean) => void;
  toggleNav: () => void;
}

export interface AuthStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  login: (user: IUser) => void;
  logout: () => void;
}

export interface ConversationStore {
  filterScope: IFilterScope | null;
  messages: IMessage[];
  setMessages: (messages: IMessage[]) => void;
  setFilterScope: (filterScope: IFilterScope | null) => void;
}
