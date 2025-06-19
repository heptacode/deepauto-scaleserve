export type Role = 'user' | 'assistant';

export interface QueryRouting {
  query_routing?: {
    grades: Array<{
      grade_label: string;
      grade_value: number;
      model: string;
      score: number;
    }>;
    selected_model: string;
  };
}

export interface BaseMessage {
  id: string;
  chatId: string;
  role: Role;
  createdAt: number;
  content: string;
}
export interface UserMessage extends BaseMessage {
  role: 'user';
}
export interface AssistantMessage extends BaseMessage, QueryRouting {
  role: 'assistant';
  model: string;
}
export type Message = UserMessage | AssistantMessage;

export interface Chat {
  id: string;
  title: string;
  createdAt: number;
  messages: Map<Message['id'], Message>;
}

export type ChatList = Pick<Chat, 'id' | 'title' | 'createdAt'>;

export interface APIChat {
  id: string;
  title: string;
  createdAt: number;
  messages: Message[];
}

export interface DB {
  chats: APIChat[];
}
