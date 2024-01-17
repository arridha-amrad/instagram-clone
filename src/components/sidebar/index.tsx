import getServerSideSession from '@/utils/getServerSideSession';
import dynamic from 'next/dynamic';
import ThreadButton from '../button/ThreadsBtn';
import CreateBtn from './CreateBtn';
import ExploreBtn from './ExploreBtn';
import HomeBtn from './HomeBtn';
import MessageBtn from './MessageBtn';
import NotificationBtn from './NotificationBtn';
import ProfileBtn from './ProfileBtn';
import ReelsBtn from './ReelsBtn';
import SearchButton from './SearchButton';
import SidebarContextProvider from './SidebarContextProvider';
import SidebarMenu from './SidebarMenu';
import SidebarRefWrapper from './SidebarRefWrapper';
import { headers } from 'next/headers';

const Logo = dynamic(() => import('./Logo'), {
  ssr: false,
  loading: () => <div className="h-[90px]" />
});

export default async function Sidebar() {
  const session = await getServerSideSession();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/user/search`,
    {
      headers: headers()
    }
  );

  const data = await response.json();

  console.log(data);

  return (
    <SidebarContextProvider>
      <SidebarRefWrapper>
        <Logo />
        <div className="space-y-2 flex-1 flex-shrink-0">
          <HomeBtn />
          <SearchButton />
          <ExploreBtn />
          <ReelsBtn />
          <MessageBtn />
          <NotificationBtn />
          <CreateBtn />
          <ProfileBtn username={session?.user.username ?? '#@$#$@'} />
        </div>
        <div className="space-y-2 pb-4">
          <ThreadButton />
          <SidebarMenu />
        </div>
      </SidebarRefWrapper>
    </SidebarContextProvider>
  );
}
