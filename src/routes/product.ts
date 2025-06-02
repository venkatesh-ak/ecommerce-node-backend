import { Router } from "express";
import { errorHandler } from "../error-handler";
import { createProduct } from "../controllers/product";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";

const productRoutes = Router();

productRoutes.post('/',[authMiddleware,adminMiddleware],errorHandler(createProduct))

export default productRoutes