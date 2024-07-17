import { Router } from 'express';
import * as boardController from '../controllers/board.controller';

const boardRouter = Router();
boardRouter.get('/', boardController.getBoard);

export default boardRouter;
