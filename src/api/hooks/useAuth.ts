import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { authAPI } from '../client';
import type {
  LoginDto,
  RegisterDto,
  RefreshTokenDto,
} from '../generated/data-contracts';

// Login hook
export const useLogin = () => {
  return useSWRMutation(
    '/auth/login',
    async (url: string, { arg }: { arg: LoginDto }) => {
      return await authAPI.authControllerLogin(arg);
    }
  );
};

// Register hook
export const useRegister = () => {
  return useSWRMutation(
    '/auth/register',
    async (url: string, { arg }: { arg: RegisterDto }) => {
      return await authAPI.authControllerRegister(arg);
    }
  );
};

// Logout hook
export const useLogout = () => {
  return useSWRMutation(
    '/auth/logout',
    async (url: string, { arg }: { arg?: RefreshTokenDto }) => {
      return await authAPI.authControllerLogout(arg);
    }
  );
};

// Refresh token hook
export const useRefreshToken = () => {
  return useSWRMutation(
    '/auth/refresh',
    async (url: string, { arg }: { arg: RefreshTokenDto }) => {
      return await authAPI.authControllerRefreshTokens(arg);
    }
  );
};

// Get current user hook
export const useCurrentUser = () => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  return useSWR(
    token ? '/auth/me' : null,
    async () => {
      return await authAPI.authControllerGetCurrentUser();
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  );
};

// Get user profile hook
export const useUserProfile = () => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  return useSWR(
    token ? '/auth/profile' : null,
    async () => {
      return await authAPI.authControllerGetProfile();
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  );
};
