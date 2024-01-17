import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse
} from 'next';
import type { NextAuthOptions, User } from 'next-auth';
import { getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginWithCredentials } from './loginCredentials';

export const config = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        identity: {},
        password: {}
      },
      async authorize(credentials, req) {
        const body = credentials;
        if (!body) return null;
        const userFromDb = await loginWithCredentials({
          identity: body.identity,
          password: body.password
        });
        const { _id, email, name, username, avatar } = userFromDb;
        const user: User = {
          id: _id.toString(),
          username,
          email,
          name,
          avatar: avatar ?? null
        };
        if (user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ]
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
