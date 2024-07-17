import { Request, Response, Router } from 'express';
import { HttpStatus } from '../../constants';
import * as receivedTransController from '../controllers/receivedtrans.controller';
import { xlUpload } from '../middlewares/upload.middleware';
import { handleSingleUpload } from './handlers';

const router = Router();

router.post('/upload', xlUpload.single('file'), (req: Request, res: Response) => {
    handleSingleUpload(req, res, async (file: Express.Multer.File) => {
        await receivedTransController.bulkCreate(file.filename);
    });
});

router.get('/', async (req: Request, res: Response) => {
    res.status(HttpStatus.OK).send();
});

router.post('/:date/serials/:serial', async (req: Request, res: Response) => {
    const { date, serial } = req.params;
    // const payload: object = req.body;

    const strptime: Date = new Date(date);
    try {
        const trans = await receivedTransController.findOne({
            createdAt: {
                $gte: strptime,
            },
            serial,
        });
        if (trans === null) {
            throw new Error('Not found');
        }

        const expired = await receivedTransController.isExpired(serial, trans.model);
        trans.expired = expired;
        const result = await receivedTransController.update(trans.ticket, trans);

        res.status(HttpStatus.OK).send(result);
    } catch (e) {
        res.status(HttpStatus.BAD_REQUEST).send({ message: 'Not Found' });
        console.log(e);
    }
});
router.get('/:date/users/:user', async (req: Request, res: Response) => {
    const { dt, user } = req.params;
    console.log(dt, user);
});

router.delete('/null/users', async (req: Request, res: Response) => {
    try {
        const resultOK = await receivedTransController.removeAll({
            userId: { $eq: null },
        });
        if (!resultOK) {
            throw new Error('Failed to delete');
        }
        res.status(HttpStatus.OK).send({ message: 'Deleted successfully' });
    } catch (e) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Failed to delete' });
    }
});

export default router;
