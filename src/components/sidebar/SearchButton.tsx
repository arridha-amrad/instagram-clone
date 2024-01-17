'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Button, Divider, Input, Spacer } from '@nextui-org/react';
import { useSidebarContext } from './SidebarContext';
import { createPortal } from 'react-dom';
import { useBreakpoint } from 'use-breakpoint';
import { BREAKPOINTS } from '@/utils/breakpoints';
import { UIEvent, useEffect, useLayoutEffect } from 'react';

export default function SearchButton() {
  const {
    isDenseSidebar,
    attributes,
    setPopperElement,
    styles,
    isSearch,
    setIsSearch,
    setIsNotification
  } = useSidebarContext();

  return (
    <>
      <Button
        onClick={() => {
          setIsSearch((val) => !val);
          setIsNotification(false);
        }}
        variant="light"
        size="lg"
        className={`flex ${
          isDenseSidebar
            ? 'justify-center'
            : 'xl:justify-start justify-center xl:pl-4 xl:w-[200px] w-max'
        } `}
        startContent={
          <MagnifyingGlassIcon
            className={isSearch ? 'w-7 h-7 stroke-[3px]' : 'w-7 h-7'}
          />
        }
        isIconOnly={true}
      >
        {!isDenseSidebar && (
          <span className="xl:block pl-3 hidden">Search</span>
        )}
      </Button>
      {isSearch &&
        createPortal(
          <div
            {...attributes.popper}
            style={styles.popper}
            ref={setPopperElement}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="h-screen relative rounded-xl rounded-br bg-background w-[350px]"
            >
              <div className="absolute -z-10 inset-y-0 left-20 right-0 bg-default blur-xl" />
              <div className="py-2 px-4">
                <h1 className="font-bold text-2xl">Search</h1>
              </div>
              <Spacer y={3} />
              <div className="px-4">
                <Input
                  size="sm"
                  type="text"
                  placeholder="Search"
                  startContent={
                    <MagnifyingGlassIcon className="w-5 h-5 pointer-events-none" />
                  }
                  isClearable
                />
              </div>
              <Spacer y={4} />
              <Divider />
              <div className="flex justify-between items-center px-4 py-2">
                <div>
                  <h1 className="font-bold">Latest</h1>
                </div>
                <Button variant="light" color="primary" className="font-bold">
                  Clear all
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
