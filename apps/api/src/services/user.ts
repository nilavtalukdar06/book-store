import { prisma } from "../config/prisma";
import { UserRepository } from "../repositories/user";
import { ApiError } from "../utils/error";
import { comparePassword, hashPassword } from "../utils/password";
import { generateToken } from "../utils/token";
import type { LoginInput, RegisterInput } from "../validators/auth";

const User = new UserRepository(prisma);

export class UserService {
  constructor() {}
  async register(data: RegisterInput) {
    const existingUser = await User.findByEmail(data.email);
    if (existingUser) {
      throw new ApiError(409, false, "user already exists", {});
    }
    const hashedPassword = await hashPassword(data.password);
    const user = await User.createUser({
      ...data,
      password: hashedPassword,
      profileImageUrl: `https://api.dicebear.com/10.x/avataaars/svg?seed=${encodeURI(data.email)}`,
    });
    const token = generateToken(user.id);
    return {
      user: {
        name: user.name,
        email: user.email,
        profileImage: user.profileImageUrl,
      },
      token,
    };
  }
  async login(data: LoginInput) {
    const user = await User.findByEmail(data.email);
    if (!user) {
      throw new ApiError(401, false, "invalid credentials", {});
    }
    const isPasswordCorrect = await comparePassword(
      data.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new ApiError(401, false, "invalid credentials", {});
    }
    const token = generateToken(user.id);
    return {
      user: {
        name: user.name,
        email: user.email,
        profileImage: user.profileImageUrl,
      },
      token,
    };
  }
}
