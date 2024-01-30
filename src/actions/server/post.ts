'use server';

import getServerSideSession from '@/utils/getServerSideSession';
import { baseURL } from '../variables';
import { revalidateTag, unstable_cache } from 'next/cache';
import { redirect } from 'next/navigation';
import Post, { TPost } from '@/lib/mongoose/models/Post';
import dbConnect from '@/lib/mongoose/init';
import { TComment } from '@/lib/mongoose/models/Comment';

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
  revalidateTag('home-posts');
};

export const getPostById = async (postId: string) => {
  const session = await getServerSideSession();
  const response = await fetch(
    `${baseURL}/api/post?authId=${session?.user.id}&postId=${postId}`,
    {
      next: { tags: [`post-${postId}`] }
    }
  );
  const data = await response.json();
  return data.post;
};

export type IPost = TPost & {
  user: {
    username: string;
    _id: string;
    avatar: string;
  };
  isLiked: boolean;
  highlightedComment: TComment[];
};

export const getHomePosts = unstable_cache(
  async () => {
    const session = await getServerSideSession();
    const authId = session?.user.id;
    await dbConnect();
    const posts = await Post.find()
      .populate({ path: 'user', select: 'username _id avatar' })
      .populate({ path: 'comments' })
      .lean({ virtuals: true })
      .exec()
      .then((data) => {
        return data.map((post) => {
          const isLiked = authId
            ? !!post.likes.find((user) => user._id.toString() === authId)
            : false;
          const result = { ...post, isLiked } as unknown;
          return result as IPost;
        });
      });
    return posts;
  },
  ['home-posts'],
  {
    tags: ['home-posts']
  }
);

export const deletePost = async (postId: string) => {
  const session = await getServerSideSession();
  await fetch(`${baseURL}/api/post`, {
    method: 'DELETE',
    body: JSON.stringify({ postId, authId: session?.user.id })
  });
  revalidateTag('home-posts');
  revalidateTag('auth-posts');
};
