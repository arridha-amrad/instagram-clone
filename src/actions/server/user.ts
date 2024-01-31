'use server';

import getServerSideSession from '@/utils/getServerSideSession';
import { baseURL } from '../variables';
import { revalidateTag, unstable_cache } from 'next/cache';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/mongoose/init';
import User from '@/lib/mongoose/models/User/User';
import { TUser } from '@/lib/mongoose/models/User/types';
import { checkIsExists } from '@/lib/mongoose/models/Post/utils';
import { Types } from 'mongoose';

export const fetchProfile = unstable_cache(
  async (username: string) => {
    const session = await getServerSideSession();
    const authId = session?.user.id;
    await dbConnect();
    const user = await User.findOne({ username })
      .lean({ virtuals: true })
      .exec()
      .then((data) => {
        if (!data) return null;
        const isFollow = checkIsExists(data.followers, authId);
        const { password, _id, searchedUsers, followings, followers, ...rest } =
          data;
        return { ...rest, isFollow };
      });
    return user;
  },
  [`profile`],
  { tags: [`profile`] }
);

export const getSearchHistories = unstable_cache(
  async () => {
    const session = await getServerSideSession();
    await dbConnect();
    if (!session) return [];
    const users = await User.findById(session.user.id)
      .lean({ virtuals: true })
      .populate({
        path: 'searchedUsers',
        select: 'username name avatar id'
      })
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
  const authId = session?.user.id;
  await dbConnect();
  if (!id) {
    await User.findByIdAndUpdate(authId, { searchedUsers: [] });
  } else {
    await User.findByIdAndUpdate(authId, { $pull: { searchedUsers: id } });
  }
  revalidateTag('search-history');
};

export const addToSearchHistory = async (id: string) => {
  const session = await getServerSideSession();
  const authId = session?.user.id;
  const user = await User.findById(authId);
  if (!user) return;
  if (user.searchedUsers) {
    const idx = user.searchedUsers.findIndex((sid) => sid.toString() === id);
    if (idx >= 0) {
      user.searchedUsers.splice(idx, 1);
    }
    user.searchedUsers.unshift(new Types.ObjectId(id));
  } else {
    user.searchedUsers = [new Types.ObjectId(id)];
  }
  await user.save();
  revalidateTag('search-history');
};

export const searchUser = async (key: string) => {
  await dbConnect();
  const rgx = (pattern: string) => new RegExp(`.*${pattern}.*`);
  const searchRgx = rgx(key);
  const users = await User.find({
    $or: [
      { username: { $regex: searchRgx, $options: 'i' } },
      { name: { $regex: searchRgx, $options: 'i' } }
    ]
  })
    .lean({ virtuals: true })
    .select('name username avatar id')
    .limit(10);

  return users as TUser[];
};

const push = async (authId: string, userId: string) => {
  await User.findByIdAndUpdate(userId, { $push: { followers: authId } });
  await User.findByIdAndUpdate(authId, { $push: { followings: userId } });
};

const pull = async (authId: string, userId: string) => {
  await User.findByIdAndUpdate(userId, { $pull: { followers: authId } });
  await User.findByIdAndUpdate(authId, { $pull: { followings: userId } });
};

export const followUser = async (userId: string, username: string) => {
  const session = await getServerSideSession();
  if (!session) {
    redirect('/accounts/login');
  }
  await dbConnect();
  const authUser = await User.findById(session.user.id).lean();
  const followings = authUser?.followings;
  if (!followings) {
    await push(session.user.id, userId);
  } else {
    const idx = followings.findIndex((f) => f.toString() === userId);
    if (idx >= 0) {
      await pull(session.user.id, userId);
    } else {
      await push(session.user.id, userId);
    }
  }
  revalidateTag(`profile`);
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
