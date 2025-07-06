import { NextFunction, Request, Response } from "express"
import { prismaClient } from "..";
import {compareSync, hashSync} from 'bcrypt';
import { JWT_SECRET } from "../secrets";
import * as jwt from 'jsonwebtoken';
import { BadRequestsException } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";
import { SignUpSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/not-found";
import { UnprocessableEntity } from "../exceptions/validation";



export const signup = async (req:Request,res: Response, next: NextFunction)=>{
        SignUpSchema.parse(req.body)
        const {name,email,password} = req.body;
        let user = await prismaClient.user.findFirst({where : {email} });
        if(user){
            next(new BadRequestsException('User already exists!',ErrorCode.USER_ALREADY_EXISTS))
        }
        user = await prismaClient.user.create({
            data: {
                name,
                email,
                password: hashSync(password, 10)
            }
        })
        res.json(user);
}

export const login = async (req:Request,res: Response,next:NextFunction)=>{
    const {email,password} = req.body;

    let user = await prismaClient.user.findFirst({where : {email} });
    if(!user){
        throw new NotFoundException('User not found!',ErrorCode.USER_NOT_FOUND)
    }
    if(!compareSync(password,user.password)){
        throw new BadRequestsException('Invalid password!',ErrorCode.INCORRECT_PASSWORD)
    }
    const token = jwt.sign({
        userId : user.id
    },JWT_SECRET);
    // },JWT_SECRET,{ expiresIn: '3d' });

    const { password: _, ...sanitizedUser } = user;


    res.json({user:sanitizedUser, token});
}

// => me -> return user from token

export const me= async(req: Request, res: Response,next:NextFunction)=>{
    res.json(req.user)
    // next()
}