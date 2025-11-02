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
      const response = await usersAPI.usersControllerFindAll();
      return response.data; // Return only the data, ignore axios details
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
      const response = await usersAPI.usersControllerFindOne(id);
      return response.data; // Return only the data, ignore axios details
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
      const response = await usersAPI.usersControllerGetMyProfile();
      return response.data; // Return only the data, ignore axios details
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
      const response = await usersAPI.usersControllerCreate(arg);
      return response.data; // Return only the data, ignore axios details
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
      const response = await usersAPI.usersControllerUpdate(arg.id, arg.data);
      return response.data; // Return only the data, ignore axios details
    }
  );
};

// Update my profile hook
export const useUpdateMyProfile = () => {
  return useSWRMutation(
    '/users/me/profile',
    async (url: string, { arg }: { arg: UpdateUserDto }) => {
      const response = await usersAPI.usersControllerUpdateMyProfile(arg);
      return response.data; // Return only the data, ignore axios details
    }
  );
};

// Delete user hook
export const useDeleteUser = () => {
  return useSWRMutation(
    '/users',
    async (url: string, { arg }: { arg: string }) => {
      const response = await usersAPI.usersControllerRemove(arg);
      return response.data; // Return only the data, ignore axios details
    }
  );
};
