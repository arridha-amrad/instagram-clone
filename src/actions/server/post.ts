'use server';

import dbConnect from '@/lib/mongoose/init';
import { IComment } from '@/lib/mongoose/models/Comment/types';
import Post from '@/lib/mongoose/models/Post/Post';
import { IPost } from '@/lib/mongoose/models/Post/types';
import { checkIsExists } from '@/lib/mongoose/models/Post/utils';
import getServerSideSession from '@/utils/getServerSideSession';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { baseURL } from '../variables';

export const likePost = async (postId: string) => {
  const session = await getServerSideSession();
  if (!session) {
    redirect('/accounts/login');
  }
  await dbConnect();
  const post = await Post.findById(postId).lean();
  if (!post) return;
  const isLiked = post.likes.find((id) => id.toString() === session.user.id);
  if (isLiked) {
    await Post.findByIdAndUpdate(postId, { $pull: { likes: session.user.id } });
  } else {
    await Post.findByIdAndUpdate(postId, { $push: { likes: session.user.id } });
  }
};

export const getPostById = async (postId: string) => {
  const session = await getServerSideSession();
  const authId = session?.user.id;
  await dbConnect();
  const post = await Post.findById(postId)
    .populate({ path: 'user', select: 'username id avatar' })
    .populate({
      path: 'comments',
      options: { sort: { createdAt: 'desc' }, limit: 5 },
      populate: { path: 'user', select: 'username avatar id' }
    })
    .lean({ virtuals: true })
    .exec()
    .then((data) => {
      if (!data) return null;
      const isLiked = checkIsExists(data.likes, authId);
      const commentIds = data.comments as unknown;
      const comments = commentIds as IComment[];
      const c = comments.map((comment) => {
        const isLiked = checkIsExists(comment.likes, authId);
        return { ...comment, isLiked };
      });
      // @ts-ignore
      data.comments = [...c];
      const result = { ...data, isLiked } as unknown;
      return result as IPost;
    });
  return post;
};

export const getHomePosts = async () => {
  const session = await getServerSideSession();
  const authId = session?.user.id;
  await dbConnect();
  const posts = await Post.find()
    .sort({ createdAt: 'desc' })
    .populate({ path: 'user', select: 'username _id avatar' })
    .populate({
      path: 'comments',
      options: { sort: { createdAt: 'desc' } },
      populate: [{ path: 'user', select: 'username _id avatar' }]
    })
    .lean({ virtuals: true })
    .exec()
    .then((data) => {
      return data.map((post) => {
        const isPostLiked = checkIsExists(post.likes, authId);
        const pComments = post.comments as unknown;
        const comments = pComments as IComment[];
        const c = comments.map((comment, i) => {
          if (i >= 3) return;
          const isLiked = checkIsExists(comment.likes, authId);
          return { ...comment, isLiked };
        });
        // @ts-ignore
        post['comments'] = [...c];
        const result = { ...post, isLiked: isPostLiked } as unknown;
        return result as IPost;
      });
    });
  return posts;
};

export const deletePost = async (postId: string) => {
  const session = await getServerSideSession();
  await fetch(`${baseURL}/api/post`, {
    method: 'DELETE',
    body: JSON.stringify({ postId, authId: session?.user.id })
  });
  revalidateTag('home-posts');
  revalidateTag('auth-posts');
};
