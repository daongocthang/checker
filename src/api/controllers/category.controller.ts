import { Request, Response } from 'express';
import { BadRequestError } from '../../middlewares/error.middleware';
import categoryService from '../services/category.service';
import { API } from '../types';
import { handleSingleUpload } from './handlers';

class CategoryController {
    upload = async (req: Request, res: Response) => {
        const cb: API.FileCallback = async (file: Express.Multer.File) => {
            await categoryService.bulkCreate(file.filename);
            const count = await categoryService.count();
            res.status(200).send({ message: 'Upload the file complete', count: count.toLocaleString() });
        };

        await handleSingleUpload(req, res, cb);
    };
    create = async (req: Request, res: Response) => {
        const payload = req.body;

        if (!payload) {
            throw new BadRequestError('Not found any category');
        }

        res.status(200).send(await categoryService.create(payload));
    };
    update = async (req: Request, res: Response) => {
        const { id } = req.params;
        console.log(parseInt(id));

        const payload = req.body;
        if (!id || !payload) {
            throw new BadRequestError('Not found any id or new category');
        }

        res.status(200).send(await categoryService.update(id, payload));
    };
    findById = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id) {
            throw new BadRequestError('Not found any id');
        }

        res.status(200).send(await categoryService.findById(id));
    };
    findAll = async (req: Request, res: Response) => {
        res.status(200).send(await categoryService.findAll());
    };
    remove = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id) {
            throw new BadRequestError('Not found any id');
        }
        const resultOK = await categoryService.remove({ id });

        res.status(200).send({ message: resultOK ? 'Successfully removed' : 'Failed to remove' });
    };
    removeAll = async (req: Request, res: Response) => {
        const resultOK = await categoryService.remove();
        res.status(200).send({ message: resultOK ? 'Successfully removed' : 'Failed to remove' });
    };
}

export default new CategoryController();
