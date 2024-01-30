'use client';

import { IPost } from '@/actions/server/post';
import { usePosts } from '@/providers/PostProvider';
import HeartIcon from '@heroicons/react/24/outline/HeartIcon';
import HeartIconSolid from '@heroicons/react/24/solid/HeartIcon';
import { Button } from '@nextui-org/react';

type Props = {
  post: IPost;
};

const PostLikedButton = ({ post }: Props) => {
  const { isLiked, id } = post;
  const { posts, setPosts } = usePosts();
  const liked = async () => {
    const mPosts = [...posts];
    const mPost = mPosts.find((p) => p.id === id);
    if (mPost) {
      mPost.isLiked = !mPost.isLiked;
    }
    setPosts(mPosts);
  };
  return (
    <Button onClick={liked} variant="light" isIconOnly>
      {isLiked ? (
        <HeartIconSolid className="w-7 h-7 text-pink-600" />
      ) : (
        <HeartIcon className="w-7 h-7" />
      )}
    </Button>
  );
};

export default PostLikedButton;
