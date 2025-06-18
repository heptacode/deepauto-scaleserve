import { APIChat, Chat, ChatList, Message } from '../types';
import { axios } from '../utils/http';

export async function getChats(): Promise<ChatList[]> {
  const response = await axios.get<ChatList[]>('/chats');
  return response.data;
}

export async function createChat(): Promise<Chat> {
  const response = await axios.post<APIChat>('/chats');
  const apiChat = response.data;
  return {
    ...apiChat,
    messages: new Map(apiChat.messages?.map(message => [message.id, message]) ?? []),
  } satisfies Chat;
}

export async function getChat(chatId: string): Promise<Chat> {
  const response = await axios.get<APIChat>(`/chats/${chatId}`);
  if (response.status === 404) {
    throw new Error('Chat not found');
  }
  const apiChat = response.data;
  return {
    ...apiChat,
    messages: new Map(apiChat.messages?.map(message => [message.id, message]) ?? []),
  } satisfies Chat;
}

export async function createMessage(message: Message): Promise<Message> {
  const response = await axios.post<Message>(`/chats/${message.chatId}/messages`, { message });
  return response.data;
}
