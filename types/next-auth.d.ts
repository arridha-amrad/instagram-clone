import { DefaultSession, DefaultUser, JWT } from 'next-auth';
import { JWT } from 'next-auth/jwt';

type TUser = {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar: string | null;
};

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    username: string;
    email: string;
    name: string;
    avatar: string | null;
  }
}

declare module 'next-auth' {
  interface Session {
    user: TUser;
  }

  interface User {
    id: string;
    username: string;
    email: string;
    name: string;
    avatar: string | null;
  }
}
