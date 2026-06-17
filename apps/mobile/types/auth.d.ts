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
  user: {
    id: string;
    name: string;
    email: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
  };
}
