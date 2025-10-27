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
  }

  interface User extends NextAuthUser {
    id: string;
    userLevel: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    userLevel?: number;
  }
}
