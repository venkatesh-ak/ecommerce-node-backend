import express, {Express, Request, Response} from "express";
import rootRouter from "./routes";
import { PORT } from "./secrets";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";
import { SignUpSchema } from "./schema/users";
import cors from 'cors';

const app:Express = express();

app.use(cors({
  origin: '*', // Or '*' for all origins (only for dev)
  credentials: true
}));

app.use(express.json());

app.use('/api',rootRouter);

export const prismaClient:any = new PrismaClient({
    log:['query']
}).$extends({
    result: {
        address: {
            formattedAddress :{
                needs: {
                    address: true,
                    addressType: true,
                    city: true,
                    state: true,
                    country: true,
                    pincode: true
                },
                compute: ((addr)=>{
                    return `${addr.address}, ${addr.addressType}, ${addr.city}, ${addr.state}-${addr.pincode}, ${addr.country}`
                })
            }
        }
    }
})

app.use(errorMiddleware);

app.listen(PORT,()=>{console.log('app working!')})