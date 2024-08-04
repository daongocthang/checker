import * as dotenv from 'dotenv';
dotenv.config();

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';
import 'express-async-errors';
import apiRouter from './api/routes';
import { User } from './api/types';
import { STATIC_DIR, VIEWS_DIR } from './client/config';
import authRouter from './client/routes/auth.routes';
import boardRouter from './client/routes/board.routes';
import dbInit from './db';
import dbInit2 from './db2';
import authenticate from './middlewares/auth.middleware';
import { errorHandler } from './middlewares/error.middleware';

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

console.log(new Date());

const app: Express = express();

app.set('view engine', 'ejs');
app.set('views', VIEWS_DIR);
app.use(express.static(STATIC_DIR));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

const PORT = parseInt(process.env.NODE_PORT as string) || 5000;
app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

//Client Routes
app.use('/', authRouter);
// API Routes
app.use('/api/v1', authenticate, apiRouter);
app.use('/', authenticate, boardRouter);

// Exception Middleware
app.use(errorHandler);

dbInit();
dbInit2();
