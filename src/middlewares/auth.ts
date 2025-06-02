import { NextFunction, Request } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import { prismaClient } from "..";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../secrets";

const authMiddleware:any = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHRIZED));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    const user = await prismaClient.user.findFirst({ where: { id: payload.userId } });

    if (!user) {
      return next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHRIZED));
    }

    req.user = user as any;
    next();
  } catch (error) {
    next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHRIZED));
  }
};


export default authMiddleware

