'use client';

import { TProfileData } from '@/app/api/user/getProfileData';
import { ReactNode, createContext, useContext, useState } from 'react';

type TProfileContext = {
  user: TProfileData | null;
  updateTotalFollower: VoidFunction;
};

const ProfileContext = createContext<TProfileContext>({
  updateTotalFollower: () => {},
  user: null
});

export const ProfilePageProvider = ({
  children,
  data
}: {
  children: ReactNode;
  data: TProfileData;
}) => {
  const [user, setUser] = useState(data);
  const updateTotalFollower = () => {
    if (user.isFollow) {
      setUser((val) => ({
        ...val,
        totalFollowers: (val.totalFollowers -= 1)
      }));
    } else {
      setUser((val) => ({
        ...val,
        totalFollowers: (val.totalFollowers += 1)
      }));
    }
    setUser((val) => ({
      ...val,
      isFollow: !val.isFollow
    }));
  };
  return (
    <ProfileContext.Provider
      value={{
        user,
        updateTotalFollower
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('Profile info must be wrapped inside Profile Context');
  }
  return context;
};
