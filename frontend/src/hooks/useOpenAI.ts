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
