import dbConnect from '@/lib/mongoose/init';
import User from '@/lib/mongoose/models/User/User';

export default async function searchUser(key: string) {
  try {
    await dbConnect();
    const rgx = (pattern: string) => new RegExp(`.*${pattern}.*`);
    const searchRgx = rgx(key);

    const peers = await User.find({
      $or: [
        { username: { $regex: searchRgx, $options: 'i' } },
        { name: { $regex: searchRgx, $options: 'i' } }
      ]
    })
      .lean({ virtuals: true })
      .select('name username avatar id')
      .limit(10);

    return peers;
  } catch (error) {
    throw error;
  }
}
