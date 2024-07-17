import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
const authRouter = Router();
authRouter.get('/signin', authController.getSignIn);
authRouter.post('/signin', authController.postSignIn);
authRouter.post('/signout', authController.postSignOut);

export default authRouter;
