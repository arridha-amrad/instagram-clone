'use client';

import { Button } from '@nextui-org/react';
import { followUser } from '@/actions/server/user';
import { TProfileData } from '@/lib/mongoose/models/User/types';

type Props = {
  user: TProfileData;
};

const FollowButton = ({ user }: Props) => {
  const follow = async () => {
    if (!user) return;
    await followUser(user.id, user.username);
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
