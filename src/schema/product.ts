import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  tags: z.array(z.string()),
  thumbnail: z.string().url(),
  images: z.array(z.string().url()).min(1)
});

export const ListProductSchema = z.object({
  page: z.number().min(1).default(1),
  take: z.number().min(1).max(100).default(10),
  search: z.string().optional(),
  sortBy: z.enum(['createdAt', 'price']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional()
});