import mongoose, { Model } from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

const providers = ['facebook', 'default'];

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
  followers?: mongoose.Types.ObjectId[];
  followings?: mongoose.Types.ObjectId[];
  searchedUsers?: mongoose.Types.ObjectId[];
  avatar?: string;
  password?: string;
  occupation?: string;
  threadUsername?: string;
  bio?: string;
  web?: string;
  avatarPublicId?: string;
};

export type IUserVirtuals = {
  totalFollowings: number;
  totalFollowers: number;
};

export type IUserMethods = {
  checkIsFollow: (id: string) => boolean;
};

type UserModel = Model<IUser, {}, IUserMethods, IUserVirtuals>; // <-- add virtuals here...

const schema = new mongoose.Schema<
  IUser,
  UserModel,
  IUserMethods,
  IUserVirtuals
>(
  {
    avatar: { type: String },
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String },
    provider: { type: String, required: true, enum: providers },
    username: { type: String, required: true, unique: true },
    avatarPublicId: String,
    bio: String,
    occupation: String,
    threadUsername: String,
    web: String,
    followers: [
      {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
      }
    ],
    followings: [
      {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
      }
    ],
    searchedUsers: [{ ref: 'User', type: mongoose.Schema.Types.ObjectId }]
  },
  {
    timestamps: true
  }
);

schema.plugin(mongooseLeanVirtuals);

schema.virtual('totalFollowers').get(function () {
  return this.followers ? this.followers.length : 0;
});

schema.virtual('totalFollowings').get(function () {
  return this.followings ? this.followings.length : 0;
});

schema.virtual('id').get(function () {
  return this._id.toString();
});

const User = mongoose.models.User || mongoose.model<UserModel>('User', schema);

export default User as UserModel;
