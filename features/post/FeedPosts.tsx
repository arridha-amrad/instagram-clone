import { getServerSideSession } from "@/lib/auth";
import { fetchFeedPosts } from "./query";
import FeedPostCard from "@/components/FeedPostCard";

export const FeedPosts = async () => {
  const session = await getServerSideSession();
  const posts = await fetchFeedPosts(session?.user.id || "");
  return (
    <div>
      {posts.map((post) => (
        <FeedPostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
