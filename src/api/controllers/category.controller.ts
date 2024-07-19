import { Request, Response } from 'express';
import { BadRequestError } from '../../middlewares/error.middleware';
import categoryService from '../services/category.service';
import { API } from '../types';
import { handleSingleUpload } from './handlers';

class CategoryController {
    upload = (req: Request, res: Response) => {
        const cb: API.FileCallback = async (file: Express.Multer.File) => {
            await categoryService.bulkCreate(file.filename);
        };

        handleSingleUpload(req, res, cb);
    };
    create = async (req: Request, res: Response) => {
        const payload = req.body;
        console.log(payload);

        if (!payload || Object.keys(payload).length === 0) {
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

        res.status(200).send(await categoryService.update(parseInt(id), payload));
    };
    findById = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id) {
            throw new BadRequestError('Not found any id');
        }

        res.status(200).send(await categoryService.findById(parseInt(id)));
    };
    findAll = async (req: Request, res: Response) => {
        res.status(200).send(await categoryService.findAll());
    };
    remove = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id) {
            throw new BadRequestError('Not found any id');
        }
        const resultOK = await categoryService.remove(parseInt(id));

        res.status(200).send({ message: resultOK ? 'Successfully removed' : 'Failed to remove' });
    };
    removeAll = async (req: Request, res: Response) => {
        const resultOK = await categoryService.removeAll();
        res.status(200).send({ message: resultOK ? 'Successfully removed' : 'Failed to remove' });
    };
}

export default new CategoryController();
