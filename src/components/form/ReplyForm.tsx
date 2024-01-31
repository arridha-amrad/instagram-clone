'use client';

import { baseURL } from '@/actions/variables';
import { IPost } from '@/lib/mongoose/models/Post/types';
import usePostsStore from '@/lib/zustand/store/postStore';
import FaceSmileIcon from '@heroicons/react/24/outline/FaceSmileIcon';
import { Button, Input } from '@nextui-org/react';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';

type Props = {
  post: IPost;
};

const ReplyForm = ({ post }: Props) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [comment, setComment] = useState('');
  const { data } = useSession();
  const { addComment } = usePostsStore();
  const [loading, setLoading] = useState(false);

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
      addComment(res.comment);
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
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          variant="underlined"
          placeholder="Add comment..."
        />
        {!!comment && (
          <Button
            isLoading={loading}
            type="submit"
            className="font-semibold"
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
        >
          <FaceSmileIcon className="w-5 h-5" />
        </Button>
        {showEmojiPicker && (
          <div className="absolute right-10 bottom-full z-50 ">
            <div
              onClick={() => setShowEmojiPicker(false)}
              className="fixed inset-0 bg-background/40"
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

export default ReplyForm;
