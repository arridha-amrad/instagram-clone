'use client';

import { IPost } from '@/actions/server/post';
import { baseURL } from '@/actions/variables';
import usePostsStore from '@/lib/zustand/store/postStore';
import FaceSmileIcon from '@heroicons/react/24/outline/FaceSmileIcon';
import { Button, Input } from '@nextui-org/react';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';

type Props = {
  post: IPost;
};

const PostCommentInput = ({ post }: Props) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [comment, setComment] = useState('');
  const { data } = useSession();
  const { addComment } = usePostsStore();

  function onClick(emojiData: EmojiClickData, event: MouseEvent) {
    setComment(
      (inputValue) =>
        inputValue + (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
    );
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!data) return;
    const response = await fetch(`${baseURL}/api/post`, {
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
  };

  return (
    <form onSubmit={onSubmit} className="flex relative px-2">
      <Input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        type="text"
        variant="underlined"
        placeholder="Add comment..."
      />
      {!!comment && (
        <Button type="submit" size="sm" variant="light">
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
        <div className="absolute right-10 bottom-0 z-50 ">
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
  );
};

export default PostCommentInput;
