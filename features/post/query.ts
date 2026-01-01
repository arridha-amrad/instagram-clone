import db from "@/lib/drizzle/db";
import { sql } from "drizzle-orm";

export const fetchFeedPosts = async (currentUserId: string) => {
  const posts = await db.query.post.findMany({
    with: {
      owner: {
        columns: {
          name: true,
          image: true,
          id: true,
          username: true,
        },
      },
      media: true,
    },
    extras: {
      totalLikes:
        sql`(select count(*) from "post_like" where "post_like"."postId" = "post"."id")`.as(
          "likes_count"
        ),
      isLiked:
        sql`(select exists(select 1 from "post_like" where "post_like"."postId" = "post"."id" and "post_like"."userId" = ${currentUserId}))`.as(
          "is_liked"
        ),
    },
  });
  return posts;
};

export type TFeedPost = Awaited<ReturnType<typeof fetchFeedPosts>>[number];
