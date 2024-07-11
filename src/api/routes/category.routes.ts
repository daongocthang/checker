import { Request, Response, Router } from 'express';
import { bulkCreate } from '../controllers/category.controller';
import { xlUpload } from '../midlewares/upload';
import { handleSingleUpload } from './handlers';
import * as categoryHandler from './handlers/category.handler';
const categoryRouter = Router();

categoryRouter.get('/', categoryHandler.getAll);

categoryRouter.post('/', xlUpload.single('file'), async (req: Request, res: Response) => {
    await handleSingleUpload(req, res, async (file: Express.Multer.File) => {
        await bulkCreate(file.filename);
    });
});

export default categoryRouter;
