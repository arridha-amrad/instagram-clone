'use client';

import { TPost } from '@/lib/mongoose/models/Post';
import { ReactNode, createContext, useState } from 'react';

export type TContext = {
  posts: TPost[];
};

const Context = createContext<TContext>({
  posts: []
});

export const PostsProvider = ({
  children,
  posts
}: {
  children: ReactNode;
  posts: TPost[];
}) => {
  const [data, setData] = useState<TPost[]>(posts);
  console.log(data);
  return (
    <Context.Provider value={{ posts: data }}>{children}</Context.Provider>
  );
};
