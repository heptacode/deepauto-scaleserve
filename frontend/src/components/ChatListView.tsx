import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import ComposeSVG from '../assets/icons/compose.svg';
import { createChat, getChats } from '../remotes/chats.js';

export function ChatListView() {
  const { chatId: paramChatId } = useParams<{ chatId: string }>();
  const { data: chats, refetch } = useQuery(getChats.queryOptions());
  const navigate = useNavigate();

  return (
    <aside>
      <div className="min-w-[200px] h-full px-3 py-4 overflow-y-auto bg-gray-50">
        <button
          type="button"
          className="p-2 w-full gap-1 flex items-center rounded-lg text-gray-900 hover:bg-gray-100 cursor-pointer"
          onClick={async () => {
            const chat = await createChat();
            navigate(`/${chat.id}`);
            refetch();
          }}
        >
          <ComposeSVG />
          Create Chat
        </button>

        <div className="my-4"></div>

        <h6 className="mb-1 text-sm text-gray-400">Chats</h6>
        <ul className="space-y-1 font-medium">
          {chats?.map(chat => (
            <li key={chat.id}>
              <a
                href={`/${chat.id}`}
                className={`p-2 flex items-center rounded-lg text-gray-900 hover:bg-gray-100 ${chat.id === paramChatId && 'bg-gray-200 hover:bg-gray-200'}`}
                onClick={e => {
                  e.preventDefault();
                  if (chat.id !== paramChatId) {
                    navigate(`/${chat.id}`);
                  }
                }}
              >
                {chat.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
