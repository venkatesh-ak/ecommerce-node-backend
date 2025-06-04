import { Router } from "express";
import { authRoutes } from "./auth";
import productRoutes from "./product";
import userRoutes from "./users";

const rootRouter = Router();

rootRouter.use('/auth',authRoutes);
rootRouter.use('/product',productRoutes);
rootRouter.use('/user',userRoutes);

export default rootRouter;