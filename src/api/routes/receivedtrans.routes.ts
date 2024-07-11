import { Request, Response, Router } from 'express';
import { HttpStatus } from '../../constants';
import * as receivedTransController from '../controllers/receivedtrans.controller';
import { xlUpload } from '../midlewares/upload';
import { handleSingleUpload } from './handlers';

const router = Router();

router.post('/upload', xlUpload.single('file'), async (req: Request, res: Response) => {
    await handleSingleUpload(req, res, async (file: Express.Multer.File) => {
        const rows = await receivedTransController.bulkCreate(file.fieldname);
        res.status(HttpStatus.CREATED).send(rows);
    });
});

router.get('/', async (_: Request, res: Response) => {
    const rows = await receivedTransController.getBySerial();
    res.status(HttpStatus.OK).send(rows);
});

router.delete('/', async (req: Request, res: Response) => {
    // delete transactions with unknown user
    const resultOK = false;
    if (resultOK) {
        res.status(HttpStatus.NO_CONTENT).send({ message: 'Deleted successfully' });
    } else {
        res.status(HttpStatus.NO_CONTENT).send({ message: 'Failed to delete' });
    }
});
