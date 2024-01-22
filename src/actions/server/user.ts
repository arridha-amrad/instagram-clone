'use server';

import getServerSideSession from '@/utils/getServerSideSession';
import { baseURL } from '../variables';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export const fetchProfile = async (username: string) => {
  const session = await getServerSideSession();
  const response = await fetch(
    `${baseURL}/api/user/${username}?authId=${session?.user.id}`,
    {
      next: { tags: [`profile-${username}`] }
    }
  );
  const data = await response.json();
  return data.user;
};

export const getSearchHistories = async () => {
  const session = await getServerSideSession();
  const response = await fetch(
    `${baseURL}/api/user/search/history?authId=${session?.user.id}`,
    { next: { tags: ['search-history'] } }
  );
  const data = await response.json();
  return data.users;
};

export const deleteSearchHistories = async (id?: string) => {
  const session = await getServerSideSession();
  await fetch(`${baseURL}/api/user/search/history`, {
    method: 'DELETE',
    body: JSON.stringify({ id, authId: session?.user.id })
  });
  revalidateTag('search-history');
};

export const addToSearchHistory = async (id: string) => {
  const session = await getServerSideSession();
  await fetch(`${baseURL}/api/user/search/history`, {
    method: 'POST',
    body: JSON.stringify({ id, authId: session?.user.id })
  });
  revalidateTag('search-history');
};

export const searchUser = async (key: string) => {
  try {
    const response = await fetch(`${baseURL}/api/user/search/${key}`, {
      next: { tags: [`searchkey-${key}`] }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const followUser = async (userId: string, username: string) => {
  const session = await getServerSideSession();
  if (!session) {
    redirect('/accounts/login');
  }
  await fetch(`${baseURL}/api/user/follow`, {
    method: 'POST',
    body: JSON.stringify({ userId, authId: session.user.id })
  });
  revalidateTag(`profile-${username}`);
};

export const uploadAvatar = async (formData: FormData) => {
  const session = await getServerSideSession();
  if (!session) return;
  const newForm = formData;
  newForm.append('authId', session.user.id);
  const response = await fetch(`${baseURL}/api/user/avatar`, {
    method: 'POST',
    body: newForm
  });
  revalidateTag(`profile-${session.user.username}`);
  const data = await response.json();
  return data;
};
