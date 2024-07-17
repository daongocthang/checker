import { Request, Response, Router } from 'express';
import { HttpStatus } from '../../constants';
import * as categoryController from '../controllers/category.controller';
import { bulkCreate } from '../controllers/category.controller';
import { xlUpload } from '../middlewares/upload.middleware';
import { handleSingleUpload } from './handlers';

const router = Router();

router.post('/upload', xlUpload.single('file'), (req: Request, res: Response) => {
    handleSingleUpload(req, res, async (file: Express.Multer.File) => {
        await bulkCreate(file.filename);
    });
});

router.post('/', async (req: Request, res: Response) => {
    const cat = req.body;
    try {
        const result = await categoryController.create(cat);
        res.status(HttpStatus.CREATED).send(result);
    } catch (e) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('INTERNAL_SERVER_ERROR');
        console.log(e);
    }
});

router.put('/:model', async (req: Request, res: Response) => {
    const { model } = req.params;
    try {
        const payload = req.body;
        const result = await categoryController.update(model, payload);

        res.status(HttpStatus.OK).send(result);
    } catch (e) {
        res.status(HttpStatus.NOT_FOUND).send({ message: req.params });
    }
});

router.delete('/', async (req: Request, res: Response) => {
    const resultOK = await categoryController.removeAll();
    if (resultOK) {
        res.status(HttpStatus.NO_CONTENT).send({ message: 'Removed all successfully' });
    } else {
        res.status(HttpStatus.NOT_FOUND).send({ message: 'Failed to remove all' });
    }
});
router.delete('/:model', async (req: Request, res: Response) => {
    const { model } = req.params;
    const resultOK = await categoryController.remove(model);
    if (resultOK) {
        res.status(HttpStatus.NO_CONTENT).send({ message: 'Removed successfully' });
    } else {
        res.status(HttpStatus.NOT_FOUND).send({ model, message: 'Failed to remove' });
    }
});
router.get('/', async (_: Request, res: Response) => {
    res.status(HttpStatus.OK).send(await categoryController.findAll());
});

export default router;
