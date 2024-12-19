import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
const authRouter = Router();
authRouter.get('/signin', authController.signIn);
authRouter.post('/signin', authController.sign);
authRouter.get('/signout', authController.signOut);

export default authRouter;
