import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';
import express, { Express } from 'express';
import { STATIC_DIR, VIEWS_DIR } from '../src/client/config';
import clientRouter from '../src/client/routes';

// dbInit();

const app: Express = express();

app.set('view engine', 'ejs');
app.set('views', VIEWS_DIR);
app.use(express.static(STATIC_DIR));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
    cookieSession({
        keys: ['abcd123'],
        httpOnly: true,
    }),
);

// app.use('/api/v1', router);
app.use('/', clientRouter);

const PORT = parseInt(process.env.NODE_PORT as string) || 5000;
app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
