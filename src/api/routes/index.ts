import { Router } from 'express';
import categoryRouter from './category.routes';
import productRouter from './product.routes';
import transRouter from './trans.routes';
import userRouter from './user.routes';

const apiRouter = Router();
apiRouter.use('/trans', transRouter);
apiRouter.use('/products', productRouter);
apiRouter.use('/categories', categoryRouter);
apiRouter.use('/users', userRouter);

export default apiRouter;
