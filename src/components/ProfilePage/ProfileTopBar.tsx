import React from 'react';
import { Navbar, NavbarContent, NavbarItem, Button } from '@nextui-org/react';
import {
  Bars3Icon,
  ChevronDownIcon,
  SquaresPlusIcon
} from '@heroicons/react/24/outline';

type Props = {
  username: string;
};

export default function ProfileTopBar(props: Props) {
  return (
    <Navbar className="sm:hidden block" isBordered shouldHideOnScroll>
      <NavbarContent justify="start">
        <NavbarItem>
          <Button variant="light" color="default">
            <span className="text-large font-semibold">{props.username}</span>
            <ChevronDownIcon className="w-6 h-6" />
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            size="md"
            radius="full"
            className="p-1"
            variant="light"
            isIconOnly
          >
            <SquaresPlusIcon className="w-7 h-7" />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            size="md"
            radius="full"
            className="p-1"
            variant="light"
            isIconOnly
          >
            <Bars3Icon className="w-7 h-7" />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
