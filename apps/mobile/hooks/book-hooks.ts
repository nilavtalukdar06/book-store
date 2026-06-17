import { BookService } from "@/services/book";
import { BookSchema } from "@/validators/book";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
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

export const useBooks = () => {
  return useInfiniteQuery({
    queryKey: ["books"],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      return await BookService.getBooks(pageParam, 2);
    },
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.data?.currentPage;
      const totalPages = lastPage.data?.totalPages;
      if (currentPage == null || totalPages == null) return undefined;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};
