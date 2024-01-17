import { authOptions } from '@/app/api/auth/[...nextauth]/authOprions';
import { getServerSession } from 'next-auth';

const getServerSideSession = async () => {
  return getServerSession(authOptions);
};

export default getServerSideSession;
