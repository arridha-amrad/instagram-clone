import { FollowArgs } from '@/app/api/user/follow';

export const followApi = async (body: FollowArgs) => {
  await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/follow`, {
    body: JSON.stringify(body),
    method: 'POST'
  });
};
