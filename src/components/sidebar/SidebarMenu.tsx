'use client';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button
} from '@nextui-org/react';
import SettingsIcon from '@heroicons/react/24/outline/Cog6ToothIcon';
import LogoutIcon from '@heroicons/react/24/outline/ArrowLeftOnRectangleIcon';
import ArrowTrendingUpIcon from '@heroicons/react/24/outline/ArrowTrendingUpIcon';
import BookmarkIcon from '@heroicons/react/24/outline/BookmarkIcon';
import ExclamationIcon from '@heroicons/react/24/outline/ExclamationCircleIcon';
import MoonIcon from '@heroicons/react/24/outline/MoonIcon';
import SunIcon from '@heroicons/react/24/outline/SunIcon';
import { switchTheme } from '@/utils/switch-theme';
import MenuIcon from '@heroicons/react/24/solid/EllipsisHorizontalIcon';
import { signOut } from 'next-auth/react';
import { useSidebarContext } from './SidebarContext';

export default function SidebarMenu() {
  const logout = async () => {
    await signOut({ callbackUrl: '/accounts/login', redirect: true });
  };
  const { isDenseSidebar } = useSidebarContext();

  return (
    <Dropdown backdrop="opaque" placement="top">
      <div className="mx-auto xl:mx-0">
        <DropdownTrigger>
          <Button
            variant="light"
            size="lg"
            className={`flex ${
              isDenseSidebar
                ? 'justify-center'
                : 'xl:justify-start justify-center xl:pl-4 xl:w-[200px] w-max'
            } `}
            startContent={<MenuIcon className="w-7 h-7" />}
            isIconOnly
          >
            {!isDenseSidebar && (
              <span className={` font-normal xl:block hidden pl-3`}>Menu</span>
            )}
          </Button>
        </DropdownTrigger>
      </div>

      <DropdownMenu closeOnSelect={false} aria-label="Static Actions">
        <DropdownItem
          className="h-10"
          startContent={<SettingsIcon className="w-5 h-5" />}
          key="settings"
        >
          Settings
        </DropdownItem>
        <DropdownItem
          className="h-10"
          startContent={<ArrowTrendingUpIcon className="w-5 h-5" />}
          key="your activity"
        >
          Your Activity
        </DropdownItem>
        <DropdownItem
          className="h-10"
          startContent={<BookmarkIcon className="w-5 h-5" />}
          key="saved"
        >
          Saved
        </DropdownItem>
        <DropdownItem
          onClick={switchTheme}
          className="h-10"
          startContent={
            <>
              <MoonIcon className="w-5 h-5 dark:hidden block" />
              <SunIcon className="w-5 h-5 hidden dark:block" />
            </>
          }
          key="Switch appearance"
        >
          Switch appearance
        </DropdownItem>
        <DropdownItem
          showDivider
          className="h-10"
          startContent={<ExclamationIcon className="w-5 h-5" />}
          key="report a problem"
        >
          Report a problem
        </DropdownItem>
        <DropdownItem
          onClick={logout}
          className="h-10"
          startContent={<LogoutIcon className="w-5 h-5" />}
          key="logout"
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
