import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.get('image');
    const description = formData.get('description');
    const location = formData.get('location');
    console.log('files : ', files);
    console.log({ description });
    console.log({ location });

    return Response.json({ message: 'ok' }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: 'ok' }, { status: 500 });
  }
}
