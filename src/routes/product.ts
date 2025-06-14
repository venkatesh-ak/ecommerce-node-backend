import { Router } from "express";
import { errorHandler } from "../error-handler";
import { createProduct, deleteProduct, getProductById, listProduct, searchProduct, updateProduct } from "../controllers/product";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";

const productRoutes = Router();

// productRoutes.post('/all',[authMiddleware,adminMiddleware],errorHandler(createAllProducts))
productRoutes.post('/',[authMiddleware,adminMiddleware],errorHandler(createProduct))
productRoutes.get('/search',[authMiddleware],errorHandler(searchProduct))
productRoutes.get('/:id',[authMiddleware],errorHandler(getProductById))
productRoutes.put('/:id',[authMiddleware,adminMiddleware],errorHandler(updateProduct))
productRoutes.delete('/:id',[authMiddleware,adminMiddleware],errorHandler(deleteProduct))
productRoutes.post('/list',[authMiddleware],errorHandler(listProduct))

export default productRoutes