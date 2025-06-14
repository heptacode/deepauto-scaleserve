export function ChatBubble({ children }: { children?: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col items-end">
      <div className="p-3 max-w-full gap-y-[6px] flex flex-col rounded-[10px] text-sm/[120%] font-medium text-white bg-gray-800">
        {children}
      </div>
    </div>
  );
}
