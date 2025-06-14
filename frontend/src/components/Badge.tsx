export function Badge({ children }: { children?: React.ReactNode }) {
  return (
    <span className="px-2 py-1 flex justify-center items-center rounded-md text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset bg-gray-50">
      {children}
    </span>
  );
}
