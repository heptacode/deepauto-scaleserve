import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';
import { Message } from '../types';

interface ChatStore {
  isStreaming: boolean;
  messages: Map<Message['id'], Message>;
  setIsStreaming: (isStreaming: boolean) => void;
  setMessage: (messageId: Message['id'], message: Message) => void;
}

export const chatStore = createStore<ChatStore>()(set => ({
  isStreaming: false,
  messages: new Map(),
  setIsStreaming: isStreaming => set({ isStreaming }),
  setMessage: (messageId, message) => set(state => ({ messages: new Map(state.messages).set(messageId, message) })),
}));

export function useChatStore(): ChatStore;
export function useChatStore<T>(selector: (state: ChatStore) => T): T;
export function useChatStore<T>(selector?: (state: ChatStore) => T) {
  return useStore(chatStore, selector!);
}
