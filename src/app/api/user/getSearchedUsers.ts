import dbConnect from '@/lib/mongoose/init';
import User from '@/lib/mongoose/models/User';
import getServerSideSession from '@/utils/getServerSideSession';

export default async function getSearchedUsers() {
  try {
    await dbConnect();
    const session = await getServerSideSession();
    if (!session) return [];
    const authId = session.user.id;
    const users = await User.findById(authId)
      .lean()
      .populate({ path: 'searchedUsers', select: 'username name avatar id' })
      .exec()
      .then((data) => {
        if (!data) return [];
        const { searchedUsers } = data;
        return searchedUsers;
      });
    return users;
  } catch (err) {
    throw err;
  }
}
