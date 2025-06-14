import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { InternalException } from "../exceptions/internal-exception";
import { ListProductSchema } from "../schema/product";

export const createProduct = async (req:Request,res: Response,next:NextFunction)=>{
    const product = await prismaClient.product.create({data: {
        ...req.body,
        tags: req.body.tags.join(',')
    }})
    res.json(product)
}


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
export const listProduct = async (req:Request,res: Response)=>{
    // ListProductSchema.parse(req.body);
    const { page, take, search, sortBy = 'createdAt', sortOrder = 'desc' } = req.body;
    const skip = (page - 1) * take
    const [count, products] = await Promise.all([
      prismaClient.product.count({
        where: search
          ? {
              OR: [
                { name: { contains: search } },
                { tags: { contains: search } }
              ]
            }
          : undefined
      }),
      prismaClient.product.findMany({
        skip,
        take,
        where: search
          ? {
              OR: [
                { name: { contains: search } },
                { tags: { contains: search } }
              ]
            }
          : undefined,
        orderBy: { [sortBy]: sortOrder },
        // include: { images: true }
      })
    ]);

    res.json({
      page,
      perPage: take,
      totalItems: count,
      totalPages: Math.ceil(count / take),
      data: products
    });
}
export const getProductById = async (req:Request,res: Response,next:NextFunction)=>{
    try {
        const product = await prismaClient.product.findFirstOrThrow({
            where: {
                id:+req.params.id
            },
            include: {
                images: true
            }
        })
        res.json(product)
    } catch (error) {
        throw new NotFoundException('product not found', ErrorCode.PRODUCT_NOT_FOUND)
    }
}

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
                    },
                    {
                        tags: {
                            contains: req.query.q.toString(), // for tags as String[]
                        },
                    },
                ],
            }
        });
        res.json(products);
}
