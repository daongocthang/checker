import { Router } from 'express';
import categoryRouter from './category.routes';
import receivedTransRouter from './receivedtrans.routes';
import userRouter from './user.routes';

const router = Router();
router.use('/categories', categoryRouter);
router.use('/receivedtrans', receivedTransRouter);
router.use('/users', userRouter);

export default router;
