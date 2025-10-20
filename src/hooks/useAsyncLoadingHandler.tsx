'use client';

import { useCallback, useState } from 'react';

type HandlerFunction<T> = (value: T) => Promise<unknown>;

export default function useAsyncLoadingHandler<T>(handler: HandlerFunction<T>) {
  const [isLoading, setLoading] = useState(false);

  const handleFunction = useCallback(
    async (value: T) => {
      setLoading(true);
      try {
        await handler(value);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    },
    [handler]
  );

  return {
    isLoading,
    handleFunction,
  };
}
