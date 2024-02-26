'use client';

import {
  HomeIcon,
  PlayCircleIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline';
import { Avatar, Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import SearchButton from '../button/SearchBtn';

export default function BottomBar() {
  const router = useRouter();

  return (
    <div className="fixed sm:hidden block bottom-0 z-50 inset-x-0 h-12">
      <div className="bg-background border-t border-default w-full h-full flex items-center justify-evenly relative">
        <Button
          onClick={() => router.push('/')}
          radius="full"
          isIconOnly
          variant="light"
        >
          <HomeIcon className="w-6 h-6" />
        </Button>
        <SearchButton />
        <Button radius="full" isIconOnly variant="light">
          <PlusCircleIcon className="w-6 h-6" />
        </Button>
        <Button radius="full" isIconOnly variant="light">
          <PlayCircleIcon className="w-6 h-6" />
        </Button>
        <Button
          onClick={() => router.push('/arridha')}
          variant="light"
          radius="full"
          isIconOnly
        >
          <Avatar
            size="sm"
            src="https://i.pravatar.cc/150?u=a04258114e29026702d"
          />
        </Button>
      </div>
    </div>
  );
}
