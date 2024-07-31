import { Router } from 'express';
import { xlUpload } from '../../middlewares/upload.middleware';
import transController from '../controllers/trans.controller';

const transRouter = Router();
transRouter.get('/downloads', transController.download);
transRouter.post('/uploads', xlUpload.single('file'), transController.upload);
transRouter.post('/migrates', transController.migrate);
transRouter.post('/suggests', transController.suggest);
transRouter.put('/', transController.findAndUpdate);
transRouter.delete('/null', transController.deleteIfNonUser);

export default transRouter;
