import { NextFunction, Request, Response } from "express";
import { ChangeQuantitySchema, CreateCartSchema } from "../schema/cart";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { prismaClient } from "..";
import { CartItem, Product } from "@prisma/client";

export const addItemToCart= async(req: Request, res: Response)=>{
    //check for existance of the product and in user's cart and alter the quantity as required
    const validateData = CreateCartSchema.parse(req.body)
    let product: Product
    try {
        product = await prismaClient.product.findFirstOrThrow({
            where: {
                id: validateData.productId
            }
        })
    } catch (error) {
        throw new NotFoundException('Product not found',ErrorCode.PRODUCT_NOT_FOUND)
    }

    //find user have cartItem with product id
    let cartProductItem:CartItem
    cartProductItem = await prismaClient.cartItem.findFirst({
        where: {
            userId: req.user.id,
            productId: product.id,
        }
    })

    
    let cart: CartItem
    if(cartProductItem){
        cart = await prismaClient.cartItem.update({
            where: {
                id: cartProductItem.id
            },
            data: {
                quantity: validateData.quantity
            }
        })
    }
    else{
        cart = await prismaClient.cartItem.create({
            data: {
                userId: req.user.id,
                productId: product.id,
                quantity: validateData.quantity
            }
        })
    }
    res.json(cart)
}
export const deleteItemFromCart= async(req: Request, res: Response)=>{
    //check user is deleting its own cart item - done
    await prismaClient.cartItem.delete({
        where: {
            id: +req.params.id
        }
    })
    res.json({success:true})
}
export const changeQuantity= async(req: Request, res: Response)=>{
    const validateData = ChangeQuantitySchema.parse(req.body)

    try {
        const updatedCart = await prismaClient.cartItem.update({
            where: {
                id: +req.params.id,
                userId: req.user.id
            },
            data: {
                quantity: validateData.quantity
            }
        })
        res.json(updatedCart)
    } catch (error) {
        throw new NotFoundException('Cart not found',ErrorCode.PRODUCT_NOT_FOUND)
    }
}
export const getCart= async(req: Request, res: Response)=>{
    try {
        const cartItems = await prismaClient.cartItem.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                product: true
            }
        })
        res.json(cartItems)
    } catch (error) {
        throw new NotFoundException('Cart not found',ErrorCode.PRODUCT_NOT_FOUND)
    }
}