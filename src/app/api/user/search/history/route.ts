import dbConnect from '@/lib/mongoose/init';
import User from '@/lib/mongoose/models/User';
import { NextRequest } from 'next/server';
import deleteAllSearchHistory from '../../deleteAllSearchHistory';
import deleteSearchHistory from '../../deleteSearchHistory';

export async function DELETE(req: Request) {
  try {
    const { authId, id } = await req.json();
    if (!id) {
      await deleteAllSearchHistory(authId);
    } else {
      await deleteSearchHistory(id, authId);
    }
    return Response.json({ message: 'Delete' }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: 'Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const authId = req.nextUrl.searchParams.get('authId');
    if (!authId) {
      return Response.json({ users: [] }, { status: 200 });
    }
    const users = await User.findById(authId)
      .lean()
      .populate({ path: 'searchedUsers', select: 'username name avatar id' })
      .exec()
      .then((data) => {
        if (!data) return [];
        const { searchedUsers } = data;
        return searchedUsers;
      });
    return Response.json({ users }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: 'Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { id, authId } = await req.json();
    if (!authId) return;
    const user = await User.findById(authId);
    if (!user) {
      console.log('user un authenticated');
      return Response.json({ message: 'ok' }, { status: 200 });
    }
    const idx = user.searchedUsers?.findIndex((sid) => sid.toString() === id);
    if (idx && idx >= 0) {
      user.searchedUsers?.splice(idx, 1);
    }
    user.searchedUsers?.unshift(id);
    await user.save();
    return Response.json({ message: 'ok' }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: 'Server Error' }, { status: 500 });
  }
}
