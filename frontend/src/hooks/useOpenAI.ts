import OpenAI from 'openai';
import { useMemo } from 'react';

export function useOpenAI() {
  const openai = useMemo(() => {
    return new OpenAI({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      apiKey: import.meta.env.VITE_API_KEY,
      dangerouslyAllowBrowser: true,
    });
  }, []);

  return openai;
}

export function useCompletion() {
  const openai = useOpenAI();

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
  return { createCompletion };
}
