import { Router } from 'express';
import productRouter from './warranty.routes';

const router = Router();
router.use('/product', productRouter);

export default router;
