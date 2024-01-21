import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose/init';
import User from '@/lib/mongoose/models/User';

export type FollowArgs = {
  userId: string;
  authId: string;
};

const push = async (authId: string, userId: string) => {
  await User.findByIdAndUpdate(userId, { $push: { followers: authId } });
  await User.findByIdAndUpdate(authId, { $push: { followings: userId } });
};

const pull = async (authId: string, userId: string) => {
  await User.findByIdAndUpdate(userId, { $pull: { followers: authId } });
  await User.findByIdAndUpdate(authId, { $pull: { followings: userId } });
};

export async function POST(request: NextRequest) {
  try {
    const { authId, userId } = (await request.json()) as FollowArgs;
    await dbConnect();
    const authUser = await User.findById(authId).lean();
    const followings = authUser?.followings;
    let message = '';
    if (!followings) {
      await push(authId, userId);
      message = 'follow';
    } else {
      const idx = followings.findIndex((f) => f.toString() === userId);
      if (idx >= 0) {
        await pull(authId, userId);
        message = 'unfollow';
      } else {
        await push(authId, userId);
        message = 'follow';
      }
    }
    return NextResponse.json({ message }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
