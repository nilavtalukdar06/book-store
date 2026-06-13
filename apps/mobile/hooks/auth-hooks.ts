import { useAuth } from "@/context/auth-context";
import { AuthService } from "@/services/auth";
import { LoginSchema, RegisterSchema } from "@/validators/auth";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  const { login } = useAuth();
  return useMutation({
    mutationFn: async (data: RegisterSchema) => {
      return await AuthService.register(data);
    },
    onSuccess: async ({ data }) => {
      if (data) {
        await login(data.token, data.user);
      }
    },
  });
};

export const useLogin = () => {
  const { login } = useAuth();
  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      return await AuthService.login(data);
    },
    onSuccess: async ({ data }) => {
      if (data) {
        await login(data.token, data.user);
      }
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuth();
  return logout;
};
