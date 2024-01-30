import { remove } from '@/lib/cloudinary/init';
import dbConnect from '@/lib/mongoose/init';
import Post from '@/lib/mongoose/models/Post';
import { NextRequest, NextResponse } from 'next/server';
import Comment from '@/lib/mongoose/models/Comment';

export const POST = async (req: NextRequest) => {
  try {
    const { content, postId, authId } = await req.json();
    await dbConnect();
    const newComment = new Comment({
      content,
      likes: [],
      replies: [],
      post: postId,
      user: authId
    });
    const newData = await newComment.save();
    await Post.findByIdAndUpdate(postId, { $push: { comments: newComment } });
    const comment = await Comment.findById(newData.id)
      .populate({ path: 'user', select: 'username avatar _id' })
      .lean({ virtuals: true });
    return Response.json({ comment }, { status: 201 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: 'Server Error' }, { status: 500 });
  }
};

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

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();
//     const files = formData.getAll('image') as File[];
//     const description = formData.get('description');
//     const location = formData.get('location');
//     const authId = formData.get('authId');

//     await dbConnect();

//     const urls: TImage[] = [];
//     // const { secure_url, public_id } = await upload(files[0]);
//     // urls.push({ publicId: public_id, url: secure_url });
//     for (const file of files) {
//       const { secure_url, public_id } = await upload(file);
//       urls.push({ publicId: public_id, url: secure_url });
//     }

//     const newPost = new Post({
//       images: urls,
//       user: authId,
//       comments: [],
//       likes: [],
//       description,
//       location
//     });

//     const post = await newPost.save();

//     return Response.json({ post }, { status: 200 });
//   } catch (err) {
//     console.log(err);
//     return Response.json({ message: 'ok' }, { status: 500 });
//   }
// }
