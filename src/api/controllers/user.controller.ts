import { Request, Response } from 'express';
import { BadRequestError } from '../../middlewares/error.middleware';
import { userService } from '../services';

class UserController {
    create = async (req: Request, res: Response) => {
        const payload = req.body;

        if (!payload) {
            throw new BadRequestError('Not found user');
        }

        const result = await userService.create(payload);
        res.status(200).send(result);
    };
    remove = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id) {
            throw new BadRequestError('Not found userId');
        }

        const result = await userService.remove({ id });
        res.status(200).send(result);
    };
    getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id) {
            throw new BadRequestError('Not found userId');
        }

        res.status(200).send(await userService.findById(parseInt(id)));
    };

    getAll = async (req: Request, res: Response) => {
        res.status(200).send(await userService.findAll());
    };
}

export default new UserController();
