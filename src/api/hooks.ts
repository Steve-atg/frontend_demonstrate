import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { authAPI, usersAPI, transactionsAPI } from './client';
import type {
  LoginDto,
  RegisterDto,
  UserResponseDto,
  CreateUserDto,
  UpdateUserDto,
  CreateTransactionDto,
  TransactionResponseDto,
  UpdateTransactionDto,
} from './generated/data-contracts';

// ============================================================================
// AUTH HOOKS
// ============================================================================

// Login mutation
export const useLogin = () => {
  return useSWRMutation(
    '/auth/login',
    async (url: string, { arg }: { arg: LoginDto }) => {
      const response = await authAPI.authControllerLogin(arg);
      return response.data;
    }
  );
};

// Register mutation
export const useRegister = () => {
  return useSWRMutation(
    '/auth/register',
    async (url: string, { arg }: { arg: RegisterDto }) => {
      const response = await authAPI.authControllerRegister(arg);
      return response.data;
    }
  );
};

// Get current user profile
export const useProfile = () => {
  return useSWR('/auth/profile', async () => {
    const response = await authAPI.authControllerGetProfile();
    return response.data;
  });
};

// Get current user information
export const useCurrentUser = () => {
  return useSWR('/auth/me', async () => {
    const response = await authAPI.authControllerGetCurrentUser();
    return response.data;
  });
};

// Refresh token mutation
export const useRefreshToken = () => {
  return useSWRMutation(
    '/auth/refresh',
    async (url: string, { arg }: { arg: { refresh_token: string } }) => {
      const response = await authAPI.authControllerRefreshTokens(arg);
      return response.data;
    }
  );
};

// Logout mutation
export const useLogout = () => {
  return useSWRMutation(
    '/auth/logout',
    async (url: string, { arg }: { arg?: { refresh_token: string } }) => {
      const response = await authAPI.authControllerLogout(arg);
      return response.data;
    }
  );
};

// ============================================================================
// USERS HOOKS
// ============================================================================

// Get all users (admin only)
export const useUsers = () => {
  return useSWR('/users', async () => {
    const response = await usersAPI.usersControllerFindAll();
    return response.data;
  });
};

// Get user by ID
export const useUser = (id: string) => {
  return useSWR(id ? `/users/${id}` : null, async () => {
    const response = await usersAPI.usersControllerFindOne(id);
    return response.data;
  });
};

// Create user mutation
export const useCreateUser = () => {
  return useSWRMutation(
    '/users',
    async (url: string, { arg }: { arg: CreateUserDto }) => {
      const response = await usersAPI.usersControllerCreate(arg);
      return response.data;
    }
  );
};

// Update user mutation
export const useUpdateUser = () => {
  return useSWRMutation(
    '/users/update',
    async (
      url: string,
      { arg }: { arg: { id: string; data: UpdateUserDto } }
    ) => {
      const response = await usersAPI.usersControllerUpdate(arg.id, arg.data);
      return response.data;
    }
  );
};

// Delete user mutation
export const useDeleteUser = () => {
  return useSWRMutation(
    '/users/delete',
    async (url: string, { arg }: { arg: string }) => {
      const response = await usersAPI.usersControllerRemove(arg);
      return response.data;
    }
  );
};

// Get my profile
export const useMyProfile = () => {
  return useSWR('/users/me/profile', async () => {
    const response = await usersAPI.usersControllerGetMyProfile();
    return response.data;
  });
};

// Update my profile mutation
export const useUpdateMyProfile = () => {
  return useSWRMutation(
    '/users/me/profile',
    async (url: string, { arg }: { arg: UpdateUserDto }) => {
      const response = await usersAPI.usersControllerUpdateMyProfile(arg);
      return response.data;
    }
  );
};

// ============================================================================
// TRANSACTIONS HOOKS
// ============================================================================

// Get all transactions
export const useTransactions = () => {
  return useSWR('/transactions', async () => {
    const response = await transactionsAPI.transactionsControllerFindAll();
    return response.data;
  });
};

// Get transaction by ID
export const useTransaction = (id: string) => {
  return useSWR(id ? `/transactions/${id}` : null, async () => {
    const response = await transactionsAPI.transactionsControllerFindOne(id);
    return response.data;
  });
};

// Create transaction mutation
export const useCreateTransaction = () => {
  return useSWRMutation(
    '/transactions',
    async (url: string, { arg }: { arg: CreateTransactionDto }) => {
      const response = await transactionsAPI.transactionsControllerCreate(arg);
      return response.data;
    }
  );
};

// Update transaction mutation
export const useUpdateTransaction = () => {
  return useSWRMutation(
    '/transactions/update',
    async (
      url: string,
      { arg }: { arg: { id: string; data: UpdateTransactionDto } }
    ) => {
      const response = await transactionsAPI.transactionsControllerUpdate(
        arg.id,
        arg.data
      );
      return response.data;
    }
  );
};

// Delete transaction mutation
export const useDeleteTransaction = () => {
  return useSWRMutation(
    '/transactions/delete',
    async (url: string, { arg }: { arg: string }) => {
      const response = await transactionsAPI.transactionsControllerRemove(arg);
      return response.data;
    }
  );
};

// Get my transactions
export const useMyTransactions = () => {
  return useSWR('/transactions/me/transactions', async () => {
    const response =
      await transactionsAPI.transactionsControllerGetMyTransactions();
    return response.data;
  });
};

// Create my transaction mutation
export const useCreateMyTransaction = () => {
  return useSWRMutation(
    '/transactions/me/transactions',
    async (url: string, { arg }: { arg: CreateTransactionDto }) => {
      const response =
        await transactionsAPI.transactionsControllerCreateMyTransaction(arg);
      return response.data;
    }
  );
};
