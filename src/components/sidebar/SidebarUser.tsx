import getServerSideSession from '@/utils/getServerSideSession';
import { Button, Tooltip } from '@nextui-org/react';
import Link from 'next/link';
import SidebarUserPathname from './SidebarUserPathname';

export default async function SidebarUser() {
  const session = await getServerSideSession();
  const sessionUsername = session?.user.username;

  return (
    <div className="flex-1">
      <Tooltip className="xl:opacity-0 opacity-100" content="Profile">
        <Button
          as={Link}
          href={`/${sessionUsername}`}
          isIconOnly
          radius="full"
          variant="light"
          className="text-lg xl:self-start xl:w-max w-12 self-center xl:h-14 h-12 flex items-center xl:gap-5 xl:px-4"
        >
          <SidebarUserPathname sessionUsername={sessionUsername ?? ''} />
        </Button>
      </Tooltip>
    </div>
  );
}
