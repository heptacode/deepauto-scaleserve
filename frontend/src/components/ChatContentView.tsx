import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useChatActions } from '../hooks/useChatActions';
import { useCompletion } from '../hooks/useCompletion';
import { useScrollToBottom } from '../hooks/useScrollToBottom';
import { getChat } from '../remotes/chats';
import { useChatStore } from '../stores/chatStore';
import type { AssistantMessage, Role, UserMessage } from '../types';
import { ChatInputContainer } from './ChatInputContainer';
import * as ChatMessageContainer from './ChatMessageContainer';

export function ChatContentView() {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const { data: chat, isError } = useQuery(getChat.queryOptions(chatId));
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const isStreaming = useChatStore(s => s.isStreaming);
  const isAutoScroll = useChatStore(s => s.isAutoScroll);
  const messages = useChatStore(s => s.messages);
  const setMessages = useChatStore(s => s.setMessages);

  const { lastCompletion, streamCompletion } = useCompletion();
  const { appendUserMessage } = useChatActions();
  const { triggerScroll } = useScrollToBottom([lastCompletion?.content], { ref: bottomRef, enabled: isAutoScroll });

  useEffect(() => {
    if (isError) {
      navigate('/', { replace: true });
    } else if (chat) {
      setMessages(chat.messages);
    }
  }, [isError, chat, navigate, setMessages]);

  useEffect(() => {
    if (chat) {
      const timer = setTimeout(triggerScroll, 100);
      return () => clearTimeout(timer);
    }
  }, [chat, triggerScroll]);

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
