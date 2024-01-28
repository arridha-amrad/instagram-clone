import { getHomePosts } from '@/actions/server/post';
import PostCard from '../card/PostCard';
import { PostsProvider } from './Context';

const PostListContainer = async () => {
  const posts = await getHomePosts();
  return (
    <PostsProvider posts={posts}>
      <div className="mx-auto z-50 h-max lg:max-w-lg md:max-w-md sm:max-w-sm w-full flex flex-col gap-10 xl:pb-20 pb-10">
        {posts.map((post) => (
          <PostCard key={post.id} />
        ))}
      </div>
    </PostsProvider>
  );
};

export default PostListContainer;
