import { useState } from 'react';
import ArrowRightSVG from '../assets/icons/arrow-right.svg';
import { useChatStore } from '../stores/chatStore.js';
import { Toggle } from './Toggle.js';

export function ChatInputContainer({
  isDisabled,
  onSubmit,
}: {
  isDisabled?: boolean;
  onSubmit?: (chatInput: string) => void;
}) {
  const isAutoScroll = useChatStore(s => s.isAutoScroll);
  const toggleAutoScroll = useChatStore(s => s.toggleAutoScroll);
  const [chatInput, setChatInput] = useState<string>('What are some highly rated restaurants in San Francisco?');

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      handleSubmit();
    }
  }

  function handleSubmit() {
    if (isDisabled || !chatInput.trim().length) {
      return;
    }

    setChatInput('');
    onSubmit?.(chatInput);
  }

  return (
    <div className="max-w-[750px]  w-full flex flex-col gap-y-2 px-6 pb-6">
      <div className="px-3 py-2 flex flex-col rounded-lg border border-gray-100 bg-gray-50">
        <textarea
          className="min-h-16 max-h-[200px] w-full px-3 py-2 field-sizing-content flex resize-none text-[14px] font-medium text-gray-800 outline-hidden placeholder:text-gray-500"
          placeholder="Send any test messages"
          value={chatInput}
          onChange={e => setChatInput(e.target.value)}
          onKeyDown={handleKeyDown}
        ></textarea>
        <div className="gap-x-[10px] flex items-end justify-between">
          <Toggle checked={isAutoScroll} onChange={toggleAutoScroll}>
            Auto Scroll
          </Toggle>

          <button
            className="size-[34px] flex items-center justify-center rounded-full bg-gray-800 p-1 disabled:cursor-not-allowed disabled:bg-gray-300"
            disabled={isDisabled || !chatInput.trim().length}
            onClick={handleSubmit}
          >
            <ArrowRightSVG className="size-[18px] stroke-2 text-gray-50" />
          </button>
        </div>
      </div>
    </div>
  );
}
