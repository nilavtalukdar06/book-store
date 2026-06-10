import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  databaseUrl: z.string().url(),
  port: z.number().default(3000),
});

const env = envSchema.parse(process.env);

export { env };
