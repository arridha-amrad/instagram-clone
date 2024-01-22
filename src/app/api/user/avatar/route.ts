import { NextRequest, NextResponse } from 'next/server';
import User from '@/lib/mongoose/models/User';
import { remove, upload } from '@/lib/cloudinary/init';

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file = data.get('image') as File;
    const authId = data.get('authId') as string;
    const authUser = await User.findById(authId).lean();
    if (!authUser) {
      throw new Error('User not found');
    }
    const { secure_url, public_id } = await upload(file);
    if (authUser.avatar && authUser.avatarPublicId) {
      await remove(authUser.avatarPublicId);
    }

    await User.findByIdAndUpdate(authId, {
      avatar: secure_url,
      avatarPublicId: public_id
    }).lean();

    return NextResponse.json({ avatar: secure_url }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
