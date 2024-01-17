'use client';

import { useProfile } from './ProfileContext';

export default function TotalFollowers() {
  const { user } = useProfile();
  return (
    <div className="flex items-center flex-col md:flex-row md:gap-2">
      <h1 className="font-bold">{user?.totalFollowers}</h1>
      <p>Followers</p>
    </div>
  );
}
