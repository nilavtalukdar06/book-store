import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "access_token";

export class SecureStorage {
  constructor() {}
  static async getToken() {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    return token;
  }
  static async setToken(token: string) {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  }
  static async removeToken() {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  }
}
