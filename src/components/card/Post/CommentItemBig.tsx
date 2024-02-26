import { likeComment as likeC } from '@/actions/server/comment';
import { IComment } from '@/lib/mongoose/models/Comment/types';
import usePostsStore from '@/lib/zustand/store/postStore';
import getAvatar from '@/utils/getAvatar';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { Button } from '@nextui-org/react';
import Image from 'next/image';

type Props = {
  comment: IComment;
};

const CommentItemBig = ({ comment }: Props) => {
  console.log({ comment });

  const { likeComment } = usePostsStore();

  const like = async () => {
    likeComment(comment.id);
    await likeC(comment.id);
  };

  return (
    <div className="flex gap-3 w-full items-start px-2">
      <div className="w-10 flex-shrink-0 h-10 overflow-hidden">
        <Image
          height={45}
          width={45}
          src={getAvatar(comment.user.avatar)}
          alt="avatar"
          className="object-cover w-full h-full rounded-full"
        />
      </div>
      <div className="w-full">
        <span className="font-semibold text-sm pr-2">
          {comment.user.username}
        </span>
        <span className="text-sm flex-1">{comment.content}</span>
        <div className="w-full text-skin-accent flex items-center text-sm space-x-3">
          <p>1 day</p>
          {comment.totalLikes > 0 && <p>{comment.totalLikes} likes</p>}
          <Button size="sm" color="default" variant="light">
            Reply
          </Button>
        </div>
        {comment.replies.length > 0 && (
          <Button variant="light" size="sm">
            <span className="w-[40px] h-[2px] dark:bg-slate-700" />
            See all 11 replies
          </Button>
        )}
      </div>
      <div className="">
        <Button
          onClick={like}
          size="sm"
          variant="light"
          isIconOnly
          startContent={
            comment.isLiked ? (
              <HeartIconSolid className="w-4 h-4 text-pink-600" />
            ) : (
              <HeartIcon className="w-4 h-4" />
            )
          }
        />
      </div>
    </div>
  );
};

export default CommentItemBig;
