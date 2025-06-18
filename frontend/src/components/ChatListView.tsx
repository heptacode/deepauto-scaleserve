import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ComposeSVG from '../assets/icons/compose.svg';
import { getChats } from '../remotes/chats';
import { Chat } from '../types';

export function ChatListView() {
  const [chats, setChats] = useState<Chat[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getChats().then(setChats);
  }, []);

  return (
    <aside>
      <div className="min-w-[200px] h-full px-3 py-4 overflow-y-auto bg-gray-50">
        <button
          type="button"
          className="p-2 w-full gap-1 flex items-center rounded-lg text-gray-900 hover:bg-gray-100 cursor-pointer"
        >
          <ComposeSVG />
          Create Chat
        </button>

        <div className="my-4"></div>

        <h6 className="text-sm text-gray-400">Chats</h6>
        <ul className="space-y-1 font-medium">
          {chats.map(chat => (
            <li key={chat.id}>
              <a
                href={`/${chat.id}`}
                className="p-2 flex items-center rounded-lg text-gray-900 hover:bg-gray-100"
                onClick={e => {
                  e.preventDefault();
                  navigate(`/${chat.id}`);
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
