import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(1, { message: "title is required" }),
  caption: z.string().min(1, { message: "caption is required" }),
  rating: z
    .number()
    .min(1, { message: "minimun rating is 1" })
    .max(5, { message: "maximum rating is 5" }),
  imageUrl: z.string().url({ message: "image url is required" }),
});

export const paginationSchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(2),
});

export type BookInput = z.infer<typeof createBookSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
