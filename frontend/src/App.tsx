import { useState } from 'react';
import Markdown from 'react-markdown';
import { useOpenAI } from './hooks/useOpenAI';

export function App() {
  const openai = useOpenAI();
  const [message, setMessage] = useState<string>('');

  async function handleStream() {
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
      const delta = chunk.choices[0]?.delta?.content;
      if (delta) {
        setMessage(prev => prev + delta);
      }
    }
  }

  return (
    <>
      <button onClick={handleStream}>Start</button>
      <br />
      <Markdown>{message}</Markdown>
    </>
  );
}
