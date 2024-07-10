import { Router } from 'express';
import warrantyRouter from './warranty.routes';

const router = Router();
router.use('/warranty', warrantyRouter);

export default router;
