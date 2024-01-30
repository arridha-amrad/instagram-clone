import dbConnect from '@/lib/mongoose/init';
import User, { TUser } from '@/lib/mongoose/models/User';
import { NextRequest } from 'next/server';

export async function DELETE(req: Request) {
  try {
    const { authId, id } = await req.json();
    if (!id) {
      await User.findByIdAndUpdate(authId, { searchedUsers: [] });
    } else {
      await User.findByIdAndUpdate(authId, { $pull: { searchedUsers: id } });
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
        const res = searchedUsers as unknown;
        return res as TUser[];
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
    const user = await User.findById(authId);
    if (!user) return;
    if (user.searchedUsers) {
      const idx = user.searchedUsers.findIndex((sid) => sid.toString() === id);
      if (idx >= 0) {
        user.searchedUsers.splice(idx, 1);
      }
      user.searchedUsers.unshift(id);
    } else {
      user.searchedUsers = [id];
    }
    await user.save();
    return Response.json({ message: 'ok' }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: 'Server Error' }, { status: 500 });
  }
}
