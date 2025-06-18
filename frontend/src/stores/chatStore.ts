import { nanoid } from 'nanoid';
import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';
import { Message, UserMessage } from '../types';

interface ChatStore {
  isStreaming: boolean;
  messages: Map<Message['id'], Message>;
  setIsStreaming: (isStreaming: boolean) => void;
  setMessage: (messageId: Message['id'], message: Message) => void;
  appendUserMessage: (content: string) => void;
}

export const chatStore = createStore<ChatStore>()(set => ({
  isStreaming: false,
  messages: new Map(),
  setIsStreaming: isStreaming => set({ isStreaming }),
  setMessage: (messageId, message) => set(state => ({ messages: new Map(state.messages).set(messageId, message) })),
  appendUserMessage: content =>
    set(state => {
      const messageId = nanoid();
      return {
        messages: new Map(state.messages).set(messageId, {
          id: messageId,
          role: 'user',
          createdAt: new Date().getTime(),
          content,
        } satisfies UserMessage),
      };
    }),
}));

export function useChatStore(): ChatStore;
export function useChatStore<T>(selector: (state: ChatStore) => T): T;
export function useChatStore<T>(selector?: (state: ChatStore) => T) {
  return useStore(chatStore, selector!);
}
