import { Book, PrismaClient } from "../generated/prisma/client";

export class BookRepository {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async create(data: Omit<Book, "id" | "createdAt" | "updatedAt">) {
    return await this.prisma.book.create({
      data,
    });
  }
  async findById(id: string) {
    return await this.prisma.book.findUnique({
      where: { id },
    });
  }
  async findMany(skip: number, limit: number) {
    return this.prisma.book.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            profileImageUrl: true,
          },
        },
      },
    });
  }
  async count() {
    return await this.prisma.book.count();
  }
  async findByUser(userId: string) {
    return await this.prisma.book.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  async delete(id: string) {
    return await this.prisma.book.delete({
      where: { id },
    });
  }
}
