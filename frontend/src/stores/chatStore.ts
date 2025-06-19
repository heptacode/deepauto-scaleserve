import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';
import { Message } from '../types';

interface ChatStore {
  isStreaming: boolean;
  isAutoScroll: boolean;
  messages: Map<Message['id'], Message>;
  setIsStreaming: (isStreaming: boolean) => void;
  toggleAutoScroll: () => void;
  setMessage: (messageId: Message['id'], message: Message) => void;
  setMessages: (messages: Map<Message['id'], Message>) => void;
}

export const chatStore = createStore<ChatStore>()(set => ({
  isStreaming: false,
  isAutoScroll: true,
  messages: new Map(),
  setIsStreaming: isStreaming => set({ isStreaming }),
  toggleAutoScroll: () => set(state => ({ isAutoScroll: !state.isAutoScroll })),
  setMessage: (messageId, message) => set(state => ({ messages: new Map(state.messages).set(messageId, message) })),
  setMessages: messages => set({ messages }),
}));

export function useChatStore(): ChatStore;
export function useChatStore<T>(selector: (state: ChatStore) => T): T;
export function useChatStore<T>(selector?: (state: ChatStore) => T) {
  return useStore(chatStore, selector!);
}
