import { useState } from 'react';
import { createMessage } from '../remotes/chats.js';
import { useChatStore } from '../stores/chatStore.js';
import { AssistantMessage, FirstChunk, UserMessage } from '../types.js';
import { useOpenAI } from './useOpenAI.js';

export function useCompletion() {
  const openai = useOpenAI();
  const [lastCompletion, setLastCompletion] = useState<AssistantMessage | null>(null);
  const setIsStreaming = useChatStore(s => s.setIsStreaming);
  const setMessage = useChatStore(s => s.setMessage);

  function createCompletion(userContent: string) {
    const completion = openai.chat.completions.create({
      model: 'openai/gpt-4o-mini-2024-07-18,deepauto/qwq-32b',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.',
        },
        {
          role: 'user',
          content: userContent,
        },
      ],
      stream: true,
    });

    return completion;
  }

  async function streamCompletion(userMessage: UserMessage) {
    let firstChunk: FirstChunk = {} as FirstChunk;
    let content = '';

    setIsStreaming(true);
    try {
      const completion = await createCompletion(userMessage.content);
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
              : {
                  id: chunk.id,
                  chatId: userMessage.chatId,
                  role: 'assistant',
                  createdAt: chunk.created,
                  model: chunk.model,
                  content: delta,
                }
          );
        }
      }

      const message: AssistantMessage = {
        id: firstChunk.id,
        chatId: userMessage.chatId,
        role: 'assistant',
        createdAt: firstChunk.created,
        model: firstChunk.model,
        query_routing: firstChunk.query_routing,
        content,
      };
      setMessage(firstChunk.id, message);
      await createMessage(message);
    } finally {
      setLastCompletion(null);
      setIsStreaming(false);
    }
  }

  return { lastCompletion, createCompletion, streamCompletion };
}
