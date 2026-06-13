import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Email is not valid" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const registerSchema = z.object({
  email: z.string().email({ message: "Email is not valid" }),
  name: z.string().min(2, { message: "Name is too short" }),
  password: z.string().min(8, { message: "Password is too short" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
