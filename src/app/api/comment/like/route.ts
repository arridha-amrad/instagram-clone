import { NextRequest, NextResponse } from 'next/server';
import Comment from '@/lib/mongoose/models/Comment/Comment';

export async function POST(req: NextRequest) {
  try {
    const { authId, commentId } = await req.json();
    const comment = await Comment.findById(commentId).lean();
    if (!comment) {
      return NextResponse.json(
        { message: 'Comment not found' },
        { status: 404 }
      );
    }
    const isLiked = comment.likes.find((_id) => _id.toString() === authId);
    let message = '';
    if (isLiked) {
      await Comment.findByIdAndUpdate(commentId, { $pull: { likes: authId } });
      message = 'dislike';
    } else {
      await Comment.findByIdAndUpdate(commentId, { $push: { likes: authId } });
      message = 'like';
    }
    return Response.json({ message }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
