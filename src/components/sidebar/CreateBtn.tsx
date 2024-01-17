'use client';

import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';
import { useSidebarContext } from './SidebarContext';

export default function CreateBtn() {
  const { isDenseSidebar } = useSidebarContext();

  return (
    <Button
      onClick={() => {}}
      variant="light"
      size="lg"
      className={`flex ${
        isDenseSidebar
          ? 'justify-center'
          : 'xl:justify-start justify-center xl:pl-4 xl:w-[200px] w-max'
      } `}
      startContent={<PlusCircleIcon className="w-7 h-7" />}
      isIconOnly
    >
      {!isDenseSidebar && (
        <span className={'font-normal xl:block hidden pl-3'}>Create</span>
      )}
    </Button>
  );
}
