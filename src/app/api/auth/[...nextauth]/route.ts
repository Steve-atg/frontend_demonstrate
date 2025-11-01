import { authAPI } from '@/api/client';
import NextAuth from 'next-auth';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';
// import GitHubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
  providers: [
    // Credentials Provider (for custom login with your API)
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const requestBody = {
            email: credentials.email,
            password: credentials.password,
          };

          const response = await authAPI.authControllerLogin(requestBody);

          if (response.status === 200) {
            const { user, access_token, refresh_token } = response.data;

            const userObject = {
              ...user,
              accessToken: access_token,
              refreshToken: refresh_token,
            };

            return userObject;
          } else {
            console.log('❌ NextAuth: Login failed:', {
              status: response.status,
              statusText: response.statusText,
            });
            return null;
          }
        } catch (error) {
          console.error('💥 NextAuth: Authentication error:', error);
          return null;
        }
      },
    }),

    // Uncomment and configure these providers as needed
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),

    // GitHubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID!,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    // }),
  ],

  pages: {
    signIn: '/auth', // Custom sign-in page
    // signUp: '/auth/register', // Custom sign-up page (if needed)
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60, // 30 days
      },
    },
    callbackUrl: {
      name: 'next-auth.callback-url',
      options: {
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    csrfToken: {
      name: 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.userLevel = user.userLevel;
        token.accessToken = user.accessToken; // Store access token in JWT
        token.refreshToken = user.refreshToken; // Store refresh token in JWT
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.userLevel = token.userLevel as number;
        session.accessToken = token.accessToken as string; // Add access token to session
        session.refreshToken = token.refreshToken as string; // Add refresh token to session
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  // Enable debug mode in development
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
