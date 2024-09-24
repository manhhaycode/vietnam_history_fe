export interface IConversation {
  id: string;
  name: string;
  messages: IMessage[];
}

export interface IMessage {
  id: string;
  text: string;
  timestamp: number;
}
