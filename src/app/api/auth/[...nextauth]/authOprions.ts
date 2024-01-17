import { NextAuthOptions } from 'next-auth';
import { config } from '../auth';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/accounts/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...user };
      }
      return token;
    },
    async session({ session, token }) {
      const { picture, sub, ...rest } = token;
      session.user = { ...rest };
      return session;
    }
  },
  providers: config.providers
};
