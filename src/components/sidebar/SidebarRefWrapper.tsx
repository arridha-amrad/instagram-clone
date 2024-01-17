'use client';

import { ReactNode } from 'react';
import { useSidebarContext } from './SidebarContext';

export default function SidebarRefWrapper({
  children
}: {
  children: ReactNode;
}) {
  const { setRefElement } = useSidebarContext();
  return (
    <div
      ref={setRefElement}
      className="border-r h-full flex-nowrap overflow-y-auto flex flex-col border-skin-base w-max pr-2"
    >
      {children}
    </div>
  );
}
