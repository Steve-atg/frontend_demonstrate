import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { transactionsAPI } from '../client';
import type {
  CreateTransactionDto,
  UpdateTransactionDto,
} from '../generated/data-contracts';

// Get all transactions hook (admin only)
export const useTransactions = () => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  return useSWR(
    token ? '/transactions' : null,
    async () => {
      return await transactionsAPI.transactionsControllerFindAll();
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );
};

// Get transaction by ID hook
export const useTransaction = (id: string) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  return useSWR(
    token && id ? `/transactions/${id}` : null,
    async () => {
      return await transactionsAPI.transactionsControllerFindOne(id);
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );
};

// Get my transactions hook
export const useMyTransactions = () => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  return useSWR(
    token ? '/transactions/me/transactions' : null,
    async () => {
      return await transactionsAPI.transactionsControllerGetMyTransactions();
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );
};

// Create transaction hook (admin)
export const useCreateTransaction = () => {
  return useSWRMutation(
    '/transactions',
    async (url: string, { arg }: { arg: CreateTransactionDto }) => {
      return await transactionsAPI.transactionsControllerCreate(arg);
    }
  );
};

// Create my transaction hook
export const useCreateMyTransaction = () => {
  return useSWRMutation(
    '/transactions/me/transactions',
    async (url: string, { arg }: { arg: CreateTransactionDto }) => {
      return await transactionsAPI.transactionsControllerCreate(arg);
    }
  );
};

// Update transaction hook
export const useUpdateTransaction = () => {
  return useSWRMutation(
    '/transactions',
    async (
      url: string,
      { arg }: { arg: { id: string; data: UpdateTransactionDto } }
    ) => {
      return await transactionsAPI.transactionsControllerUpdate(
        arg.id,
        arg.data
      );
    }
  );
};

// Delete transaction hook
export const useDeleteTransaction = () => {
  return useSWRMutation(
    '/transactions',
    async (url: string, { arg }: { arg: string }) => {
      return await transactionsAPI.transactionsControllerRemove(arg);
    }
  );
};
