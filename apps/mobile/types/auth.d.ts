export interface AuthUser {
  name: string;
  email: string;
  profileImage: string;
}

export interface AuthData {
  token: string;
  user: AuthUser;
}

export interface User {
  id: string
  name: string;
  email: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}
