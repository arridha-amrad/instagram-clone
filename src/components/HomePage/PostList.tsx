'use client';

import { useEffect } from 'react';
import PostCard from '../card/Post/PostCard';
import { IPost } from '@/actions/server/post';
import usePostsStore from '@/lib/zustand/store/postStore';

type Props = {
  data: IPost[];
};

const PostList = ({ data }: Props) => {
  const { setPosts, posts, setLoading, isLoading } = usePostsStore();

  useEffect(() => {
    setPosts(data);
    setLoading(false);
  }, [data]);

  if (!!posts && isLoading) {
    return <p>loading...</p>;
  }
  return posts.map((post) => <PostCard post={post} key={post.id} />);
};

export default PostList;
