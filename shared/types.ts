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
  messages: Message[];
}

export interface DB {
  chats: Chat[];
}
