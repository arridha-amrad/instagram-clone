'use client';

import { IPost } from '@/actions/server/post';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState
} from 'react';

type TContext = {
  posts: IPost[];
  setPosts: Dispatch<SetStateAction<IPost[]>>;
  isLoading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const Context = createContext<TContext>({
  posts: [],
  setPosts: () => {},
  isLoading: true,
  setLoading: () => {}
});

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setLoading] = useState(true);
  return (
    <Context.Provider value={{ posts, setPosts, isLoading, setLoading }}>
      {children}
    </Context.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('usePosts must be wrapped inside Post Provider');
  }
  return context;
};
