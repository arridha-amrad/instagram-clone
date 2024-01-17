'use client';

import UserIcon from '@heroicons/react/24/outline/UserIcon';
import UserIconFilled from '@heroicons/react/24/solid/UserIcon';
import { usePathname } from 'next/navigation';

type Props = {
  sessionUsername: string;
};

export default function SidebarUserPathname({ sessionUsername }: Props) {
  const pathname = usePathname();
  const isActive = pathname.includes(sessionUsername ?? '');
  return (
    <>
      {isActive ? (
        <UserIconFilled className="w-7 h-7" />
      ) : (
        <UserIcon className="w-7 h-7" />
      )}
      <span
        className={`xl:block pl-4 hidden ${
          isActive ? 'font-bold' : 'font-normal'
        }`}
      >
        Profile
      </span>
    </>
  );
}
