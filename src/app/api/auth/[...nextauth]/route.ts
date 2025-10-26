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
            const user = response.data.user;

            const userObject = {
              id: user.id,
              email: user.email,
              name: user.username,
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
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
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
