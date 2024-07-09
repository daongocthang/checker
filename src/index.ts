import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import '../src/types';
import productRouter from './api/routes/warranty.routes';
import { xlUpload } from './api/midlewares/upload';

dotenv.config();

global.publicDir = __dirname + '/public';

const app: Express = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.use('/api/v1', productRouter);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
