import dbConnect from '@/lib/mongoose/init';
import User from '@/lib/mongoose/models/User';

export default async function deleteAllSearchHistory(authId: string) {
  try {
    await dbConnect();
    await User.findByIdAndUpdate(authId, { searchedUsers: [] });
  } catch (err) {
    throw err;
  }
}
