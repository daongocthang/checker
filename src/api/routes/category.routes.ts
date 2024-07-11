import { Request, Response, Router } from 'express';
import { HttpStatus } from '../../constants';
import { CategoryAttrs } from '../../db/models/category.model';
import * as categoryController from '../controllers/category.controller';
import { bulkCreate } from '../controllers/category.controller';
import { xlUpload } from '../midlewares/upload';
import { handleSingleUpload } from './handlers';

const router = Router();

router.post('/upload', xlUpload.single('file'), async (req: Request, res: Response) => {
    await handleSingleUpload(req, res, async (file: Express.Multer.File) => {
        await bulkCreate(file.filename);
    });
});

router.post('/', async (req: Request, res: Response) => {
    const cat: CategoryAttrs = req.body;
    const result = await categoryController.create(cat);
    res.status(HttpStatus.CREATED).send(result);
});

router.put('/:model', async (req: Request, res: Response) => {
    const { model } = req.params;
    if (model === undefined) {
        res.status(HttpStatus.NOT_FOUND).send({ message: req.params });
    }

    const payload = req.body;
    const result = await categoryController.update(model, payload);

    res.status(HttpStatus.OK).send(result);
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
