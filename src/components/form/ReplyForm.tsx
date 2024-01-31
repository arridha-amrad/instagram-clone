'use client';

import { baseURL } from '@/actions/variables';
import { IPost } from '@/lib/mongoose/models/Post/types';
import usePostsStore from '@/lib/zustand/store/postStore';
import FaceSmileIcon from '@heroicons/react/24/outline/FaceSmileIcon';
import { Button, Input } from '@nextui-org/react';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { FormEvent, Ref, forwardRef, useState } from 'react';

type Props = {
  post: IPost;
};

const ReplyForm = ({ post }: Props, ref: Ref<HTMLInputElement>) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [comment, setComment] = useState('');
  const { data } = useSession();
  const { addComment } = usePostsStore();
  const [loading, setLoading] = useState(false);
  const param = useParams();

  function onClick(emojiData: EmojiClickData, event: MouseEvent) {
    setComment(
      (inputValue) =>
        inputValue + (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
    );
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!data) return;
    setLoading(true);
    try {
      const response = await fetch(`${baseURL}/api/comment`, {
        method: 'POST',
        body: JSON.stringify({
          content: comment,
          authId: data.user.id,
          postId: post.id
        })
      });
      const res = await response.json();
      if (param.postId) {
        addComment(res.comment);
      } else {
        addComment(res.comment, post.id);
      }
      setComment('');
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <fieldset disabled={loading}>
      <form onSubmit={onSubmit} className="flex items-center relative px-2">
        <Input
          ref={ref}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          variant="flat"
          placeholder="Add comment..."
          classNames={{ input: ['pr-28'] }}
        />
        {!!comment && (
          <Button
            isLoading={loading}
            type="submit"
            className="absolute top-1/2 -translate-y-1/2 right-12"
            size="sm"
            color="primary"
            variant="solid"
          >
            Send
          </Button>
        )}
        <Button
          variant="light"
          onClick={() => setShowEmojiPicker((val) => !val)}
          isIconOnly
          size="sm"
          className="absolute  top-1/2 -translate-y-1/2 right-3"
        >
          <FaceSmileIcon className="w-5 h-5" />
        </Button>
        {showEmojiPicker && (
          <div className="absolute right-10 bottom-full z-50 ">
            <div
              onClick={() => setShowEmojiPicker(false)}
              className="fixed inset-0 bg-background/20"
            />
            <EmojiPicker
              onEmojiClick={onClick}
              previewConfig={{ showPreview: false }}
              theme={Theme.DARK}
            />
          </div>
        )}
      </form>
    </fieldset>
  );
};

export default forwardRef(ReplyForm);
