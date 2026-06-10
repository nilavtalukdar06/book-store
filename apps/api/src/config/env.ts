import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  databaseUrl: z.string().url(),
  port: z.number().default(3000),
});

const env = envSchema.parse(process.env);

export { env };
