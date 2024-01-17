'use client';

import { Dispatch, SetStateAction, createContext, useContext } from 'react';

type TContext = {
  isDenseSidebar: boolean;
  setIsDenseSidebar: Dispatch<SetStateAction<boolean>>;
  setPopperElement: Dispatch<SetStateAction<HTMLDivElement | null>>;
  setRefElement: Dispatch<SetStateAction<HTMLDivElement | null>>;
  attributes: any;
  styles: any;
  isSearch: boolean;
  setIsSearch: Dispatch<SetStateAction<boolean>>;
  isNotification: boolean;
  setIsNotification: Dispatch<SetStateAction<boolean>>;
};

export const Context = createContext<TContext>({
  isDenseSidebar: false,
  setIsDenseSidebar: () => {},
  setPopperElement: () => {},
  setRefElement: () => {},
  attributes: '',
  styles: '',
  isSearch: false,
  setIsSearch: () => {},
  isNotification: false,
  setIsNotification: () => {}
});

export const useSidebarContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('must be wrap inside SidebarContextProvider');
  }
  return context;
};
