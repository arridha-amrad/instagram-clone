export const dynamic = 'force-dynamic';

import dbConnect from '@/lib/mongoose/init';
import User from '@/lib/mongoose/models/User/User';
import { IUser } from '@/lib/mongoose/models/User/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const username = request.nextUrl.searchParams.get('username');
    await dbConnect();
    let user: Omit<IUser, 'password' | 'provider'> | null = null;
    const data = await User.findOne({ username }).lean();

    if (data) {
      let { password, provider, _id, followings, ...rest } = data;
      user = {
        ...rest,
        id: _id.toString(),
        followings
      };
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
