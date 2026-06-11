import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email({ message: "email is not valid" }),
  name: z.string().min(2, { message: "name is too short" }),
  password: z.string().min(8, { message: "password is too short" }),
  profileImageUrl: z
    .string()
    .url({ message: "profile image url is not valid" }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "email is not valid" }),
  password: z.string().min(1, { message: "password is required" }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
