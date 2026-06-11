import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const generateToken = (userId: string) => {
  const token = jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: "7d" });
  return token;
};
