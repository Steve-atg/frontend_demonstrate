import { NextAuthOptions, User as NextAuthUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      image?: string;
      userLevel: number;
    };
    accessToken?: string; // Add access token to session
    refreshToken?: string; // Add refresh token to session
  }

  interface User extends NextAuthUser {
    id: string;
    userLevel: number;
    accessToken?: string; // Add access token to user
    refreshToken?: string; // Add refresh token to user
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    userLevel?: number;
    accessToken?: string; // Add access token to JWT
    refreshToken?: string; // Add refresh token to JWT
  }
}
