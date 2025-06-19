import { ChatContentView } from '../components/ChatContentView.js';
import { ChatListView } from '../components/ChatListView.js';

export function ChatPage() {
  return (
    <main className="min-w-[550px] size-full flex">
      <ChatListView />
      <ChatContentView />
    </main>
  );
}
