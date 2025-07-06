import { Router } from "express";
import { errorHandler } from "../error-handler";
import { createProduct, deleteProduct, getProductById, listProduct, searchProduct, updateProduct } from "../controllers/product";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";

const productRoutes = Router();

// productRoutes.post('/all',[authMiddleware,adminMiddleware],errorHandler(createAllProducts))
productRoutes.post('/',[authMiddleware],errorHandler(createProduct))
productRoutes.get('/search',errorHandler(searchProduct))
productRoutes.get('/:id',errorHandler(getProductById))
productRoutes.put('/:id',[authMiddleware,adminMiddleware],errorHandler(updateProduct))
productRoutes.delete('/:id',[authMiddleware,adminMiddleware],errorHandler(deleteProduct))
// productRoutes.post('/list',[authMiddleware],errorHandler(listProduct))
productRoutes.post('/list',[],errorHandler(listProduct))

export default productRoutes