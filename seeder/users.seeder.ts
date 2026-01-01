import { env } from "@/env";
import * as schema from "@/lib/drizzle/schema";
import { hashPassword, generateRandomString } from "better-auth/crypto";
import { faker } from "@faker-js/faker";
import { drizzle } from "drizzle-orm/neon-serverless";

const db = drizzle(env.dbUrl!, { schema });

const main = async () => {
  const promises = Array.from({ length: 10 }).map(async () => {
    const id = generateRandomString(32);
    const password = await hashPassword("123");
    await db.transaction(async (tx) => {
      await tx.insert(schema.user).values({
        email: faker.internet.email().toLowerCase(),
        username: faker.internet.username().toLowerCase(),
        image: faker.image.avatar(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        verifiedAt: faker.date.past(),
        name: faker.person.fullName(),
        id,
        emailVerified: true,
      });
      await tx.insert(schema.account).values({
        accountId: id,
        userId: id,
        password,
        id: generateRandomString(32),
        providerId: "credential",
      });
    });
  });
  await Promise.all(promises);
};

main()
  .then(() => console.log("done"))
  .catch((e) => console.error(e));
