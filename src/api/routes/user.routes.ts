import { Request, Response, Router } from 'express';
import { HttpStatus } from '../../constants';
import { UserAttrs } from '../../db/models/user.model';
import * as userController from '../controllers/user.controller';
const router = Router();
router.get('/', async (req: Request, res: Response) => {
    res.status(HttpStatus.OK).send(await userController.getAll());
});
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    res.status(HttpStatus.OK).send(await userController.getById(parseInt(id)));
});

router.post('/', async (req: Request, res: Response) => {
    const payload: UserAttrs = req.body;
    const user = await userController.create(payload);
    res.status(HttpStatus.CREATED).send(user);
});

router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload: UserAttrs = req.body;
    const user = await userController.update(parseInt(id), payload);
    res.status(HttpStatus.CREATED).send(user);
});
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const resultOK = await userController.remove(parseInt(id));
    if (resultOK) {
        res.status(HttpStatus.NOT_FOUND).send('User is not available');
    } else {
        res.status(HttpStatus.NO_CONTENT).send('User removed successfully');
    }
});

export default router;
