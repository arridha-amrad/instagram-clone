import { remove, upload } from '@/lib/cloudinary/init';
import dbConnect from '@/lib/mongoose/init';
import Post, { TImage } from '@/lib/mongoose/models/Post';
import { NextRequest, NextResponse } from 'next/server';

const getPost = async (postId: string, authId: string | null) => {
  const post = await Post.findById(postId)
    .populate({
      path: 'user',
      select: 'username _id avatar'
    })
    .populate({ path: 'comments' });
  const isLiked = post ? (authId ? post.checkIsLiked(authId) : false) : false;
  return { ...post, isLiked };
};

const getPosts = async (authId: string | null) => {
  const posts = await Post.find()
    .populate({ path: 'user', select: 'username _id avatar' })
    .populate({ path: 'comments' })
    .exec()
    .then((data) => {
      return data.map((post) => {
        const isLiked = authId ? post.checkIsLiked(authId) : false;
        return { ...post, isLiked };
      });
    });
  return posts;
};

export async function GET(req: NextRequest) {
  try {
    const postId = req.nextUrl.searchParams.get('postId');
    const authId = req.nextUrl.searchParams.get('authId');
    await dbConnect();
    if (postId) {
      const post = await getPost(postId, authId);
      return NextResponse.json({ post }, { status: 200 });
    }
    const posts = await getPosts(authId);
    return NextResponse.json({ posts }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}

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
    const files = formData.getAll('image') as File[];
    const description = formData.get('description');
    const location = formData.get('location');
    const authId = formData.get('authId');

    await dbConnect();

    const urls: TImage[] = [];
    // const { secure_url, public_id } = await upload(files[0]);
    // urls.push({ publicId: public_id, url: secure_url });
    for (const file of files) {
      const { secure_url, public_id } = await upload(file);
      urls.push({ publicId: public_id, url: secure_url });
    }

    const newPost = new Post({
      images: urls,
      user: authId,
      comments: [],
      likes: [],
      description,
      location
    });

    const post = await newPost.save();

    return Response.json({ post }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: 'ok' }, { status: 500 });
  }
}
