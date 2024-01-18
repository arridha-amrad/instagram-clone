import dbConnect from '@/lib/mongoose/init';
import User from '@/lib/mongoose/models/User';

export default async function deleteSearchHistory(id: string, authId: string) {
  try {
    await dbConnect();
    await User.findByIdAndUpdate(authId, { $pull: { searchedUsers: id } });
  } catch (err) {
    throw err;
  }
}
