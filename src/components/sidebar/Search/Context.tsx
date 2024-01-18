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
  add: (data: TSearchResult) => void;
  remove: (data: TSearchResult) => void;
  removeAll: VoidFunction;
};

const Context = createContext<TSearchCache>({
  savedSearch: [],
  add: () => {},
  remove: () => {},
  removeAll: () => {}
});

export const SidebarSearchProvider = ({
  children,
  savedSearchFromApi
}: {
  children: ReactNode;
  savedSearchFromApi: TSearchResult[];
}) => {
  const [savedSearch, setSavedSearch] = useState(savedSearchFromApi);
  const add = (data: TSearchResult) => {
    const idx = savedSearch.findIndex((val) => val._id === data._id);
    const copy = [...savedSearch];
    if (idx >= 0) {
      copy.splice(idx, 1);
    }
    setSavedSearch(() => [data, ...copy]);
  };
  const remove = (data: TSearchResult) => {
    setSavedSearch((val) => [...val].filter((item) => item._id !== data._id));
  };
  const removeAll = () => {
    setSavedSearch(() => []);
  };
  return (
    <Context.Provider value={{ savedSearch, removeAll, add, remove }}>
      {children}
    </Context.Provider>
  );
};

export const useSidebarSearchContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('Context must be wrapped inside SidebarSearchProvider');
  }
  return context;
};
