import { useQuery } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCompletion } from '../hooks/useCompletion';
import { createChat, createMessage, getChat, getChats } from '../remotes/chats';
import { useChatStore } from '../stores/chatStore';
import type { AssistantMessage, Role, UserMessage } from '../types';
import { ChatInputContainer } from './ChatInputContainer';
import * as ChatMessageContainer from './ChatMessageContainer';

export function ChatContentView() {
  const { chatId } = useParams<{ chatId: string }>();
  const { refetch: refetchChats } = useQuery(getChats.queryOptions());
  const { data: chat, isError } = useQuery(getChat.queryOptions(chatId));
  const navigate = useNavigate();
  const { lastCompletion, streamCompletion } = useCompletion();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const isStreaming = useChatStore(s => s.isStreaming);
  const messages = useChatStore(s => s.messages);
  const setMessage = useChatStore(s => s.setMessage);
  const setMessages = useChatStore(s => s.setMessages);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lastCompletion?.content]);

  useEffect(() => {
    if (isError) {
      navigate('/', { replace: true });
    }
    if (chat) {
      setMessages(chat.messages);
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [isError, chat, navigate, setMessages]);

  async function appendUserMessage(chatInput: string) {
    let resolvedChatId = chatId;
    if (!resolvedChatId) {
      const newChat = await createChat();
      resolvedChatId = newChat.id;
      navigate(`/${resolvedChatId}`);
      refetchChats();
    }
    const messageId = nanoid();
    const message: UserMessage = {
      id: messageId,
      chatId: resolvedChatId,
      role: 'user',
      createdAt: new Date().getTime(),
      content: chatInput,
    };
    await createMessage(message);
    setMessage(messageId, message);

    return message;
  }

  return (
    <div className="size-full flex justify-center">
      <div className="flex flex-col flex-1 basis-0 justify-center items-center">
        <div className={`w-full ${messages.size && 'h-full '} p-10 flex flex-col items-center overflow-y-auto`}>
          <div className="w-full max-w-[750px] gap-5 flex flex-col items-center">
            {Array.from(messages).map(([id, message]) => {
              const MessageByRole: Record<Role, React.ReactNode> = {
                user: <ChatMessageContainer.User key={id} message={message as UserMessage} />,
                assistant: <ChatMessageContainer.Assistant key={id} message={message as AssistantMessage} />,
              };
              return MessageByRole[message.role];
            })}
            {lastCompletion && <ChatMessageContainer.Assistant message={lastCompletion} />}

            <div ref={bottomRef}></div>
          </div>
        </div>

        <ChatInputContainer
          isDisabled={isStreaming}
          onSubmit={async chatInput => {
            const message = await appendUserMessage(chatInput);
            streamCompletion(message);
          }}
        />
      </div>
    </div>
  );
}
