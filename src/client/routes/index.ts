import { Request, Response, Router } from 'express';

const router = Router();
router.get('/', async (req: Request, res: Response) => {
    res.render('pages/login');
});

export default router;
