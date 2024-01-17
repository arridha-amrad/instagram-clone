'use client';

import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as FilledIcon } from '@heroicons/react/24/solid';
import { Button } from '@nextui-org/react';
import { useSidebarContext } from './SidebarContext';
import { createPortal } from 'react-dom';

export default function NotificationBtn() {
  const {
    isNotification,
    setIsNotification,
    setPopperElement,
    attributes,
    styles,
    isDenseSidebar,
    setIsSearch
  } = useSidebarContext();

  return (
    <>
      <Button
        onClick={() => {
          setIsNotification((val) => !val);
          setIsSearch(false);
        }}
        variant="light"
        size="lg"
        className={`flex ${
          isDenseSidebar
            ? 'justify-center'
            : 'xl:justify-start justify-center xl:pl-4 xl:w-[200px] w-max'
        } `}
        startContent={
          isNotification ? (
            <FilledIcon className="w-7 h-7" />
          ) : (
            <HeartIcon className="w-7 h-7" />
          )
        }
        isIconOnly
      >
        {!isDenseSidebar && (
          <span className="font-normal  xl:block hidden pl-3">
            Notifications
          </span>
        )}
      </Button>
      {isNotification &&
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
              <div className="absolute -z-10 inset-y-0 left-10 right-0 bg-default blur-lg" />
              <div className="py-2 px-4">
                <h1 className="font-bold text-2xl">Notification</h1>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
