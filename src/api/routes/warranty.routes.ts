import { Request, Response, Router } from 'express';
import { xlUpload } from '../midlewares/upload';
import { handleXlsxFile } from './handlers';
const warrantyRouter = Router();

warrantyRouter.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello' });
});

warrantyRouter.post('/', xlUpload.single('file'), handleXlsxFile);

export default warrantyRouter;
