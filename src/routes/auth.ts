import { Router } from "express";
import { login, signup } from "../controllers/auth";
import { errorHandler } from "../error-handler";

export const authRoutes = Router();

authRoutes.post('/login',errorHandler(login));

authRoutes.post('/signup',errorHandler(signup));