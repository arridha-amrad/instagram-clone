import dbConnect from '@/lib/mongoose/init';
import User from '@/lib/mongoose/models/User';
import mongoose from 'mongoose';

export default async function addSearchedUsers(id: string, authId?: string) {
  await dbConnect();
  const objId = new mongoose.Types.ObjectId(id);
  console.log({ authId, id });
  if (!authId) return;
  const user = await User.findById(authId);
  if (!user) {
    console.log('user un authenticated');
    return;
  }
  // const idx = user.searchedUsers.findIndex((sid) => sid.toString() === id);
  // if (idx >= 0) {
  //   user.searchedUsers.splice(idx, 1);
  // }
  // user.searchedUsers.unshift(objId);
  // await user.save();
}
