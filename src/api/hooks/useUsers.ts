import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { usersAPI } from '../client';
import type { CreateUserDto, UpdateUserDto } from '../generated/data-contracts';

// Get all users hook (admin only)
export const useUsers = () => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  return useSWR(
    token ? '/users' : null,
    async () => {
      return await usersAPI.usersControllerFindAll();
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );
};

// Get user by ID hook
export const useUser = (id: string) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  return useSWR(
    token && id ? `/users/${id}` : null,
    async () => {
      return await usersAPI.usersControllerFindOne(id);
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );
};

// Get my profile hook
export const useMyProfile = () => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  return useSWR(
    token ? '/users/me/profile' : null,
    async () => {
      return await usersAPI.usersControllerGetMyProfile();
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );
};

// Create user hook
export const useCreateUser = () => {
  return useSWRMutation(
    '/users',
    async (url: string, { arg }: { arg: CreateUserDto }) => {
      return await usersAPI.usersControllerCreate(arg);
    }
  );
};

// Update user hook
export const useUpdateUser = () => {
  return useSWRMutation(
    '/users',
    async (
      url: string,
      { arg }: { arg: { id: string; data: UpdateUserDto } }
    ) => {
      return await usersAPI.usersControllerUpdate(arg.id, arg.data);
    }
  );
};

// Update my profile hook
export const useUpdateMyProfile = () => {
  return useSWRMutation(
    '/users/me/profile',
    async (url: string, { arg }: { arg: UpdateUserDto }) => {
      return await usersAPI.usersControllerUpdateMyProfile(arg);
    }
  );
};

// Delete user hook
export const useDeleteUser = () => {
  return useSWRMutation(
    '/users',
    async (url: string, { arg }: { arg: string }) => {
      return await usersAPI.usersControllerRemove(arg);
    }
  );
};
