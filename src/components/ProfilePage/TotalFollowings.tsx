'use client';

import { useProfile } from './ProfileContext';

export default function TotalFollowings() {
  const { user } = useProfile();
  return (
    <div className="flex items-center flex-col md:flex-row md:gap-2">
      <h1 className="font-bold">{user?.totalFollowings}</h1>
      <p>Followings</p>
    </div>
  );
}
