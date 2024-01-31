import { getPostById } from '@/actions/server/post';
import ImageCarousel from '@/components/carousel/ImageCarousel';
import { unstable_noStore } from 'next/cache';
import PostDetail from '@/components/PostPage/PostDetail';

type Props = {
  params: {
    postId: string;
  };
};

const Page = async ({ params: { postId } }: Props) => {
  unstable_noStore();
  const post = await getPostById(postId);

  if (!post) {
    return (
      <div>
        <p>Post not found</p>
      </div>
    );
  }

  return (
    <div className="h-full mx-auto w-full p-4">
      <div className="flex max-h-[800px] h-full border border-skin-base rounded-lg overflow-hidden">
        <div className="w-full max-w-[60%] overflow-hidden h-full">
          <ImageCarousel urls={post.images.map((i) => i.url)} />
        </div>
        <PostDetail data={JSON.stringify(post)} />
      </div>
    </div>
  );
};

export default Page;
