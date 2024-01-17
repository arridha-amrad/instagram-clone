'use client';

import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebarContext } from './SidebarContext';

import { BsCompass } from 'react-icons/bs';
import { BsCompassFill } from 'react-icons/bs';

export default function ExploreBtn() {
  const pathname = usePathname();
  const isActive = pathname === '/explore';
  const { isDenseSidebar } = useSidebarContext();

  return (
    <Button
      variant="light"
      size="lg"
      as={Link}
      href="/explore"
      className={`flex ${
        isDenseSidebar
          ? 'justify-center'
          : 'xl:justify-start justify-center xl:pl-4 xl:w-[200px] w-max'
      } `}
      startContent={
        isActive && !isDenseSidebar ? (
          <BsCompassFill className="w-7 h-7" />
        ) : (
          <BsCompass className="w-7 h-7" />
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
          Explore
        </span>
      )}
    </Button>
  );
}
