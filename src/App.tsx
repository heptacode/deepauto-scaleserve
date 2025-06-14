import OpenAI from 'openai';
import { useEffect } from 'react';

export function App() {
  const openai = new OpenAI({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    apiKey: import.meta.env.VITE_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    (async () => {
      const completion = await openai.chat.completions.create({
        model: 'openai/gpt-4o-mini-2024-07-18',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.',
          },
          {
            role: 'user',
            content: 'What are some highly rated restaurants in San Francisco?',
          },
        ],
        stream: true,
      });

      for await (const chunk of completion) {
        console.log(chunk.choices[0].delta.content);
      }
    })();
  }, []);

  return <></>;
}
