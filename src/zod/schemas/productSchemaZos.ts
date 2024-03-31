import { z } from "zod";

export const ProductoZSchema = z.object({
  name: z.string().trim(),
  slug: z.string().trim(),
  description: z.string().trim(),
  imageAlt: z.string().trim(),
  price: z.string().trim(),
});
