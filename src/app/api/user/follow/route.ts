import { NextRequest, NextResponse } from 'next/server';
import follow, { FollowArgs } from '../follow';

export async function POST(request: NextRequest) {
  try {
    const data = (await request.json()) as FollowArgs;
    const message = await follow(data);
    return NextResponse.json({ message }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
