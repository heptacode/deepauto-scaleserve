import { useQueryClient } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import { useNavigate, useParams } from 'react-router-dom';
import { createChat, createMessage, getChats } from '../remotes/chats';
import { useChatStore } from '../stores/chatStore';
import type { UserMessage } from '../types';

export function useChatActions() {
  const { chatId: paramChatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const refetchChats = () => queryClient.invalidateQueries(getChats.queryOptions());

  const setMessage = useChatStore(s => s.setMessage);

  async function createChatIfNotExists(): Promise<string> {
    if (paramChatId) {
      return paramChatId;
    }

    const newChat = await createChat();
    const newChatId = newChat.id;
    navigate(`/${newChatId}`, { replace: true });
    await refetchChats();

    return newChatId;
  }

  async function appendUserMessage(chatInput: string): Promise<UserMessage> {
    const chatId = await createChatIfNotExists();

    const messageId = nanoid();
    const message: UserMessage = {
      id: messageId,
      chatId,
      role: 'user',
      createdAt: Date.now(),
      content: chatInput,
    };

    await createMessage(message);
    setMessage(messageId, message);

    return message;
  }

  return { appendUserMessage, createChatIfNotExists };
}
