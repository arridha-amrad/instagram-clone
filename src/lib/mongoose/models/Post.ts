import mongoose, { Model } from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

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

type TPostModel = Model<TPost, {}, {}, TPostVirtual>;

const imageSchema = new mongoose.Schema<TImage>(
  {
    publicId: String,
    url: String,
    height: Number,
    width: Number
  },
  { _id: false }
);

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
