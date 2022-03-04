import * as z from "zod";

export const newPostSchema = z.object({
  description: z
    .string()
    .min(10, "Description is required and minimum of 10 characters"),
});
