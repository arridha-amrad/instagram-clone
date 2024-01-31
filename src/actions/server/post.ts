'use server';

import getServerSideSession from '@/utils/getServerSideSession';
import { baseURL } from '../variables';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import Post, { TPost } from '@/lib/mongoose/models/Post';
import dbConnect from '@/lib/mongoose/init';
import Comment, { TComment } from '@/lib/mongoose/models/Comment';

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

export const createPost = async (formData: FormData) => {
  const session = await getServerSideSession();
  if (!session) {
    redirect('/accounts/login');
  }
  const newForm = formData;
  newForm.append('authId', session.user.id);
  await fetch(`${baseURL}/api/post`, {
    method: 'POST',
    body: newForm
  });
};

export const getPostById = async (postId: string) => {
  const session = await getServerSideSession();
  const authId = session?.user.id;
  await dbConnect();
  const post = await Post.findById(postId)
    .populate({ path: 'user', select: 'username id avatar' })
    .populate({
      path: 'comments',
      options: { sort: { createdAt: 'desc' } },
      populate: { path: 'user', select: 'username avatar id' }
    })
    .lean({ virtuals: true })
    .exec()
    .then((data) => {
      const isLiked = authId
        ? !!data?.likes.find((id) => id.toString() === authId)
        : false;

      const result = { ...data, isLiked } as unknown;
      return result as IPost;
    });
  return post;
};

export type IUser = {
  username: string;
  id: string;
  avatar: string;
};

export type IComment = Omit<TComment, 'user'> & {
  user: IUser;
};

export type IPost = Omit<TPost, 'comments'> & {
  user: IUser;
  isLiked: boolean;
  comments: IComment[];
  totalComments: number;
  totalLikes: number;
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
      populate: { path: 'user', select: 'username _id avatar' }
    })
    .lean({ virtuals: true })
    .exec()
    .then((data) => {
      return data.map((post) => {
        const isLiked = authId
          ? !!post.likes.find((id) => id.toString() === authId)
          : false;
        const { _id, ...rest } = post;
        const result = { ...rest, isLiked } as unknown;
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
