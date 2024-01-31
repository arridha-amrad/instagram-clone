import mongoose, { Model } from 'mongoose';
import { IUser } from '../User/types';

export type TComment = {
  id: string;
  content: string;
  user: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  replies: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
};

export type TCommentVirtual = {
  totalLikes: number;
  totalReplies: number;
};

export type TCommentMethods = {
  checkIsLiked: (authId: string) => boolean;
};

export type TCommentModel = Model<
  TComment,
  {},
  TCommentMethods,
  TCommentVirtual
>;

export type IComment = Omit<TComment, 'user'> & {
  _id: string;
  user: IUser;
  isLiked: boolean;
  totalLikes: number;
  totalReplies: number;
};
