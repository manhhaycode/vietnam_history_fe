import { CommonModel, IResponse } from '@/common/types';

export interface IConversation extends CommonModel {
  id: string;
  name: string;
  thumbnail: string;
  metadata: string;
  messages: IMessage[];
}

export type IConversationItem = Omit<IConversation, 'messages'>;

export interface IMessage extends CommonModel {
  id: string;
  content: string;
  metadata: string;
}

export interface IConversationFilter {
  name?: string;
  metadata?: string;
}

export interface IConversationListRes extends IResponse {
  conversations: IConversationItem[];
}
