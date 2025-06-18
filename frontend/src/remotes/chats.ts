import { APIChat, Chat, ChatList, Message } from '../types';

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export async function getChats(): Promise<ChatList[]> {
  const response = await fetch(`${BASE_URL}/chats`);
  return (await response.json()) as ChatList[];
}

export async function createChat(): Promise<Chat> {
  const response = await fetch(`${BASE_URL}/chats`, { method: 'POST' });
  const apiChat = (await response.json()) as APIChat;
  return {
    ...apiChat,
    messages: new Map(apiChat.messages?.map(message => [message.id, message]) ?? []),
  } satisfies Chat;
}

export async function getChat(chatId: string): Promise<Chat> {
  const response = await fetch(`${BASE_URL}/chats/${chatId}`);
  if (!response.ok) {
    throw new Error('Chat not found');
  }
  const apiChat = (await response.json()) as APIChat;
  return {
    ...apiChat,
    messages: new Map(apiChat.messages?.map(message => [message.id, message]) ?? []),
  } satisfies Chat;
}

export async function createMessage(message: Message): Promise<Message> {
  const response = await fetch(`${BASE_URL}/chats/${message.chatId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  return (await response.json()) as Message;
}
