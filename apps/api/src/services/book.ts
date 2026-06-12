import { prisma } from "../config/prisma";
import cloudinary from "../lib/cloudinary";
import { BookRepository } from "../repositories/book";
import { ApiError } from "../utils/error";
import { BookInput } from "../validators/book";
import StatusCodes from "http-status-codes";

const Book = new BookRepository(prisma);

export class BookService {
  constructor() {}
  async createBook(userId: string, data: BookInput) {
    const uploadResponse = await cloudinary.uploader.upload(data.imageUrl);
    return await Book.create({
      ...data,
      userId,
      imageUrl: uploadResponse.secure_url,
    });
  }
  async getBooks(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [books, totalBooks] = await Promise.all([
      await Book.findMany(skip, limit),
      await Book.count(),
    ]);
    return {
      books,
      currentPage: page,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
    };
  }
  async getUserBooks(userId: string) {
    return await Book.findByUser(userId);
  }
  async deleteBook(userId: string, bookId: string) {
    const book = await Book.findById(bookId);
    if (!book) {
      throw new ApiError(StatusCodes.NOT_FOUND, false, "book not found", {});
    }
    if (book.userId !== userId) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, false, "unauthorized", {});
    }
    if (book.imageUrl && book.imageUrl.includes("cloudinary")) {
      const publicId = book.imageUrl.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }
    return await Book.delete(bookId);
  }
}
