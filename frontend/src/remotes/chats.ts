import { Chat } from '../types';

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export async function getChats(): Promise<Chat[]> {
  const response = await fetch(`${BASE_URL}/chats`);
  return (await response.json()) as Chat[];
}

export async function createChat({ title }: { title: string }): Promise<Chat> {
  const response = await fetch(`${BASE_URL}/chats`, { method: 'POST', body: JSON.stringify({ title }) });
  return (await response.json()) as Chat;
}
