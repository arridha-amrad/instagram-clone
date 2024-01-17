import { remove, upload } from '@/lib/cloudinary/init';
import dbConnect from '@/lib/mongoose/init';
import User from '@/lib/mongoose/models/User';

type Args = {
  authUserId: string;
  file: File;
};

export default async function uploadAvatar({ authUserId, file }: Args) {
  try {
    await dbConnect();
    const authUser = await User.findById(authUserId);
    if (!authUser) {
      throw new Error('User not found');
    }
    const response = await upload(file);
    console.log({ response });
    if (authUser.avatar && authUser.avatarPublicId) {
      console.log('remove...');
      await remove(authUser.avatarPublicId);
    }
    authUser.avatar = response.secure_url;
    authUser.avatarPublicId = response.public_id;
    await authUser.save();
  } catch (err) {
    throw err;
  }
}
