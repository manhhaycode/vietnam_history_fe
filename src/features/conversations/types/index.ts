import { CommonModel } from '@/common/types';

export interface IConversation extends CommonModel {
  id: string;
  name: string;
  thumbnail: string;
  metadata: string;
  messages: IMessage[];
}

export interface IMessage extends CommonModel {
  id: string;
  content: string;
  metadata: string;
}

export interface IConversationFilter {
  name?: string;
  metadata?: string;
}
