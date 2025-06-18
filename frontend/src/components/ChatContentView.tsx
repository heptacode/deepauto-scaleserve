import { useEffect, useRef } from 'react';
import { useCompletion } from '../hooks/useCompletion';
import { useChatStore } from '../stores/chatStore';
import type { AssistantMessage, Role, UserMessage } from '../types';
import { ChatInputContainer } from './ChatInputContainer';
import * as ChatMessageContainer from './ChatMessageContainer';

export function ChatContentView() {
  const { lastCompletion, streamCompletion } = useCompletion();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const isStreaming = useChatStore(s => s.isStreaming);
  const messages = useChatStore(s => s.messages);
  const appendUserMessage = useChatStore(s => s.appendUserMessage);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lastCompletion?.content]);

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
          onSubmit={chatInput => {
            appendUserMessage(chatInput);
            streamCompletion(chatInput);
          }}
        />
      </div>
    </div>
  );
}
