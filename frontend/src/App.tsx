import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChatPage } from './pages/ChatPage.js';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60_000,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/:chatId" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
