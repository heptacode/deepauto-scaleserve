import Markdown from 'react-markdown';
import { AssistantMessage, UserMessage } from '../types';
import { Badge } from './Badge';
import { ChatBubble } from './ChatBubble';

export function User({ message }: { message: UserMessage }) {
  return (
    <ChatBubble>
      <Markdown>{message.content}</Markdown>
    </ChatBubble>
  );
}

export function Assistant({ message }: { message: AssistantMessage }) {
  return (
    <div className="w-[90%] flex flex-col items-start gap-3">
      <div className="flex">
        <Badge>{message.model}</Badge>
        <button>See Scores</button>
      </div>
      <div className="gap-y-3 flex flex-col text-sm/[120%] font-medium text-gray-800 bg-white wrap-break-word">
        <Markdown>{message.content}</Markdown>
      </div>
    </div>
  );
}
