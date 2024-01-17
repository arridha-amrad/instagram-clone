'use client';

import { TProfileData } from '@/app/api/user/getProfileData';
import { Avatar, Button, Spacer } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { FaLink, FaThreads } from 'react-icons/fa6';
import UpdateableAvatar from '../avatar/UpdatableAvatar';
import ProfileOtherMenuButton from '../button/ProfileOtherMenuButton';
import FollowButton from './FollowButton';
import MessageButton from './MessageBtn';
import ProfileEditButton from './ProfileEditBtn';
import ProfileSettingsButton from './ProfileSettingsBtn';
import ProfileViewArchiveButton from './ProfileViewArchiveBtn';
import SuggestUserButton from './SuggestUserBtn';

type Props = {
  username: string;
  user: TProfileData;
};

export default function ProfileData({ user }: Props) {
  const { data } = useSession();

  const avatarURL =
    user?.avatar ?? `${process.env.NEXT_PUBLIC_URL}/default_profile.jpg`;

  const isMe = data?.user.id === user.id;

  const [followers, setFollowers] = useState(user.totalFollowers);
  const [followings] = useState(user.totalFollowings);
  const [isFollow, setIsFollow] = useState(user.isFollow);

  const updateFollowers = () => {
    if (isFollow) {
      setFollowers((f) => (f -= 1));
    } else {
      setFollowers((f) => (f += 1));
    }
    setIsFollow((val) => !val);
  };

  return (
    <div className="p-4">
      <div className="h-24 mx-auto md:h-max w-max md:gap-10 px-4 flex items-center justify-between">
        <div className="w-auto md:flex-2 h-max">
          {isMe ? (
            <UpdateableAvatar src={avatarURL} />
          ) : (
            <Avatar
              className="w-20 h-20 md:w-40 md:h-40 text-large"
              src={avatarURL}
            />
          )}
        </div>
        <div className="md:flex-3 md:space-y-6 w-full">
          <div className="md:flex hidden items-center">
            <h1 className="text-lg pr-6">{user?.username}</h1>

            {isMe ? (
              <>
                <ProfileEditButton user={user} />
                <Spacer x={2} />
                <ProfileViewArchiveButton />
                <Spacer x={1} />
                <ProfileSettingsButton />
              </>
            ) : (
              <>
                <FollowButton />
                <MessageButton />
                <SuggestUserButton />
                <ProfileOtherMenuButton />
              </>
            )}
          </div>
          <div className="flex w-full justify-evenly md:justify-start md:gap-10">
            <div className="flex items-center flex-col md:flex-row md:gap-2">
              <h1 className="font-bold">0</h1>
              <p>Posts</p>
            </div>
            <div className="flex items-center flex-col md:flex-row md:gap-2">
              <h1 className="font-bold">{followers}</h1>
              <p>Followers</p>
            </div>
            <div className="flex items-center flex-col md:flex-row md:gap-2">
              <h1 className="font-bold">{followings}</h1>
              <p>Followings</p>
            </div>
          </div>
          <div className="md:block hidden">
            <Description
              name={user?.name}
              bio={user?.bio}
              occupation={user?.occupation}
              threadUsername={user?.threadUsername}
              web={user?.web}
            />
          </div>
        </div>
      </div>
      <div className="md:hidden block">
        <Description
          name={user?.name}
          bio={user?.bio}
          occupation={user?.occupation}
          threadUsername={user?.threadUsername}
          web={user?.web}
        />
      </div>
      <div className="md:hidden flex items-center justify-start gap-4 mt-4">
        {isMe ? <ProfileEditButton user={user} /> : <FollowButton />}
        {isMe ? <ProfileViewArchiveButton /> : <MessageButton />}
        {isMe ? <ProfileSettingsButton /> : <SuggestUserButton />}
      </div>
    </div>
  );
}

type TDescription = {
  name: string;
  occupation?: string;
  threadUsername?: string;
  bio?: string;
  web?: string;
};

const Description = (props: TDescription) => {
  const { name, bio, occupation, threadUsername, web } = props;
  return (
    <>
      <h1 className="md:font-bold">{name}</h1>
      <h2 className="text-skin-accent">{occupation}</h2>
      {threadUsername && (
        <Button variant="flat" size="sm">
          <FaThreads className="w-4 h-4" />
          <span>@{threadUsername}</span>
        </Button>
      )}
      <p className="whitespace-break-spaces">{bio}</p>
      {web && (
        <div className="space-x-2">
          <FaLink className="w-4 h-4 inline" />
          <Link className="inline" href="/">
            {web}
          </Link>
        </div>
      )}
    </>
  );
};
