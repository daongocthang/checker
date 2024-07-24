import { Request, Response } from 'express';
import productService from '../services/product.service';
import { API } from '../types';
import { handleSingleUpload } from './handlers';

class ProductController {
    upload = async (req: Request, res: Response) => {
        const cb: API.FileCallback = async (file: Express.Multer.File) => {
            await productService.bulkCreate(file.filename);
            const count = 'infinity';
            res.status(200).send({ message: 'Upload the file complete', count });
        };

        await handleSingleUpload(req, res, cb);
    };

    group = async (req: Request, res: Response) => {
        res.status(200).send(await productService.group());
    };
}

export default new ProductController();
