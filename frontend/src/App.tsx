import { ChatView } from './components/ChatView';

export function App() {
  return (
    <main className="min-w-[550px] h-full p-8 flex justify-center items-center">
      <div className="max-w-[750px] max-h-full size-full flex flex-col flex-1 basis-0 justify-center">
        <ChatView />
      </div>
    </main>
  );
}
