import { Router } from 'express';
import userController from '../controllers/user.controller';

const userRouter = Router();
userRouter.post('/', userController.create);
userRouter.get('/:id', userController.getById);
userRouter.get('/', userController.getAll);

export default userRouter;
