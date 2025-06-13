import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../error-handler";
import { cancelOrder, createOrder, getOrderById, listOrders } from "../controllers/orders";

const orderRoutes = Router();

// productRoutes.post('/all',[authMiddleware,adminMiddleware],errorHandler(createAllProducts))
orderRoutes.post('/',[authMiddleware],errorHandler(createOrder))
orderRoutes.get('/',[authMiddleware],errorHandler(listOrders))
orderRoutes.put('/:id/cancel',[authMiddleware],errorHandler(cancelOrder))
orderRoutes.get('/:id',[authMiddleware],errorHandler(getOrderById))

export default orderRoutes