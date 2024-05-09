import { z } from "zod";

export const ProductoZSchema = z.object({
  id: z.number(),
  name: z.string().trim(),
  slug: z.string().trim(),
  description: z.string().trim(),
  imageAlt: z.string().trim(),
  imageUrl: z.string().trim(),
  price: z.string().trim(),
});

export const CrearProductoZSchema = z.object({
  name: z.string().trim(),
  description: z.string().trim(),
  price: z.string().trim(),
  //imageAlt: z.string().trim(),
  imageUrl: z.string().trim(),
});
