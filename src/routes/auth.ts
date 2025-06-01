import { Router } from "express";
import { login, me, signup } from "../controllers/auth";
import authMiddleware from "../middlewares/auth";
import {errorHandler} from "../error-handler";


export const authRoutes = Router();

authRoutes.post('/login',errorHandler(login));

authRoutes.post('/signup',errorHandler(signup));

authRoutes.get('/me',[authMiddleware], errorHandler(me));