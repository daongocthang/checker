import { Router } from 'express';
import { xlUpload } from '../../middlewares/upload.middleware';
import suggestionController from '../controllers/suggestion.controller';

const suggestionRouter = Router();
suggestionRouter.post('/uploads', xlUpload.single('file'), suggestionController.upload);

export default suggestionRouter;
