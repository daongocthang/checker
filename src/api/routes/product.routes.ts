import { Router } from 'express';
import { xlUpload } from '../../middlewares/upload.middleware';
import productController from '../controllers/product.controller';

const productRouter = Router();
productRouter.post('/upload', xlUpload.single('file'), productController.upload);

export default productRouter;
