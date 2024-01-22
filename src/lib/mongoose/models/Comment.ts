import mongoose, { Model } from 'mongoose';
import { mongooseLeanVirtuals } from 'mongoose-lean-virtuals';

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

const schema = new mongoose.Schema<
  TComment,
  TCommentModel,
  TCommentMethods,
  TCommentVirtual
>(
  {
    content: {
      type: String,
      required: true
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ],
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

schema.plugin(mongooseLeanVirtuals);

schema.virtual('totalLikes').get(function () {
  return this.likes.length;
});

schema.virtual('totalReplies').get(function () {
  return this.replies.length;
});

schema.virtual('id').get(function () {
  return this._id.toString();
});

const Comment =
  mongoose.models.Comment || mongoose.model<TCommentModel>('Comment', schema);

export default Comment as TCommentModel;
