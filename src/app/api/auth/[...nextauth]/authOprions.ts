import { NextAuthOptions } from 'next-auth';
import { config } from '../auth';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/accounts/login'
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        console.log('update');
        token.avatar = session.avatar;
      }
      if (user) {
        token = { ...user };
      }
      return token;
    },
    async session({ session, token, trigger, newSession }) {
      if (trigger === 'update') {
        console.log({ newSession });
        console.log({ session });
      }
      const { picture, sub, ...rest } = token;
      session.user = { ...rest };
      return session;
    }
  },
  providers: config.providers
};
