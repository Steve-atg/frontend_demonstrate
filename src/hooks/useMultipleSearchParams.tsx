import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useTransition } from 'react';

export const useUpdateMultipleSearchParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const [isPending, startTransition] = useTransition();
  const promiseRef = useRef<() => void>(undefined);

  useEffect(() => {
    if (promiseRef.current && !isPending) {
      promiseRef.current();
      promiseRef.current = undefined;
    }
  }, [isPending]);

  const updateMultipleSearchParams = (
    toUpdate: Record<string, string | null>,
    moveToTop = false
  ) => {
    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );

    const paramsObject = Object.fromEntries([...currentParams.entries()]);
    const newParams = new URLSearchParams(paramsObject);

    Object.entries(toUpdate).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value.trim());
      } else {
        newParams.delete(key);
      }
    });

    const updatePath = `${path}?${newParams.toString()}`;
    router.replace(updatePath, { scroll: moveToTop });

    return new Promise<void>(resolve => {
      promiseRef.current = resolve;
      startTransition(() => {
        router.replace(updatePath, { scroll: false });
      });
    });
  };

  return updateMultipleSearchParams;
};
