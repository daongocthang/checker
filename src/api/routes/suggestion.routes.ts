import { Router } from 'express';
import { xlUpload } from '../../middlewares/upload.middleware';
import suggestionController from '../controllers/suggestion.controller';

const suggestionRouter = Router();
suggestionRouter.post('/uploads', xlUpload.single('file'), suggestionController.upload);
suggestionRouter.get('/', suggestionController.findAll);
suggestionRouter.delete('/', suggestionController.removeAll);

export default suggestionRouter;
