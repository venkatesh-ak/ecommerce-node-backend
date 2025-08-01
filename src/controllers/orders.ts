import { Request, Response } from "express";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const createOrder= async(req: Request, res: Response)=>{
    try {
        return await prismaClient.$transaction(async (tx:any) => {
            const cartItems = await tx.cartItem.findMany({
                where: {
                    userId: req.user.id
                },
                include: {
                    product: true
                }
            })
            console.log(cartItems)
    
            if(cartItems.length ==0){
                return res.json({message:'cart is empty.'})
            }
    
            const price = cartItems.reduce((prev,current)=>{
                return prev + (current.quantity * +current.product.price)
            },0)
    
            console.log('total:',price)
    
            const address = await tx.address.findFirst({
                where: {
                    id: req.user.defaultShippingAddressId
                }
            })
            
            const order = await tx.order.create({
                data: {
                    userId:req.user.id,
                    netAmount: price,
                    address: address.formattedAddress,
                    products: {
                        create: cartItems.map(cart=>{
                            return {
                                productId : cart.productId,
                                quantity: cart.quantity
                            }
                        })
                    }
                }
            })
    
            const orderEvent = await tx.orderEvent.create({
                data: {
                    orderId: order.id
                }
            })
    
            await tx.cartItem.deleteMany({
                where: {
                    userId: req.user.id
                }
            })
    
            return res.json({order,events: orderEvent})
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}
export const listOrders= async(req: Request, res: Response)=>{
    const orders = await prismaClient.order.findMany({
        where:{
            userId: req.user.id
        }
    })
    res.json(orders)
}
export const cancelOrder= async(req: Request, res: Response)=>{

        return await prismaClient.$transaction(async (tx:any)=>{
            const order = await tx.order.update({
                where:{
                    id: +req.params.id
                },
                data: {
                    status: 'CANCELLED'
                }
            });
    
            await tx.orderEvent.create({
                data: {
                    orderId: order.id,
                    status: 'CANCELLED'
                }
            })
    
            return res.json(order)
        })
}
export const getOrderById= async(req: Request, res: Response)=>{
    try {
        const order = await prismaClient.order.findFirstOrThrow({
            where: {
                id: +req.params.id
            },
            include:{
                products:true,
                events:true
            }
        });
        res.json(order)
    } catch (error) {
        throw new NotFoundException('order not found', ErrorCode.ORDER_NOT_FOUND)
    }
}

export const listAllOrders = async(req:Request, res: Response)=> {
    let whereClause = {}
    const status = req.query.status
    if(status){
        whereClause = {
            status
        }
    }
    const orders = await prismaClient.order.findMany({
        where: whereClause,
        skip: +req.query.skip ||  0,
        take: 5
    })
    res.json(orders)
}
export const changeStatus = async(req:Request, res: Response)=> {
    return await prismaClient.$transaction(async (tx:any)=>{
        try {
            const order = await tx.order.update({
            where: {
                id: +req.params.id
            },
            data: {
                status: req.body.status
            }
        })

        await tx.orderEvent.create({
            data: {
                orderId: order.id,
                status: req.body.status
            }
        })

        return res.json(order)
        } catch (error) {
            throw new NotFoundException('order not found', ErrorCode.ORDER_NOT_FOUND)
        }
    })
}
export const listUserOrders = async(req:Request, res: Response)=> {
    let whereClause:any = {
        userId: +req.params.id
    }
    const status = req.query.status
    if(status){
        whereClause = {
            ...whereClause,
            status
        }
    }
    const orders = await prismaClient.order.findMany({
        where: whereClause,
        skip: +req.query.skip ||  0,
        take: 5
    })
    res.json(orders)
}