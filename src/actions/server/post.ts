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
