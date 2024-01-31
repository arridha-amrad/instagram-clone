import { IComment } from '@/actions/server/post';
import { HeartIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';

type Props = {
  comment: IComment;
};

const CommentItem = ({ comment }: Props) => {
  return (
    <div className="flex w-full items-center px-2">
      <span className="font-semibold text-sm pr-2">
        {comment.user.username}
      </span>
      <span className="text-sm flex-1">{comment.content}</span>
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

export default CommentItem;
