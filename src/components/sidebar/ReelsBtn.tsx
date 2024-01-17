'use client';

import { VideoCameraIcon as Icon } from '@heroicons/react/24/outline';
import { VideoCameraIcon as FilledIcon } from '@heroicons/react/24/solid';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebarContext } from './SidebarContext';

export default function ReelsBtn() {
  const pathname = usePathname();
  const isActive = pathname === '/reels';
  const { isDenseSidebar } = useSidebarContext();

  return (
    <Button
      variant="light"
      size="lg"
      as={Link}
      href="/reels"
      className={`flex ${
        isDenseSidebar
          ? 'justify-center'
          : 'xl:justify-start justify-center xl:pl-4 xl:w-[200px] w-max'
      } `}
      startContent={
        isActive && !isDenseSidebar ? (
          <FilledIcon className="w-7 h-7" />
        ) : (
          <Icon className="w-7 h-7" />
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
          Reels
        </span>
      )}
    </Button>
  );
}
