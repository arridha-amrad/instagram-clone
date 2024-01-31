import { getPostById } from '@/actions/server/post';
import PostUserWithFollowStatus from '@/components/card/Post/PostUserWithFollowStatus';
import ImageCarousel from '@/components/carousel/ImageCarousel';
import getAvatar from '@/utils/getAvatar';
import { Button, Divider } from '@nextui-org/react';
import Image from 'next/image';
import BookmarkIcon from '@heroicons/react/24/outline/BookmarkIcon';
import CommentIcon from '@heroicons/react/24/outline/ChatBubbleLeftIcon';
import SendIcon from '@heroicons/react/24/outline/PaperAirplaneIcon';
import { unstable_noStore } from 'next/cache';
import PostLikedButton from '@/components/card/Post/PostLikedBtn';
import CommentItemBig from '@/components/card/Post/CommentItemBig';
import ReplyForm from '@/components/form/ReplyForm';

type Props = {
  params: {
    postId: string;
  };
};

const Page = async ({ params: { postId } }: Props) => {
  unstable_noStore();
  const post = await getPostById(postId);

  return (
    <div className="max-h-[700px] h-full mx-auto w-full my-8 flex">
      <div className="w-full max-w-[60%] overflow-hidden h-full">
        <ImageCarousel urls={post.images.map((i) => i.url)} />
      </div>
      <div className="w-full h-full flex flex-col max-w-[40%]">
        <div className="px-2">
          <PostUserWithFollowStatus post={post} />
        </div>
        <Divider />
        <div className="flex px-4 justify-between items-center py-2">
          <div className="flex items-start gap-4">
            <Image
              width={45}
              height={45}
              className="rounded-full"
              alt="avatar"
              src={getAvatar(post.user.avatar)}
            />
            <div>
              <div className="font-semibold">
                {post.user.username}
                <span className="font-normal text-skin-accent">
                  &nbsp;&nbsp;5 hours
                </span>
              </div>
              <p className="text-small">{post.description}</p>
            </div>
          </div>
        </div>
        <Divider />
        <div className="py-3 flex-1 px-2 space-y-4 overflow-y-auto overflow-x-hidden">
          {post.comments.map((comment) => (
            <CommentItemBig comment={comment} key={comment.id} />
          ))}
        </div>
        <div className="w-full py-2 flex px-4">
          <div className="flex-1 space-x-1">
            <PostLikedButton post={post} />
            <Button variant="light" isIconOnly>
              <CommentIcon className="w-7 h-7" />
            </Button>
            <Button variant="light" isIconOnly>
              <SendIcon className="w-7 h-7" />
            </Button>
          </div>
          <Button variant="light" isIconOnly>
            <BookmarkIcon className="w-7 h-7" />
          </Button>
        </div>
        <div className="px-4 ">
          <p>
            Liked by <span className="font-semibold">james</span> and{' '}
            <span className="font-semibold">others</span>
          </p>
        </div>
        <div className="font-semibold pb-4 px-4 text-skin-accent">
          <p className="text-small">5 hours ago</p>
        </div>
        <div>
          <ReplyForm post={post} />
        </div>
      </div>
    </div>
  );
};

export default Page;
