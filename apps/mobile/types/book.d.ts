export interface UserBook {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  rating: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  name: string;
  email: string;
  profileImageUrl: string;
}

export interface Book {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  rating: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface PaginatedBooksResponse {
  books: Book[];
  currentPage: number;
  totalBooks: number;
  totalPages: number;
}

export type GetUserBooksResponse = UserBook[];
