import mongoose, { Model } from 'mongoose';

export type TUser = {
  id: string;
  avatar: string;
  name: string;
  username: string;
};

export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  provider: string;
  followers: mongoose.Types.ObjectId[];
  followings: mongoose.Types.ObjectId[];
  searchedUsers: mongoose.Types.ObjectId[];
  avatar?: string;
  password?: string;
  occupation?: string;
  threadUsername?: string;
  bio?: string;
  web?: string;
  avatarPublicId?: string;
};

export type TProfileData = {
  id: string;
  name: string;
  username: string;
  isFollow: boolean;
  totalFollowers: number;
  totalFollowings: number;
  avatar?: string;
  occupation?: string;
  threadUsername?: string;
  bio?: string;
  web?: string;
};

export type IUserVirtuals = {
  totalFollowings: number;
  totalFollowers: number;
};

export type IUserMethods = {
  checkIsFollow: (id: string) => boolean;
};

export type UserModel = Model<IUser, {}, IUserMethods, IUserVirtuals>;
