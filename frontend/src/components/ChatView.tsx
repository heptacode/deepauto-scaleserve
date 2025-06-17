import { useEffect, useRef, useState } from 'react';
import { useCompletion } from '../hooks/useOpenAI';
import type { AssistantMessage, FirstChunk, Message, Role, UserMessage } from '../types';
import { ChatInputContainer } from './ChatInputContainer';
import * as ChatMessageContainer from './ChatMessageContainer';

export function ChatView() {
  const { createCompletion } = useCompletion();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastCompletion, setLastCompletion] = useState<AssistantMessage | null>(null);
  const [messages, setMessages] = useState<Map<string, Message>>(new Map());
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lastCompletion?.content]);

  async function handleChatInput(chatInput: string) {
    let firstChunk: FirstChunk = {} as FirstChunk;
    let content = '';

    setMessages(prev =>
      new Map(prev).set(new Date().getTime().toString(), {
        id: new Date().getTime().toString(),
        role: 'user',
        created: new Date().getTime(),
        content: chatInput,
      } satisfies UserMessage)
    );

    setIsLoading(true);
    try {
      const completion = await createCompletion(chatInput);
      for await (const chunk of completion) {
        if (Object.keys(firstChunk).length === 0) {
          firstChunk = { ...chunk };
        }

        const delta = chunk.choices[0]?.delta?.content;
        if (delta) {
          content += delta;
          setLastCompletion(prev =>
            prev
              ? { ...prev, content: prev.content + delta }
              : { id: chunk.id, role: 'assistant', created: chunk.created, model: chunk.model, content: delta }
          );
        }
      }
      setMessages(prev =>
        new Map(prev).set(firstChunk.id, {
          id: firstChunk.id,
          role: 'assistant',
          created: firstChunk.created,
          model: firstChunk.model,
          query_routing: firstChunk.query_routing,
          content,
        } satisfies AssistantMessage)
      );
    } finally {
      setLastCompletion(null);
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="size-full px-3 py-6 gap-y-4 flex flex-col overflow-y-auto transition-[height] duration-500 ease-in-out">
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

      <ChatInputContainer isDisabled={isLoading} onSubmit={chatInput => handleChatInput(chatInput)} />
    </>
  );
}
