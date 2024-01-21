'use client';

import { TProfileData } from '@/app/api/user/getProfileData';

type Props = {
  user: TProfileData;
};

export default function TotalFollowings({ user }: Props) {
  return (
    <div className="flex items-center flex-col md:flex-row md:gap-2">
      <h1 className="font-bold">{user?.totalFollowings}</h1>
      <p>Followings</p>
    </div>
  );
}
