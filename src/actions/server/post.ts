'use server';

import getServerSideSession from '@/utils/getServerSideSession';
import { baseURL } from '../variables';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

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

export const getHomePosts = async () => {
  const session = await getServerSideSession();
  const response = await fetch(
    `${baseURL}/api/post?authId=${session?.user.id}`,
    {
      next: { tags: [`home-posts`] }
    }
  );
  const data = await response.json();
  return data.posts;
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
