import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  databaseUrl: z.string().url(),
});

const env = envSchema.parse(process.env);

export { env };
