import { BookService } from "@/services/book";
import { BookSchema } from "@/validators/book";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export const useCreateBook = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: BookSchema) => {
      return await BookService.createBook(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
      router.replace("/");
    },
  });
};
