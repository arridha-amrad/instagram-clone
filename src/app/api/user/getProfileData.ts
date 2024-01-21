import dbConnect from '@/lib/mongoose/init';
import User from '@/lib/mongoose/models/User';
import getServerSideSession from '@/utils/getServerSideSession';

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

export default async function getProfileData(
  username: string,
  authId?: string
) {
  try {
    await dbConnect();
    const user = await User.findOne({ username })
      .lean({ virtuals: true })
      .exec()
      .then((data) => {
        if (!data) return null;
        const following = data.followers?.find(
          (followers) => followers.toString() === authId
        );
        const isFollow = !!following;
        // @ts-nocheck
        const {
          _id,
          password,
          provider,
          email,
          followers,
          followings,
          ...rest
        } = data;
        return { ...rest, isFollow };
      });
    return user;
  } catch (err) {
    throw err;
  }
}
