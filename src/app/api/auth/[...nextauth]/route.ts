import NextAuth from 'next-auth';
import { authOptions } from './authOprions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
