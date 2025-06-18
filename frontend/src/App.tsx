import { ChatContentView } from './components/ChatContentView';
import { ChatListView } from './components/ChatListView';

export function App() {
  return (
    <main className="min-w-[550px] size-full flex">
      <ChatListView />
      <ChatContentView />
    </main>
  );
}
