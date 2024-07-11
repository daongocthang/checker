import { Request, Response, Router } from 'express';
import * as categoryController from '../controllers/category.controller';
import { bulkCreate } from '../controllers/category.controller';
import { xlUpload } from '../midlewares/upload';
import { handleSingleUpload } from './handlers';

const categoryRouter = Router();

categoryRouter.get('/', async (_: Request, res: Response) => {
    res.json(await categoryController.findAll());
});

categoryRouter.post('/', xlUpload.single('file'), async (req: Request, res: Response) => {
    await handleSingleUpload(req, res, async (file: Express.Multer.File) => {
        await bulkCreate(file.filename);
    });
});

export default categoryRouter;
