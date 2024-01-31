'use client';

import { useEffect } from 'react';
import PostCard from '../card/Post/PostCard';
import usePostsStore from '@/lib/zustand/store/postStore';

type Props = {
  data: string;
};

const PostList = ({ data }: Props) => {
  const { setPosts, posts, setLoading, isLoading } = usePostsStore();

  useEffect(
    () => {
      setPosts(JSON.parse(data));
      setLoading(false);
    },
    // eslint-disable-next-line
    [data]
  );

  if (!!posts && isLoading) {
    return <p>loading...</p>;
  }
  return posts.map((post) => <PostCard post={post} key={post.id} />);
};

export default PostList;
