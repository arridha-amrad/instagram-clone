'use client';

import { usePosts } from '@/providers/PostProvider';
import { useEffect } from 'react';
import PostCard from '../card/Post/PostCard';
import { IPost } from '@/actions/server/post';

type Props = {
  data: IPost[];
};

const PostList = ({ data }: Props) => {
  const { posts, setPosts, setLoading, isLoading } = usePosts();

  useEffect(() => {
    setPosts(data);
    setLoading(false);
  }, []);

  if (!!posts && isLoading) {
    return <p>loading...</p>;
  }
  return posts.map((post) => <PostCard post={post} key={post.id} />);
};

export default PostList;
