import { PrismaClient, User } from "../generated/prisma/client";

export class UserRepository {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
  async createUser(data: Omit<User, "id" | "createdAt" | "updatedAt">) {
    return this.prisma.user.create({
      data,
    });
  }
  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
