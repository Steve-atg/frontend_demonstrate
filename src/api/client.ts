import { Auth } from './generated/Auth';
import { Users } from './generated/Users';
import { Transactions } from './generated/Transactions';
import { Health } from './generated/Health';

// Base API URL
const API_BASE_URL = process.env.apiURL || 'http://localhost:8000';

// Create API client instances
export const authAPI = new Auth({
  baseURL: API_BASE_URL,
});

export const usersAPI = new Users({
  baseURL: API_BASE_URL,
});

export const transactionsAPI = new Transactions({
  baseURL: API_BASE_URL,
});

export const healthAPI = new Health({
  baseURL: API_BASE_URL,
});

// Helper function to set auth token for all clients
export const setAuthToken = (token: string) => {
  const authHeader = `Bearer ${token}`;

  authAPI.setSecurityData(token);
  usersAPI.setSecurityData(token);
  transactionsAPI.setSecurityData(token);
  healthAPI.setSecurityData(token);
};

// Helper function to clear auth token
export const clearAuthToken = () => {
  authAPI.setSecurityData(null);
  usersAPI.setSecurityData(null);
  transactionsAPI.setSecurityData(null);
  healthAPI.setSecurityData(null);
};
