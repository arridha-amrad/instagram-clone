import mongoose from 'mongoose';
import { mongooseLeanVirtuals } from 'mongoose-lean-virtuals';
import {
  TComment,
  TCommentMethods,
  TCommentModel,
  TCommentVirtual
} from './types';

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
