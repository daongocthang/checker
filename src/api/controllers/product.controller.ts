import { Request, Response } from 'express';
import productService from '../services/product.service';
import { API } from '../types';
import { handleSingleUpload } from './handlers';

class ProductController {
    upload = (req: Request, res: Response) => {
        const cb: API.FileCallback = async (file: Express.Multer.File) => {
            await productService.bulkCreate(file.filename);
        };

        handleSingleUpload(req, res, cb);
    };
}

export default new ProductController();
