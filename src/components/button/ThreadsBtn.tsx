'use client';

import { Button } from '@nextui-org/react';
import { FaThreads } from 'react-icons/fa6';
import { useSidebarContext } from '../sidebar/SidebarContext';

export default function ThreadButton() {
  const { isDenseSidebar } = useSidebarContext();

  return (
    <Button
      variant="light"
      size="lg"
      className={`flex ${
        isDenseSidebar
          ? 'justify-center'
          : 'xl:justify-start justify-center xl:pl-4 xl:w-[200px] w-max'
      } `}
      startContent={<FaThreads className="w-6 h-6" />}
      isIconOnly
    >
      {!isDenseSidebar && (
        <span className={` font-normal xl:block hidden pl-3`}>Threads</span>
      )}
    </Button>
  );
}
