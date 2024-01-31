import mongoose, { Model } from 'mongoose';
import { IUser } from '../User/types';
import { IComment } from '../Comment/types';

export type TImage = {
  url: string;
  publicId: string;
  height: number;
  width: number;
};

export type TPost = {
  id: string;
  description: string;
  location: string;
  images: TImage[];
  likes: mongoose.Types.ObjectId[];
  comments: mongoose.Types.ObjectId[];
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type TPostVirtual = {
  totalLikes: number;
  totalComments: number;
};

export type TPostModel = Model<TPost, {}, {}, TPostVirtual>;

export type IPost = Omit<TPost, 'comments'> & {
  _id: string;
  user: IUser;
  isLiked: boolean;
  comments: IComment[];
  totalComments: number;
  totalLikes: number;
};
