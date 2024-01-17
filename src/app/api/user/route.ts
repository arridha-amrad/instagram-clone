import { NextRequest, NextResponse } from 'next/server';
import getProfileData from './getProfileData';

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get('username');
  const authId = req.nextUrl.searchParams.get('authId') ?? '';
  if (!username) return NextResponse.json({ message: 'username is required' });
  try {
    const user = await getProfileData(username);
    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
