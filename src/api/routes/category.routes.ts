import { Request, Response, Router } from 'express';
import { HttpStatus } from '../../constants';
import { CategoryAttrs } from '../../db/models/category.model';
import * as categoryController from '../controllers/category.controller';
import { bulkCreate } from '../controllers/category.controller';
import { xlUpload } from '../midlewares/upload';
import { handleSingleUpload } from './handlers';

const categoryRouter = Router();

categoryRouter.post('/', xlUpload.single('file'), async (req: Request, res: Response) => {
    await handleSingleUpload(req, res, async (file: Express.Multer.File) => {
        await bulkCreate(file.filename);
    });
});

categoryRouter.post('/', async (req: Request, res: Response) => {
    const cat: CategoryAttrs = req.body;
    try {
    } catch (e) {}
});

categoryRouter.get('/', async (_: Request, res: Response) => {
    res.status(HttpStatus.OK).json(await categoryController.findAll());
});

categoryRouter.get('/:model', async (req: Request, res: Response) => {});

export default categoryRouter;
