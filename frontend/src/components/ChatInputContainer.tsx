import { useState } from 'react';

export function ChatInputContainer({
  isDisabled,
  onSubmit,
}: {
  isDisabled?: boolean;
  onSubmit?: (chatInput: string) => void;
}) {
  const [chatInput, setChatInput] = useState<string>('What are some highly rated restaurants in San Francisco?');

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      handleSubmit();
    }
  }

  function handleSubmit() {
    if (isDisabled) {
      return;
    }

    setChatInput('');
    onSubmit?.(chatInput);
  }

  return (
    <div className="flex flex-col gap-y-2 pt-4">
      <div className="px-3 py-2 flex flex-col rounded-lg border border-gray-100 bg-gray-50">
        <textarea
          className="min-h-16 max-h-[200px] w-full px-3 py-2 field-sizing-content flex resize-none text-[14px] font-medium text-gray-800 outline-hidden placeholder:text-gray-500"
          placeholder="Send any test messages"
          value={chatInput}
          onChange={e => setChatInput(e.target.value)}
          onKeyDown={handleKeyDown}
        ></textarea>
        <div className="gap-x-[10px] flex items-end justify-between">
          <div></div>
          <button
            className="size-[34px] flex items-center justify-center rounded-full bg-gray-800 p-1 disabled:cursor-not-allowed disabled:bg-gray-300"
            disabled={isDisabled}
            onClick={handleSubmit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="size-[18px] stroke-2 text-gray-50"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
