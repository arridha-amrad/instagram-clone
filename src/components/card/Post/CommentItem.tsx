'use client';

import { IComment } from '@/actions/server/post';
import { baseURL } from '@/actions/variables';
import { HeartIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Props = {
  comment: IComment;
};

const CommentItem = ({ comment }: Props) => {
  const { data } = useSession();
  const router = useRouter();
  const likeComment = async () => {
    if (!data) {
      router.replace('/accounts/login');
      return;
    }
    console.log(comment.id);
    // await fetch(`${baseURL}/api/comment/like`, {
    //   method: 'POST',
    //   body: JSON.stringify({ authId: data.user.id, commentId: comment.id })
    // });
  };
  return (
    <div className="flex w-full items-center px-2">
      <span className="font-semibold text-sm pr-2">
        {comment.user.username}
      </span>
      <span className="text-sm flex-1">{comment.content}</span>
      <div className="">
        <Button
          onClick={likeComment}
          size="sm"
          variant="light"
          isIconOnly
          startContent={<HeartIcon className="w-4 h-4" />}
        />
      </div>
    </div>
  );
};

export default CommentItem;
