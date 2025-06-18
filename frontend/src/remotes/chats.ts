import { UseQueryOptions } from '@tanstack/react-query';
import { APIChat, Chat, ChatList, Message } from '../types';
import { axios } from '../utils/http';

export async function getChats(): Promise<ChatList[]> {
  const response = await axios.get<ChatList[]>(getChats.apiPath());
  return response.data;
}
getChats.apiPath = () => '/chats';
getChats.queryOptions = () =>
  ({
    queryKey: [getChats.apiPath()],
    queryFn: getChats,
  }) satisfies UseQueryOptions;

export async function createChat(): Promise<Chat> {
  const response = await axios.post<APIChat>(createChat.apiPath());
  const apiChat = response.data;
  return {
    ...apiChat,
    messages: new Map(apiChat.messages?.map(message => [message.id, message]) ?? []),
  } satisfies Chat;
}
createChat.apiPath = () => '/chats';

export async function getChat(chatId: string): Promise<Chat> {
  const response = await axios.get<APIChat>(getChat.apiPath(chatId));
  if (response.status === 404) {
    throw new Error('Chat not found');
  }
  const apiChat = response.data;
  return {
    ...apiChat,
    messages: new Map(apiChat.messages?.map(message => [message.id, message]) ?? []),
  } satisfies Chat;
}
getChat.apiPath = (chatId?: string) => `/chats/${chatId}`;
getChat.queryOptions = (chatId?: string) =>
  ({
    queryKey: [getChat.apiPath(chatId)],
    queryFn: () => getChat(chatId!),
    enabled: !!chatId,
  }) satisfies UseQueryOptions;

export async function createMessage(message: Message): Promise<Message> {
  const response = await axios.post<Message>(createMessage.apiPath(message), { message });
  return response.data;
}
createMessage.apiPath = (message: Message) => `/chats/${message.chatId}/messages`;
