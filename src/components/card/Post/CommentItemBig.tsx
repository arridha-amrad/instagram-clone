import { IComment } from '@/actions/server/post';
import getAvatar from '@/utils/getAvatar';
import { HeartIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';
import Image from 'next/image';

type Props = {
  comment: IComment;
};

const CommentItemBig = ({ comment }: Props) => {
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
          <p>2 likes</p>
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
          size="sm"
          variant="light"
          isIconOnly
          startContent={<HeartIcon className="w-4 h-4" />}
        />
      </div>
    </div>
  );
};

export default CommentItemBig;
