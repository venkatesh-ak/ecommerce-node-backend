import { Router } from "express";
import { login, signup } from "../controllers/auth";

export const authRoutes = Router();

authRoutes.post('/login',login);

authRoutes.post('/signup',signup);