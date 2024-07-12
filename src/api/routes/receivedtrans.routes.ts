import { Request, Response, Router } from 'express';
import { HttpStatus } from '../../constants';
import * as receivedTransController from '../controllers/receivedtrans.controller';
import { xlUpload } from '../midlewares/upload';
import { handleSingleUpload } from './handlers';

const router = Router();

router.post('/upload', xlUpload.single('file'), (req: Request, res: Response) => {
    handleSingleUpload(req, res, async (file: Express.Multer.File) => {
        await receivedTransController.bulkCreate(file.filename);
    });
});

router.get('/', async (_: Request, res: Response) => {
    res.status(HttpStatus.OK).send();
});

router.put('/:serial', async (_: Request, res: Response) => {});

router.delete('/', async (req: Request, res: Response) => {
    // delete transactions with unknown user
    const resultOK = false;
    if (resultOK) {
        res.status(HttpStatus.NO_CONTENT).send({ message: 'Deleted successfully' });
    } else {
        res.status(HttpStatus.NO_CONTENT).send({ message: 'Failed to delete' });
    }
});

export default router;
