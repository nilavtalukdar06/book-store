import { api } from "@/lib/axios";
import { ApiResponse } from "@/types/api-response";
import {
  GetUserBooksResponse,
  PaginatedBooksResponse,
  UserBook,
} from "@/types/book";
import { BookSchema } from "@/validators/book";

export class BookService {
  constructor() {}
  static async createBook(payload: BookSchema): Promise<ApiResponse<UserBook>> {
    const { data } = await api.post("/api/book/create", payload);
    return data;
  }
  static async getBooks(
    page: number,
    limit: number,
  ): Promise<ApiResponse<PaginatedBooksResponse>> {
    const { data } = await api.get("/api/book/get", {
      params: {
        page,
        limit,
      },
    });
    return data;
  }
  static async getUserBooks(): Promise<ApiResponse<GetUserBooksResponse>> {
    const { data } = await api.get("/api/book/user");
    return data;
  }
  static async deleteBook(id: string): Promise<ApiResponse<UserBook>> {
    const { data } = await api.delete(`/api/book/${id}`);
    return data;
  }
}
