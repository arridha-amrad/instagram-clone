import { fetchProfile } from '@/actions/server/user';
import FollowButton from '@/components/ProfilePage/FollowButton';
import MessageButton from '@/components/ProfilePage/MessageBtn';
import ProfileEditButton from '@/components/ProfilePage/ProfileEditBtn';
import ProfileSettingsButton from '@/components/ProfilePage/ProfileSettingsBtn';
import ProfileTab from '@/components/ProfilePage/ProfileTab';
import ProfileTopBar from '@/components/ProfilePage/ProfileTopBar';
import ProfileViewArchiveButton from '@/components/ProfilePage/ProfileViewArchiveBtn';
import SuggestUserButton from '@/components/ProfilePage/SuggestUserBtn';
import TotalFollowers from '@/components/ProfilePage/TotalFollowers';
import TotalFollowings from '@/components/ProfilePage/TotalFollowings';
import TotalPosts from '@/components/ProfilePage/TotalPosts';
import UpdateableAvatar from '@/components/avatar/UpdatableAvatar';
import ProfileOtherMenuButton from '@/components/button/ProfileOtherMenuButton';
import { TProfileData } from '@/lib/mongoose/models/User/types';
import getServerSideSession from '@/utils/getServerSideSession';
import { Avatar, Button, Link, Spacer } from '@nextui-org/react';
import { ReactNode } from 'react';
import { FaLink, FaThreads } from 'react-icons/fa6';

type Props = {
  children: ReactNode;
  params: {
    username: string;
  };
};

export default async function ProfileLayout({
  children,
  params: { username }
}: Props) {
  const user = (await fetchProfile(username)) as any;

  return (
    <main className="w-full max-w-5xl mx-auto sm:mt-4 sm:pl-10">
      {user ? (
        <Content user={user} username={username}>
          {children}
        </Content>
      ) : (
        <NoContent />
      )}
    </main>
  );
}

type LayoutContent = {
  username: string;
  user: TProfileData;
  children: ReactNode;
};

const Content = ({ children, user, username }: LayoutContent) => {
  return (
    <>
      <ProfileTopBar username={username} />
      <ProfileInfo user={user} />
      <Spacer y={4} />
      <div className="w-full">
        <ProfileTab username={username} />
      </div>
      {children}
    </>
  );
};

const ProfileInfo = async ({ user }: { user: TProfileData }) => {
  const session = await getServerSideSession();
  const avatarURL =
    user?.avatar ?? `${process.env.NEXT_PUBLIC_URL}/default_profile.jpg`;
  const isMe = session?.user.id === user.id;
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
                <FollowButton user={user} />
                <Spacer x={2} />
                <MessageButton />
                <Spacer x={2} />
                <SuggestUserButton />
                <Spacer x={1} />
                <ProfileOtherMenuButton />
              </>
            )}
          </div>
          <div className="flex w-full justify-evenly md:justify-start md:gap-10">
            <TotalPosts />
            <TotalFollowers user={user} />
            <TotalFollowings user={user} />
          </div>
          <div className="md:block hidden">
            <Description user={user} />
          </div>
        </div>
      </div>
      <div className="md:hidden block">
        <Description user={user} />
      </div>
      <div className="md:hidden flex items-center justify-start gap-4 mt-4">
        {isMe ? (
          <ProfileEditButton user={user} />
        ) : (
          <FollowButton user={user} />
        )}
        {isMe ? <ProfileViewArchiveButton /> : <MessageButton />}
        {isMe ? <ProfileSettingsButton /> : <SuggestUserButton />}
      </div>
    </div>
  );
};

type TDescription = {
  user: TProfileData;
};

const Description = ({ user }: TDescription) => {
  const { name, bio, occupation, threadUsername, web } = user;
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

const NoContent = () => {
  return <p>The page you are looking for is not found</p>;
};
