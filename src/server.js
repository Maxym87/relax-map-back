import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import {errorHandler} from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { logger } from './middleware/logger.js';
import { errors } from 'celebrate';


const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);



await connectMongoDB();

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
