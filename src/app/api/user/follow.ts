import dbConnect from '@/lib/mongoose/init';
import User from '@/lib/mongoose/models/User';

export type FollowArgs = {
  userId: string;
  authUserId: string;
};

export default async function follow(args: FollowArgs) {
  const start = new Date().getTime();
  try {
    await dbConnect();

    const { userId, authUserId } = args;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const authUser = await User.findById(authUserId);
    if (!authUser) {
      throw new Error('Authenticated user not found');
    }

    const followingIdx = authUser.followings.findIndex(
      (f) => f.toString() === userId
    );

    if (followingIdx >= 0) {
      authUser.followings.splice(followingIdx, 1);
      const followersIdx = user.followers.findIndex(
        (f) => f.toString() === authUserId
      );
      if (followersIdx >= 0) {
        user.followers.splice(followersIdx, 1);
      }
    } else {
      authUser.followings.push(user.id);
      user.followers.push(authUser.id);
    }
    await authUser.save();
    await user.save();
    return followingIdx >= 0 ? 'unfollow' : 'follow';
  } catch (err) {
    throw err;
  } finally {
    console.log('total time : ', new Date().getTime() - start, ' ms');
  }
}
