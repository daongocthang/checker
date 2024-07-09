import { Request, Response, Router } from 'express';
import '../../types';
import { readXlsxFile as handleUpload } from '../handlers';
import { xlUpload } from '../midlewares/upload';
const productRouter = Router();

productRouter.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello' });
});

productRouter.post('/', xlUpload.single('file'), handleUpload);

export default productRouter;
