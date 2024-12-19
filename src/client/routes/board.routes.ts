import { Request, Response, Router } from 'express';
import path from 'path';
import { BadRequestError } from '../../middlewares/error.middleware';
import { DOWNLOAD_DIR } from '../config';
import * as boardController from '../controllers/board.controller';

const boardRouter = Router();
boardRouter.get('/', boardController.home);
boardRouter.get('/settings', boardController.settings);
boardRouter.get('/downloads', (req: Request, res: Response) => {
    const filename = req.query?.p;
    if (!filename) throw new BadRequestError('Not found filename');
    res.download(path.join(DOWNLOAD_DIR, filename as string));
});

export default boardRouter;
