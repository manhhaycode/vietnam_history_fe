import { IArtifact } from '@/features/artifacts';
import { IFilterScope, IMessage } from '@/features/conversations';
import { IEra } from '@/features/era';
import { IEvent } from '@/features/event';
import { IFigure } from '@/features/figure';
import { IPlace } from '@/features/places';
import { ITopic } from '@/features/topic';
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
  filterScope: Partial<IFilterScope> | null;
  eraFilter: Partial<IEra> | null;
  topicFilter: Partial<ITopic> | null;
  eventFilter: Partial<IEvent> | null;
  figureFilter: Partial<IFigure> | null;
  placeFilter: Partial<IPlace> | null;
  artifactFilter: Partial<IArtifact> | null;
  messages: IMessage[];
  setFilterScope: (filterScope: Partial<IFilterScope> | null) => void;
  setEraFilter: (eraFilter: Partial<IEra> | null) => void;
  setTopicFilter: (topicFilter: Partial<ITopic> | null) => void;
  setEventFilter: (eventFilter: Partial<IEvent> | null) => void;
  setFigureFilter: (figureFilter: Partial<IFigure> | null) => void;
  setPlaceFilter: (placeFilter: Partial<IPlace> | null) => void;
  setArtifactFilter: (artifactFilter: Partial<IArtifact> | null) => void;
  setMessages: (messages: IMessage[]) => void;
  resetFilter: () => void;
}
