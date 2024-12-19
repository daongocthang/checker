import { Router } from 'express';
import { xlUpload } from '../../middlewares/upload.middleware';
import productController from '../controllers/product.controller';

const productRouter = Router();
productRouter.post('/uploads', xlUpload.single('file'), productController.upload);
productRouter.get('/', productController.group);
productRouter.delete('/', productController.removeAll);
export default productRouter;
