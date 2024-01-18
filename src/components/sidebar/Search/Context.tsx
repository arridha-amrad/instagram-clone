'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

export type TSearchResult = {
  _id: string;
  username: string;
  name: string;
  avatar?: string;
};

type TSearchCache = {
  savedSearch: TSearchResult[];
};

const Context = createContext<TSearchCache>({
  savedSearch: []
});

export const SidebarSearchProvider = ({
  children,
  savedSearchFromApi
}: {
  children: ReactNode;
  savedSearchFromApi: TSearchResult[];
}) => {
  const [savedSearch] = useState(savedSearchFromApi);
  return (
    <Context.Provider value={{ savedSearch }}>{children}</Context.Provider>
  );
};

export const useSidebarSearchContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('Context must be wrapped inside SidebarSearchProvider');
  }
  return context;
};
