import { Auth } from './generated/Auth';
import { Users } from './generated/Users';
import { Transactions } from './generated/Transactions';
import { Health } from './generated/Health';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Base API URL
const API_BASE_URL = process.env.apiURL || 'http://localhost:8000';

// Security worker function to automatically inject Bearer token
const securityWorker = async () => {
  let accessToken;

  if (typeof window === 'undefined') {
    // Server-side: use getServerSession
    const serverSession = await getServerSession(authOptions);
    accessToken = serverSession?.accessToken;
  } else {
    // Client-side: use getSession
    const clientSession = await getSession();
    accessToken = clientSession?.accessToken;
  }

  if (accessToken) {
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }

  return {};
};

// Create API client instances with automatic authentication
export const authAPI = new Auth({
  baseURL: API_BASE_URL,
});

export const usersAPI = new Users({
  baseURL: API_BASE_URL,
  securityWorker,
});

export const transactionsAPI = new Transactions({
  baseURL: API_BASE_URL,
  securityWorker,
});

export const healthAPI = new Health({
  baseURL: API_BASE_URL,
  securityWorker,
});
