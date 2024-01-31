import mongoose from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import { TImage, TPost, TPostModel, TPostVirtual } from './types';

const imageSchema = new mongoose.Schema<TImage>({
  publicId: String,
  url: String,
  height: Number,
  width: Number
});

const schema = new mongoose.Schema<TPost, TPostModel, TPostVirtual>(
  {
    description: String,
    location: String,
    user: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId
    },
    images: [imageSchema],
    likes: [
      {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
      }
    ],
    comments: [
      {
        ref: 'Comment',
        type: mongoose.Schema.Types.ObjectId
      }
    ]
  },
  {
    timestamps: true
  }
);

schema.plugin(mongooseLeanVirtuals);

schema.virtual('totalLikes').get(function () {
  return this.likes.length;
});

schema.virtual('totalComments').get(function () {
  return this.comments.length;
});

schema.virtual('id').get(function () {
  return this._id.toString();
});

const Post = mongoose.models.Post || mongoose.model<TPostModel>('Post', schema);

export default Post as TPostModel;
