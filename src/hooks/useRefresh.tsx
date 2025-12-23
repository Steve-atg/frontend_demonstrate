import { useRouter } from 'next/navigation';
import { useCallback, useTransition } from 'react';

/**
 * Hook to refresh the current page
 * @returns Object containing refresh function and isPending state
 */
export const useRefresh = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const refresh = useCallback(() => {
    startTransition(() => {
      router.refresh();
    });
  }, [router]);

  return { refresh, isPending };
};
