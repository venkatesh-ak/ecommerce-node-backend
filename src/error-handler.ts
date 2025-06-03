import { NextFunction, Request, Response } from "express"
import { ErrorCode, HttpException } from "./exceptions/root"
import { InternalException } from "./exceptions/internal-exception"
import { ZodError } from "zod"
import { UnprocessableEntity } from "./exceptions/validation"

export const errorHandler = (method: Function) => {
    return async (req: Request,res: Response,next: NextFunction) => {
        try {
            await method(req,res,next)
        } catch (error) {
            let exception: HttpException
            if(error instanceof HttpException){
                exception = error
            }
            else{
                if(error instanceof ZodError){
                    exception = new UnprocessableEntity('Unprocessable entity.',ErrorCode.UNPROCESSABLE_ENTITY,error)
                }
                else{
                    exception = new InternalException('something went wrong!',error, ErrorCode.INTERNAL_EXCEPTION)
                }
            }
            next(exception)
        }
    }
}
