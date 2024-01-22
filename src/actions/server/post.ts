'use server';

import getServerSideSession from '@/utils/getServerSideSession';
import { baseURL } from '../variables';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export const createPost = async (
  files: FileList | null,
  formData: FormData
) => {
  const session = await getServerSideSession();
  if (!session) {
    redirect('/accounts/login');
  }

  console.log('preview : ', files);

  const newForm = formData;
  if (!files) return;
  for (let i = 0; i < files.length; i++) {
    newForm.append('image', files[i]);
  }
  newForm.append('authId', session.user.id);
  await fetch(`${baseURL}/api/post`, {
    method: 'POST',
    body: newForm
  });
  revalidateTag('home-posts');
};
