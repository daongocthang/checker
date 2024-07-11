import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import router from './api/routes';
import dbInit from './db';

dbInit();

const app: Express = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.use('/api/v1', router);

const PORT = parseInt(process.env.NODE_PORT as string) || 5000;
app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
