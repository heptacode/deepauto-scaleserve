import { useEffect } from 'react';

export function useScrollToBottom(
  deps: unknown[],
  { ref, enabled = true }: { ref: React.RefObject<HTMLElement | null>; enabled: boolean }
) {
  function triggerScroll() {
    ref?.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    if (enabled) {
      triggerScroll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, ref, enabled]);

  return { triggerScroll };
}
