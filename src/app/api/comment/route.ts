import dbConnect from '@/lib/mongoose/init';
import { NextRequest } from 'next/server';
import Comment from '@/lib/mongoose/models/Comment/Comment';
import Post from '@/lib/mongoose/models/Post/Post';

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
