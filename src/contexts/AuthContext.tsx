'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { setAuthToken, clearAuthToken } from '@/api/client';
import {
  useLogin,
  useLogout,
  useCurrentUser,
  useRefreshToken,
} from '@/api/hooks';
import type {
  LoginDto,
  RefreshTokenResponseDto,
} from '@/api/generated/data-contracts';

interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginDto) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: (refreshToken: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // SWR hooks
  const { trigger: loginMutation, isMutating: isLoggingIn } = useLogin();
  const { trigger: logoutMutation } = useLogout();
  const { trigger: refreshTokenMutation } = useRefreshToken();

  // Only fetch user data if authenticated
  const {
    data: user,
    error: userError,
    isLoading: isLoadingUser,
  } = useCurrentUser();

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token && refreshToken) {
      setAccessToken(token);
      setAuthToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  // Handle user fetch error (e.g., token expired)
  useEffect(() => {
    if (userError && isAuthenticated) {
      // Token might be expired, try to refresh or logout
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        handleRefreshToken(refreshToken);
      } else {
        handleLogout();
      }
    }
  }, [userError, isAuthenticated]);

  const login = async (credentials: LoginDto) => {
    try {
      const response = await loginMutation(credentials);

      // Type assertion since the API response type is not properly generated
      const authResponse = response as any;

      if (authResponse?.access_token) {
        const { access_token, refresh_token } = authResponse;

        // Store tokens
        localStorage.setItem('accessToken', access_token);
        localStorage.setItem('refreshToken', refresh_token);

        // Set auth token for API clients
        setAuthToken(access_token);
        setAccessToken(access_token);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        await logoutMutation({ refresh_token: refreshToken });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      handleLogout();
    }
  };

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Clear auth token from API clients
    clearAuthToken();
    setAccessToken(null);
    setIsAuthenticated(false);
  };

  const handleRefreshToken = async (refreshToken: string) => {
    try {
      const response = await refreshTokenMutation({
        refresh_token: refreshToken,
      });

      // Type assertion since the API response type is not properly generated
      const refreshResponse = response as RefreshTokenResponseDto;

      if (refreshResponse?.access_token) {
        const { access_token, refresh_token: newRefreshToken } =
          refreshResponse;

        // Update stored tokens
        localStorage.setItem('accessToken', access_token);
        localStorage.setItem('refreshToken', newRefreshToken);

        // Update auth token for API clients
        setAuthToken(access_token);
        setAccessToken(access_token);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      handleLogout();
    }
  };

  const value: AuthContextType = {
    user: user || null,
    isAuthenticated,
    isLoading: isLoggingIn || isLoadingUser,
    login,
    logout,
    refreshToken: handleRefreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
