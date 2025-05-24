import express, {Express, Request, Response} from "express";
import rootRouter from "./routes";
import { PORT } from "./secrets";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";
import { SignUpSchema } from "./schema/users";

const app:Express = express();

app.use(express.json());
app.use('/api',rootRouter);

export const prismaClient:any = new PrismaClient({
    log:['query']
})

app.use(errorMiddleware);

app.listen(PORT,()=>{console.log('app working!')})