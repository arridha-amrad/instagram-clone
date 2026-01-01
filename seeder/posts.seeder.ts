import db from "@/lib/drizzle/db";
import * as schema from "@/lib/drizzle/schema";
import { faker } from "@faker-js/faker";

const createPost = async () => {
  const users = await db.select().from(schema.user);
  await db.transaction(async (tx) => {
    const result = await tx
      .insert(schema.post)
      .values({
        userId: faker.helpers.arrayElement(users).id,
        caption: faker.lorem.sentence(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      })
      .returning();
    const randomInt = faker.number.int({ min: 1, max: 5 });
    const promises = Array.from({ length: randomInt }).map(async (_, i) => {
      await tx.insert(schema.postMedia).values({
        postId: result[0].id,
        url: faker.image.url(),
        type: "image",
        order: i,
      });
    });
    await Promise.all(promises);
  });
};

// createPost()
//   .then(() => console.log("done"))
//   .catch((e) => console.error(e));

const likePost = async () => {
  const userId = "-hlxAtMMSmWoP66C-ZtXQD7jW8BezyVb";
  const postId = "5d57dcb9-b39d-4a94-b306-5990e47e5bd7";
  await db.insert(schema.postLike).values({
    userId,
    postId,
  });
};

likePost()
  .then(() => console.log("done"))
  .catch((e) => console.error(e));
