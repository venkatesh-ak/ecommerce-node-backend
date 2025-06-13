import { Router } from "express";
import { authRoutes } from "./auth";
import productRoutes from "./product";
import userRoutes from "./users";
import cartRoutes from "./cart";
import orderRoutes from "./orders";

const rootRouter = Router();

rootRouter.use('/auth',authRoutes);
rootRouter.use('/product',productRoutes);
rootRouter.use('/user',userRoutes);
rootRouter.use('/carts',cartRoutes);
rootRouter.use('/orders',orderRoutes);

export default rootRouter;

/*
    1. user management
        a. list users
        c. get user by id
        b. change user role
    2. order management
        a. list all order (filter on status)
        b. change order status
    3. products
        a. search api for products (for both users and admins) -> full text search
*/