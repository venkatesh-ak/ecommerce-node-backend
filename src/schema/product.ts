import { optional, z } from 'zod';

// export const ProductSchema = z.object({
//   name: z.string(),
//   description: z.string(),
//   price: z.number().positive(),
//   tags: z.array(z.string()),
//   thumbnail: z.string().url(),
//   images: z.array(z.string().url()).min(1)
// });

export const ProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  rating: z.number(),
  thumbnail: z.string().url(),
  tags: z.array(z.string()),
  images: z.array(z.string().url()),
  discountPercentage: z.number().optional(),
  stock: z.number().optional(),
  sku: z.string().optional(),
  brand: z.string().optional(),
  weight: z.number().optional(),
  warrantyInformation: z.string().optional(),
  shippingInformation: z.string().optional(),
  availabilityStatus: z.string().optional(),
  returnPolicy: z.string().optional(),
  minimumOrderQuantity: z.number().optional(),
  meta: z
    .object({
      createdAt: z.string(),
      updatedAt: z.string(),
      barcode: z.string().optional(),
      qrCode: z.string().optional(),
    })
    .optional(),
  dimensions: z
    .object({
      width: z.number(),
      height: z.number(),
      depth: z.number(),
    })
    .optional(),
  reviews: z
    .array(
      z.object({
        rating: z.number(),
        comment: z.string(),
        date: z.string(),
        reviewerName: z.string(),
        reviewerEmail: z.string().email(),
      })
    )
    .optional(),
});


export const ListProductSchema = z.object({
  page: z.number().min(1).default(1),
  take: z.number().min(1).max(100).default(10),
  search: z.string().optional(),
  sortBy: z.enum(['createdAt', 'price']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional()
});