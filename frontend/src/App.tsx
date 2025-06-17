import { ChatContentView } from './components/ChatContentView';
import { ChatListView } from './components/ChatListView';

export function App() {
  return (
    <main className="min-w-[550px] h-full flex justify-center">
      <ChatListView />
      <ChatContentView />
    </main>
  );
}
