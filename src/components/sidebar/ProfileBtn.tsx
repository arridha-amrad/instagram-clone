'use client';

import { Button } from '@nextui-org/react';
import { UserIcon } from '@heroicons/react/24/outline';
import { UserIcon as FilledIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebarContext } from './SidebarContext';

type Props = {
  username: string;
};

export default function ProfileBtn({ username }: Props) {
  const pathname = usePathname();
  const isActive = pathname.includes(username);
  const { isDenseSidebar } = useSidebarContext();
  return (
    <Button
      as={Link}
      href={`/${username}`}
      variant="light"
      size="lg"
      className={`flex ${
        isDenseSidebar
          ? 'justify-center'
          : 'xl:justify-start justify-center xl:pl-4 xl:w-[200px] w-max'
      } `}
      startContent={
        isActive && !isDenseSidebar ? (
          <FilledIcon className="w-7 h-7" />
        ) : (
          <UserIcon className="w-7 h-7" />
        )
      }
      isIconOnly
    >
      {!isDenseSidebar && (
        <span
          className={`${
            isActive ? 'font-bold' : 'font-normal'
          } xl:block hidden pl-3`}
        >
          Profile
        </span>
      )}
    </Button>
  );
}
