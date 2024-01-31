'use server';

import getServerSideSession from '@/utils/getServerSideSession';
import { redirect } from 'next/navigation';
import Comment from '@/lib/mongoose/models/Comment/Comment';
import { checkIsExists } from '@/lib/mongoose/models/Post/utils';

export const likeComment = async (commentId: string) => {
  const session = await getServerSideSession();
  if (!session) {
    redirect('/accounts/login');
  }
  const authId = session.user.id;
  const comment = await Comment.findById(commentId).lean();
  if (!comment) return;
  const isLiked = checkIsExists(comment.likes, authId);
  if (isLiked) {
    await Comment.findByIdAndUpdate(commentId, { $pull: { likes: authId } });
  } else {
    await Comment.findByIdAndUpdate(commentId, { $push: { likes: authId } });
  }
};
