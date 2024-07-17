import { Request, Response, Router } from 'express';
import { HttpStatus } from '../../constants';
import * as productController from '../controllers/product.controller';
import { xlUpload } from '../middlewares/upload.middleware';
import { handleSingleUpload } from './handlers';

const router = Router();
router.post('/upload', xlUpload.single('file'), async (req: Request, res: Response) => {
    handleSingleUpload(req, res, async (file: Express.Multer.File) => {
        await productController.bulkCreate(file.filename);
    });
});
router.post('/', async (req: Request, res: Response) => {
    const payload = req.body;
    try {
        const product = await productController.create(payload);
        res.status(HttpStatus.OK).send(product);
    } catch (e) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Failed to create');
    }
});
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        const product = await productController.update(parseInt(id), payload);
        res.status(HttpStatus.OK).send(product);
    } catch (e) {
        res.status(HttpStatus.OK).send('Failed to update');
    }
});
router.delete('/', async (req: Request, res: Response) => {
    try {
        await productController.removeAll();
        res.status(HttpStatus.OK).send('Removed successfully');
    } catch (e) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Failed to remove');
    }
});
router.delete('/models/:model', async (req: Request, res: Response) => {
    const { model } = req.params;

    try {
        await productController.removeAll({ model: { $like: model + '%' } });
        res.status(HttpStatus.OK).send('Removed with model successfully');
    } catch (e) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Failed to remove with model');
        console.log(e);
    }
});
router.get('/models/:model', async (req: Request, res: Response) => {
    const { model } = req.params;
    try {
        const products = await productController.getAll({ model });
        res.status(HttpStatus.OK).send(products);
    } catch (e) {
        res.status(HttpStatus.BAD_REQUEST).send('Not found');
    }
});

export default router;
