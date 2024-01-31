'use server';

import getServerSideSession from '@/utils/getServerSideSession';
import { baseURL } from '../variables';
import { revalidateTag, unstable_cache } from 'next/cache';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/mongoose/init';
import User, { TUser } from '@/lib/mongoose/models/User';

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

export const getSearchHistories = unstable_cache(
  async () => {
    const session = await getServerSideSession();
    await dbConnect();
    if (!session) return [];
    const users = await User.findById(session.user.id)
      .populate({
        path: 'searchedUsers',
        select: 'username name avatar id'
      })
      .lean()
      .exec()
      .then((data) => {
        if (!data) return [];
        const users = data.searchedUsers as unknown;
        return users as TUser[];
      });
    return users;
  },
  ['search-history'],
  { tags: ['search-history'] }
);

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
      next: { tags: [`search-user-${key}`] }
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
