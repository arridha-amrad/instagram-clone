import { remove, upload } from '@/lib/cloudinary/init';
import dbConnect from '@/lib/mongoose/init';
import Post from '@/lib/mongoose/models/Post/Post';
import { IPost, TImage } from '@/lib/mongoose/models/Post/types';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const { postId, userId } = await req.json();
    const post = await Post.findById(postId);
    if (post && post.user.id === userId) {
      const images = post.images;
      for (const image of images) {
        await remove(image.publicId);
      }
      await post.deleteOne();
    }
    return NextResponse.json({ message: 'Deleted' }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('images') as File[];
    const description = formData.get('description');
    const location = formData.get('location');
    const authId = formData.get('authId');

    await dbConnect();

    const urls: TImage[] = [];
    for (const file of files) {
      const { secure_url, public_id, height, width } = await upload(file);
      urls.push({ publicId: public_id, url: secure_url, height, width });
    }

    const newPost = new Post({
      images: urls,
      user: authId,
      comments: [],
      likes: [],
      description,
      location
    });

    await newPost.save();

    const populatedPost = await Post.findById(newPost.id)
      .populate({
        path: 'user',
        select: 'username id avatar'
      })
      .lean({ virtuals: true })
      .exec()
      .then((data) => {
        const isLiked = authId
          ? !!data?.likes.find((id) => id.toString() === authId)
          : false;

        const result = { ...data, isLiked } as unknown;
        return result as IPost;
      });
    return Response.json({ post: populatedPost }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: 'ok' }, { status: 500 });
  }
}
