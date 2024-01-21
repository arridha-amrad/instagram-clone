import { NextRequest } from 'next/server';
import getProfileData from '../getProfileData';

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  const username = params.username;
  const authId = req.nextUrl.searchParams.get('authId') ?? undefined;
  try {
    const user = await getProfileData(username, authId);
    return Response.json({ user }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: 'Server Error' }, { status: 500 });
  }
}
