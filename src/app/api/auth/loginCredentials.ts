import dbConnect from '@/lib/mongoose/init';
import User from '@/lib/mongoose/models/User/User';
import { LoginDto } from '@/lib/zod/signin';
import bcrypt from 'bcrypt';

export async function loginWithCredentials(data: LoginDto) {
  try {
    await dbConnect();
    const user = await User.findOne(
      data.identity.includes('@')
        ? { email: data.identity }
        : {
            username: data.identity
          }
    ).lean();
    if (!user) {
      throw new Error('User not found');
    }
    if (!user.password) {
      throw new Error('This account is registered with different method');
    }
    const isPasswordMatch = await bcrypt.compare(data.password, user.password);
    if (!isPasswordMatch) {
      throw new Error('Invalid credentials');
    }
    const { provider, password, ...rest } = user;
    return rest;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
