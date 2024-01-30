'use client';

import { IPost } from '@/actions/server/post';
import BookmarkIcon from '@heroicons/react/24/outline/BookmarkIcon';
import CommentIcon from '@heroicons/react/24/outline/ChatBubbleLeftIcon';
import SendIcon from '@heroicons/react/24/outline/PaperAirplaneIcon';
import { Button, Spacer } from '@nextui-org/react';
import { useCallback, useRef, useState } from 'react';
import PostCommentInput from '../../form/PostCommentForm';
import UserCardWithTime from '../UseCardWithTime';
import CommentItem from './CommentItem';
import PostCarousel from './PostCarousel';
import PostLikedButton from './PostLikedBtn';

type Props = {
  post: IPost;
};

export default function PostCard({ post }: Props) {
  const [showMoreBtn, setShowMoreBtn] = useState(false);
  const [showMoreText, setShowMoreText] = useState(false);
  const [showLess, setShowLess] = useState(false);

  const pObs = useRef<IntersectionObserver>();

  const refSpan = useCallback((element: HTMLSpanElement) => {
    if (pObs.current) pObs.current.disconnect();
    pObs.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setShowMoreBtn(false);
      } else {
        setShowMoreBtn(true);
      }
    });
    if (element) {
      pObs.current.observe(element);
    }
  }, []);

  return (
    <article className="w-full">
      <UserCardWithTime post={post} />
      <PostCarousel post={post} />
      <div className="h-12 w-full flex items-center justify-between">
        <div className="flex gap-2">
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

      {post.totalLikes > 0 && (
        <h1 className="font-bold px-2">{post.totalLikes} likes</h1>
      )}

      <p
        className={`${
          showMoreText ? '' : 'text-ellipsis overflow-hidden whitespace-nowrap'
        }  xl:text-base text-sm w-full px-2`}
      >
        <span className="font-bold">arridhaamrad</span>&nbsp;&nbsp;
        {post.description}
        <span ref={refSpan} />
      </p>

      {showMoreBtn && (
        <Button
          onClick={() => {
            setShowMoreText(true);
            setShowLess(true);
          }}
          variant="light"
          size="sm"
        >
          {showMoreText ? 'show less' : 'show more'}
        </Button>
      )}

      {post.totalComments > 0 && (
        <>
          <Spacer y={1} />
          <Button size="sm" variant="light">
            See {post.totalComments} comments
          </Button>
        </>
      )}

      {post.comments.map(
        (comment, i) =>
          i < 3 && <CommentItem comment={comment} key={comment.id} />
      )}

      {showLess && (
        <Button
          onClick={() => {
            setShowMoreText(false);
            setShowLess(false);
          }}
          variant="light"
          size="sm"
        >
          {showMoreText ? 'show less' : 'show more'}
        </Button>
      )}
      <PostCommentInput post={post} />
    </article>
  );
}
