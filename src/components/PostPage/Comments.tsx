import CommentItemBig from '../card/Post/CommentItemBig';
import usePostsStore from '@/lib/zustand/store/postStore';

const Comments = () => {
  const { post } = usePostsStore();
  return (
    <div className="py-3 px-2 space-y-4">
      {post?.comments.map((comment) => (
        <CommentItemBig comment={comment} key={comment.id} />
      ))}
    </div>
  );
};

export default Comments;
