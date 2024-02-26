'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useSidebarContext } from '../SidebarContext';

type Props = {
  children: ReactNode;
};

export default function SearchButton({ children }: Props) {
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
              {children}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
