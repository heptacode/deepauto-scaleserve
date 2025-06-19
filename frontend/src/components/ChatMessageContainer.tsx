import Markdown from 'react-markdown';
import type { AssistantMessage, UserMessage } from '../types.js';
import { Badge } from './Badge.js';
import { ChatBubble } from './ChatBubble.js';
import { QueryRoutingResult } from './QueryRoutingResult.js';

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
      <div className="flex gap-2">
        <Badge>{message.model}</Badge>
        {message.query_routing && <QueryRoutingResult queryRouting={message.query_routing} />}
      </div>
      <div className="gap-y-3 flex flex-col text-sm/[120%] font-medium text-gray-800 bg-white wrap-break-word">
        <Markdown>{message.content}</Markdown>
      </div>
    </div>
  );
}
