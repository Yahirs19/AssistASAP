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
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  imageUrl: z.string(),
  price: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  cantidad: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  modelo: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  categoriaId: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  proveedorID: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  // name: z.string().trim(), // Campo 'name' debe ser string
  // imageUrl: z.string().trim(), // Campo 'imageUrl' debe ser string
  // price: z.string().trim(), // Convertir 'price' a string y aplicar 'trim()'
  // cantidad: z.string().trim(), // Convertir 'cantidad' a string y aplicar 'trim()'
  // modelo: z.string().trim(), // Campo 'slug' debe ser string
  // description: z.string().trim(), // Campo 'description' debe ser string
  // categoriaId: z.string().trim(),
  // proveedorId: z.string().trim(),
  // slug: z.string().trim(),
});
