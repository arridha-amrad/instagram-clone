'use client';

import Image from 'next/image';
import PostUserWithFollowStatus from '../card/Post/PostUserWithFollowStatus';
import { Button, Divider } from '@nextui-org/react';
import getAvatar from '@/utils/getAvatar';
import Comments from './Comments';
import PostLikedButton from '../card/Post/PostLikedBtn';
import BookmarkIcon from '@heroicons/react/24/outline/BookmarkIcon';
import CommentIcon from '@heroicons/react/24/outline/ChatBubbleLeftIcon';
import SendIcon from '@heroicons/react/24/outline/PaperAirplaneIcon';
import ReplyForm from '../form/ReplyForm';
import usePostsStore from '@/lib/zustand/store/postStore';
import { useEffect, useRef, useState } from 'react';
import PostSkeleton from './PostSkeleton';

type Props = {
  data: string;
};

const PostDetail = ({ data }: Props) => {
  const parsedData = JSON.parse(data);
  const [loading, setLoading] = useState(true);
  const { setPost, post } = usePostsStore();

  useEffect(() => {
    setPost(parsedData);
    setLoading(false);
  }, [data]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  if (!post && loading)
    return (
      <div className="w-full h-full max-w-[40%]">
        <PostSkeleton />
      </div>
    );

  if (!post) return null;

  return (
    <div className="w-full h-full overflow-hidden flex flex-col max-w-[40%]">
      <div className="px-2">
        <PostUserWithFollowStatus post={post} />
      </div>
      <Divider />
      <div className="flex-1 h-full w-full overflow-y-auto">
        <div className="flex px-4 justify-between items-center py-2">
          <div className="flex items-start gap-4">
            <Image
              width={45}
              height={45}
              className="rounded-full w-[45px] aspect-square object-cover"
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
        <Comments />
      </div>
      <Divider />
      <div className="flex-shrink-0">
        <div className="w-full py-1 flex px-4">
          <div className="flex-1 space-x-1">
            <PostLikedButton post={post} />
            <Button
              onClick={() => inputRef.current?.focus()}
              variant="light"
              isIconOnly
            >
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
        {post.totalLikes > 0 && (
          <div className="px-4">
            <span className="font-semibold">{post.totalLikes}</span> likes
          </div>
        )}
        {/* <div className="px-4 ">
          <p>
            Liked by <span className="font-semibold">james</span> and{' '}
            <span className="font-semibold">others</span>
          </p>
        </div> */}
        <div className="font-semibold pb-4 px-4 text-skin-accent">
          <p className="text-small">5 hours ago</p>
        </div>
        <div className="py-2">
          <ReplyForm ref={inputRef} post={post} />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
