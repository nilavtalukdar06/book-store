import { SecureStorage } from "@/lib/secure-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
  profileImage: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const storedToken = await SecureStorage.getToken();
        if (storedToken) {
          setToken(storedToken);
        }
      } finally {
        setIsLoading(false);
      }
    };
    bootstrap();
  }, []);

  const login = async (token: string, user: User) => {
    await SecureStorage.setToken(token);
    setToken(token);
    setUser(user);
  };

  const logout = async () => {
    await SecureStorage.removeToken();
    setToken(null);
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("app must be wrapped inside auth provider");
  }
  return authContext;
};
