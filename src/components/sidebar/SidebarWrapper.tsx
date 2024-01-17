'use client';

import { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';

export default function SidebarWrapper({ children }: { children: ReactNode }) {
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'right-start',
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [0, 10] } }]
  });
  return (
    <div className="border-r h-full sticky border-skin-base w-max pr-2">
      <div ref={setReferenceElement}>{children}</div>
      {typeof window === 'object' &&
        createPortal(
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <div className="fixed inset-0 z-[99999]">
              <div className="relative z-[9999999999999999999999] bg-red-500 w-[300px]">
                aa
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
