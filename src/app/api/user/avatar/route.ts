import { NextRequest, NextResponse } from 'next/server';
import uploadAvatar from '../uploadAvatar';

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file = data.get('image') as File;
    const authUserId = data.get('authUserId') as string;
    await uploadAvatar({ authUserId, file });

    return NextResponse.json({ message: 'uploaded' }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
