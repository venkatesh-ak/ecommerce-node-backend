import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { InternalException } from "../exceptions/internal-exception";
import { ListProductSchema, ProductSchema } from "../schema/product";
import { BadRequestsException } from "../exceptions/bad-requests";

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const parsed = ProductSchema.parse(req.body);
  const {
    tags,
    images,
    dimensions,
    meta,
    reviews,
    ...rest
  } = parsed;

  const product = await prismaClient.product.create({
    data: {
      ...rest,
      tags: {
        connectOrCreate: tags.map(tagName => ({
          where: { name: tagName },
          create: { name: tagName },
        })),
      },
      images: {
        create: images.map(url => ({ url })),
      },
      dimensions: dimensions
        ? { create: dimensions }
        : undefined,
      meta: meta
        ? {
            create: {
              ...meta,
              createdAt: new Date(meta.createdAt),
              updatedAt: new Date(meta.updatedAt),
            },
          }
        : undefined,
      reviews: reviews
        ? {
            create: reviews.map(r => ({
              ...r,
              date: new Date(r.date),
            })),
          }
        : undefined,
    },
  });
  res.json(product);
};


// for testing add array of object product 
// export const createAllProducts = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const products = req.body;

//     if (!Array.isArray(products)) {
//       return res.status(400).json({ message: 'Input must be an array of products.' });
//     }

//     const formattedData = products.map(product => ({
//       ...product,
//       tags: Array.isArray(product.tags) ? product.tags.join(',') : '',
//     }));

//     const createdProducts = await prismaClient.product.createMany({
//       data: formattedData,
//       skipDuplicates: true, // Optional: skip if a unique constraint is violated
//     });

//     res.status(201).json({
//       message: 'Products created successfully',
//       count: createdProducts.count,
//     });
//   } catch (err) {
//     next(err); // Pass error to error middleware
//   }
// };


export const updateProduct = async (req:Request,res: Response,next:NextFunction)=>{
    try {
        let product = req.body;
        if(product.tags){
            product.tags = product.tags.join(',')
        }
        const updateProduct = await prismaClient.product.update({
            where:{
                id: +req.params.id
            },
            data: product 
        })
        res.json(updateProduct)
    } catch (error) {
        throw new NotFoundException('product not found', ErrorCode.PRODUCT_NOT_FOUND)
    }
}

export const deleteProduct = async (req:Request,res: Response,next:NextFunction)=>{

}
export const listProduct = async (req: Request, res: Response) => {
  const { page = 1, take = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = req.body;
  const skip = (page - 1) * take;

  const whereClause = search
    ? {
        OR: [
          { name: { contains: search} },
          { tags: { some: { name: { contains: search} } } }
        ]
      }
    : undefined;

  const [count, products] = await Promise.all([
    prismaClient.product.count({ where: whereClause }),
    prismaClient.product.findMany({
      skip,
      take,
      where: whereClause,
      orderBy: { [sortBy]: sortOrder },
      include: { tags: true }
    })
  ]);

  // Convert tags from objects to string[]
  const formattedProducts = await products.map((product) => ({
    ...product,
    tags: product.tags.map((tag) => tag.name)
  }));

  res.json({
    page,
    perPage: take,
    totalItems: count,
    totalPages: Math.ceil(count / take),
    data: formattedProducts
  });
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return next(new BadRequestsException('Invalid product ID',ErrorCode.INVALID_PRODUCTID));
  }

  try {
    const product = await prismaClient.product.findUnique({
      where: { id },
      include: {
        images: true,
        tags: true,
        reviews: true,
        dimensions: true,
        meta: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found', ErrorCode.PRODUCT_NOT_FOUND);
    }

    res.json(product);
  } catch (error) {
    next(error); // passes error to your global error handler
  }
};

export const searchProduct = async (req: Request, res: Response) => {
        console.log('query',req.query.q)
        const products = await prismaClient.product.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: req.query.q.toString(),
                        },
                    },
                    {
                        description: {
                            contains: req.query.q.toString(),
                        },
                    }
                ],
            }
        });
        res.json(products);
}
