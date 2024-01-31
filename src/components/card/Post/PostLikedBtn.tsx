'use client';

import usePostsStore from '@/lib/zustand/store/postStore';
import HeartIcon from '@heroicons/react/24/outline/HeartIcon';
import HeartIconSolid from '@heroicons/react/24/solid/HeartIcon';
import { Button } from '@nextui-org/react';
import { likePost as like } from '@/actions/server/post';
import { IPost } from '@/lib/mongoose/models/Post/types';
import { useParams } from 'next/navigation';

type Props = {
  post: IPost;
};

const PostLikedButton = ({ post }: Props) => {
  const { isLiked, id } = post;
  const { likePost } = usePostsStore();
  const param = useParams();
  console.log(param.postId);

  const liked = async () => {
    if (param.postId) {
      likePost();
    } else {
      likePost(id);
    }
    await like(id);
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
