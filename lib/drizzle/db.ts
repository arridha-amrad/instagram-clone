import { env } from "@/env";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/neon-serverless";

const db = drizzle(env.dbUrl!, { schema });

export default db;
