import { Router } from 'express';
import { xlUpload } from '../../middlewares/upload.middleware';
import categoryController from '../controllers/category.controller';

const categoryRouter = Router();

categoryRouter.post('/uploads', xlUpload.single('file'), categoryController.upload);
categoryRouter.post('/', categoryController.create);
categoryRouter.put('/:id', categoryController.update);
categoryRouter.delete('/:id', categoryController.remove);
categoryRouter.delete('/', categoryController.removeAll);
categoryRouter.get('/', categoryController.findAll);
categoryRouter.get('/:id', categoryController.findById);
export default categoryRouter;
