import type { LoginSchema, RegisterSchema } from "@/validators/auth";
import { api } from "../lib/axios";
import { ApiResponse } from "../types/api-response";
import type { AuthData } from "../types/auth";

export class AuthService {
  constructor() {}
  static async login(payload: LoginSchema): Promise<ApiResponse<AuthData>> {
    const { data } = await api.post("/api/auth/login", payload);
    return data;
  }
  static async register(
    payload: RegisterSchema,
  ): Promise<ApiResponse<AuthData>> {
    const { data } = await api.post("/api/auth/register", payload);
    return data;
  }
}
