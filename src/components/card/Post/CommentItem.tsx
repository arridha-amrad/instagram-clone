'use client';

import { IComment } from '@/lib/mongoose/models/Comment/types';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { Button } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { likeComment as like } from '@/actions/server/comment';

type Props = {
  comment: IComment;
};

const CommentItem = ({ comment }: Props) => {
  const { data } = useSession();
  const router = useRouter();
  const [isLiked, setLiked] = useState(comment.isLiked);
  const likeComment = async () => {
    if (!data) {
      router.replace('/accounts/login');
      return;
    }
    setLiked((val) => !val);
    await like(comment.id);
  };
  return (
    <div className="flex w-full items-center px-2">
      <span className="font-semibold text-sm pr-2">
        {comment.user.username}
      </span>
      <span className="text-sm flex-1">{comment.content}</span>
      <div className="">
        <Button onClick={likeComment} size="sm" variant="light" isIconOnly>
          {isLiked ? (
            <HeartIconSolid className="w-4 h-4 text-pink-600" />
          ) : (
            <HeartIcon className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default CommentItem;
