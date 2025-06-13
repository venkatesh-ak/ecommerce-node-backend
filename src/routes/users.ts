import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import { errorHandler } from "../error-handler";
import { addAddress, changeUserRole, deleteAddress, getUserById, listAddress, listUser, updateUser } from "../controllers/users";

const userRoutes = Router();

userRoutes.post('/address', [authMiddleware], errorHandler(addAddress))
userRoutes.delete('/address/:id', [authMiddleware], errorHandler(deleteAddress))
userRoutes.get('/address', [authMiddleware], errorHandler(listAddress))
userRoutes.put('/', [authMiddleware], errorHandler(updateUser))
userRoutes.put('/:id/role', [authMiddleware], errorHandler(changeUserRole))
userRoutes.get('/', [authMiddleware], errorHandler(listUser))
userRoutes.get('/:id', [authMiddleware], errorHandler(getUserById))

export default userRoutes