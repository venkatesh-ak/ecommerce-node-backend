import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import { errorHandler } from "../error-handler";
import { addItemToCart, changeQuantity, deleteItemFromCart, getCart } from "../controllers/cart";

const cartRoutes = Router();

// productRoutes.post('/all',[authMiddleware,adminMiddleware],errorHandler(createAllProducts))
cartRoutes.post('/',[authMiddleware],errorHandler(addItemToCart))
cartRoutes.get('/',[authMiddleware],errorHandler(getCart))
cartRoutes.delete('/',[authMiddleware],errorHandler(deleteItemFromCart))
cartRoutes.put('/:id',[authMiddleware],errorHandler(changeQuantity))

export default cartRoutes