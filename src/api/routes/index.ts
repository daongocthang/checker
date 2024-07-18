import { Router } from 'express';
import categoryRouter from './category.routes';
import userRouter from './user.routes';

const apiRouter = Router();
// router.use('/transactions', receivedTransRouter);
// router.use('/products', productRouter);
apiRouter.use('/categories', categoryRouter);
apiRouter.use('/users', userRouter);

export default apiRouter;
