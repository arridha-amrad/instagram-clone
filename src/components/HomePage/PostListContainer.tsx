import { getHomePosts } from '@/actions/server/post';
import PostList from './PostList';

const PostListContainer = async () => {
  const posts = await getHomePosts();

  return (
    <div className="mx-auto z-50 h-max lg:max-w-lg md:max-w-md sm:max-w-sm w-full flex flex-col gap-10 xl:pb-20 pb-10">
      <PostList data={posts} />
    </div>
  );
};

export default PostListContainer;
