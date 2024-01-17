'use client';

import { ReactNode, useState, useRef, useEffect } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { Context } from './SidebarContext';
import { usePopper } from 'react-popper';
import { usePathname } from 'next/navigation';

export const SidebarContextProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [isDenseSidebar, setIsDenseSidebar] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [isSearch, setIsSearch] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (isSearch || isNotification) {
        if (ref.current && !ref.current.contains(e.target as any)) {
          setIsDenseSidebar(false);
          setIsSearch(false);
          setIsNotification(false);
        }
      }
    };
    const handleEscPress = (e: KeyboardEvent) => {
      if (isSearch || isNotification) {
        if (e.key === 'Esc') {
          setIsDenseSidebar(false);
          setIsSearch(false);
          setIsNotification(false);
        }
      }
    };
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleEscPress);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.addEventListener('keydown', handleEscPress);
    };
  }, [isSearch, isNotification]);

  useEffect(() => {
    if (isSearch || isNotification) {
      setIsDenseSidebar(true);
    } else {
      setIsDenseSidebar(false);
    }
  }, [isSearch, isNotification]);

  const pathname = usePathname();

  useEffect(() => {
    setIsDenseSidebar(false);
    setIsSearch(false);
    setIsNotification(false);
  }, [pathname]);

  const [refElement, setRefElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { attributes, styles } = usePopper(refElement, popperElement, {
    strategy: 'fixed',
    placement: 'auto',
    modifiers: [{ name: 'offset', options: { offset: [0, 0] } }]
  });

  return (
    <Context.Provider
      value={{
        isDenseSidebar,
        setRefElement,
        setIsDenseSidebar,
        setPopperElement,
        attributes,
        styles,
        isSearch,
        setIsSearch,
        isNotification,
        setIsNotification
      }}
    >
      <div
        className="xl:w-[250px] relative flex h-full px-2"
        ref={mergeRefs([ref])}
      >
        {children}
      </div>
    </Context.Provider>
  );
};

export default SidebarContextProvider;
