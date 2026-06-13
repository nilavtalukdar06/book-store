export interface AuthUser {
  name: string;
  email: string;
  profileImage: string;
}

export interface AuthData {
  token: string;
  user: AuthUser;
}
