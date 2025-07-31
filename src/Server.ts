import express from 'express';
import * as fs from "node:fs";
import morgan from "morgan";
import {dealRouter} from "./routes/dealRouter.js";
import {errorHandler} from "./errorHandler/errorHandl.js";
import {authRoutes} from "./routes/authRouter.js";
import {contactRouter} from "./routes/contactRouter.js";
import {authMiddleware} from "./Middleware/Auth.js";

export const launchServer = () => {
    const app = express();
    const logstream= fs.createWriteStream('./src/access.log',{flags:"a"})
    const PORT=process.env.LOCAL_PORT ||3005
    const HOST=process.env.LOCAL_HOST ||`http://localhost:`

    app.use(express.json());
    app.use(morgan('dev'));
    app.use(morgan('combined', {stream: logstream}))



    app.use('/deals', authMiddleware, dealRouter);
    app.use('/contacts', authMiddleware, contactRouter);



    app.use(`/oauth`,authRoutes)



    app.use(errorHandler);


    app.listen(PORT,()=> {
        console.log(`Server started on port: ${HOST}${PORT}`)
    });
}