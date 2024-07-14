import { Router } from 'express';
import categoryRouter from './category.routes';
import productRouter from './product.routes';
import receivedTransRouter from './receivedtrans.routes';
import userRouter from './user.routes';

const router = Router();
router.use('/categories', categoryRouter);
router.use('/transactions', receivedTransRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);

export default router;
