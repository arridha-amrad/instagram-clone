import dbConnect from '@/lib/mongoose/init';
import User from '@/lib/mongoose/models/User/User';
import { SignUpDto } from '@/lib/zod/signup';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email, fullName, password, username } =
      (await request.json()) as SignUpDto;

    const isEmailExists = await User.findOne({ email }).lean();
    if (isEmailExists) {
      return NextResponse.json(
        { message: 'Email has been registered' },
        { status: 400 }
      );
    }

    const isUsernameExists = await User.findOne({
      username
    }).lean();
    if (isUsernameExists) {
      return NextResponse.json(
        { message: 'Username has been registered' },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      avatar: null,
      provider: 'default',
      email,
      name: fullName,
      password: hashedPassword,
      username,
      followers: [],
      followings: [],
      searchedUsers: []
    });
    await newUser.save();
    return NextResponse.json(
      { message: 'Registration is successful' },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
