'use client';

import { FollowArgs } from '@/app/api/user/follow';
import { Button } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useProfile } from './ProfileContext';
import { followApi } from './serverAction';

const FollowButton = () => {
  const { updateTotalFollower, user } = useProfile();
  const { data } = useSession();
  const router = useRouter();

  const follow = async () => {
    if (!data) {
      router.push('/accounts/login');
      return;
    }
    updateTotalFollower();
    const body = {
      userId: user?.id,
      authUserId: data.user.id
    } as FollowArgs;
    // await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/follow`, {
    //   body: JSON.stringify(body),
    //   method: 'POST'
    // });
    await followApi(body);
  };

  return (
    <Button
      onClick={follow}
      variant="solid"
      className="font-semibold w-[90px]"
      color={user?.isFollow ? 'default' : 'primary'}
    >
      {user?.isFollow ? 'UnFollow' : 'Follow'}
    </Button>
  );
};

export default FollowButton;
